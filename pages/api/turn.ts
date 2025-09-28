import { NextRequest } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { buildSystemPrompt } from '../../src/lib/prompt/system';

export const config = {
  runtime: 'edge',
};

interface ClientHint {
  lang?: 'en' | 'ru';
  tone?: 'noir-minimal';
}

interface TurnRequest {
  session_id: string;
  user_input: string;
  running_summary: string;
  client_hints: ClientHint;
}

interface Choice {
  id: string;
  label: string;
}

interface TurnResponse {
  assistant_message: string;
  choices: Choice[] | null;
  ask_free_input: boolean;
  running_summary_next: string;
  meta: {
    session_id: string;
    timestamp: string;
    processing_time_ms: number;
  };
}

// Generate response using OpenAI via Vercel AI SDK
async function generateNextTurn(
  userInput: string,
  runningSummary: string,
  systemPrompt: string,
  clientHints: ClientHint
): Promise<{ message: string; choices: Choice[] | null; askFreeInput: boolean }> {
  try {
    // Create OpenAI client
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build context from running summary
    let contextPrompt = systemPrompt;
    
    if (runningSummary) {
      contextPrompt += `\n\nCurrent conversation context:\n${runningSummary}`;
    }

    // Add language and tone hints
    if (clientHints.lang) {
      contextPrompt += `\n\nIMPORTANT: Respond ONLY in ${clientHints.lang === 'ru' ? 'Russian' : 'English'}. The user is using ${clientHints.lang === 'ru' ? 'Russian' : 'English'} language.`;
      console.log(`Language set to: ${clientHints.lang === 'ru' ? 'Russian' : 'English'}`);
    }
    
    if (clientHints.tone === 'noir-minimal') {
      contextPrompt += `\n\nKeep responses minimal, atmospheric, and noir-style.`;
    }

    // Handle specific choice texts for intro choices
    let specificPrompt = userInput;
    if (userInput === 'Start' || userInput === 'Старт') {
      specificPrompt = clientHints.lang === 'ru' 
        ? 'Пользователь нажал "Старт" - создай первую сцену микро-истории с психологической темой для самоанализа'
        : 'User pressed "Start" - create the first scene of a micro-story with psychological theme for self-reflection';
    }

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: contextPrompt,
      prompt: `${specificPrompt}\n\nRemember: Respond in ${clientHints.lang === 'ru' ? 'Russian' : 'English'} language.`,
      temperature: 0.7,
    });

    // Validate response
    if (!text || text.trim().length < 3) {
      console.error('Invalid response from OpenAI:', text);
      throw new Error('Invalid response from OpenAI');
    }

    // Parse response for choices and free input
    // Look for choice patterns in the entire text
    const choicePatterns = [
      /(\d+\.\s+[^\n]+)/g,  // "1. Choice text"
      /([-*•]\s+[^\n]+)/g,  // "- Choice text"
      /(Option\s+\d+:\s+[^\n]+)/g  // "Option 1: Choice text"
    ];
    
    const allChoices: string[] = [];
    for (const pattern of choicePatterns) {
      const matches = text.match(pattern);
      if (matches) {
        allChoices.push(...matches);
      }
    }
    
    // Remove duplicates and clean up
    const uniqueChoices = [...new Set(allChoices)].map(choice => 
      choice
        .replace(/^\s*[-*•]\s+/, '') // Remove bullet points
        .replace(/^\s*\d+\.\s+/, '') // Remove numbered lists
        .replace(/^\s*Option\s+\d+:\s*/, '') // Remove "Option X:" prefix
        .trim()
    );
    
    // Extract the main message (everything before choices)
    let message = text;
    if (uniqueChoices.length > 0) {
      // Find where choices start and extract message before that
      const firstChoicePattern = choicePatterns.find(pattern => text.match(pattern));
      if (firstChoicePattern) {
        const firstMatch = text.match(firstChoicePattern);
        if (firstMatch) {
          const choiceStart = text.indexOf(firstMatch[0]);
          message = text.substring(0, choiceStart).trim();
        }
      }
    }
    
    let choices: Choice[] | null = null;
    let askFreeInput = false;
    
    if (uniqueChoices.length > 0) {
      choices = uniqueChoices.map((choice, index) => ({
        id: String.fromCharCode(97 + index), // a, b, c...
        label: choice
      }));
    } else {
      askFreeInput = true;
    }

    console.log('Parsed response:', { 
      message: message.substring(0, 50) + '...', 
      choicesCount: choices?.length || 0, 
      askFreeInput,
      rawText: text.substring(0, 100) + '...',
      allChoices: allChoices,
      uniqueChoices: uniqueChoices,
      parsedChoices: choices
    });

    return { message, choices, askFreeInput };
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback responses if OpenAI fails
    const fallbackResponses = [
      "I hear you. What's really going on beneath the surface?",
      "That sounds challenging. How are you feeling about it?",
      "Tell me more about what that means to you.",
      "What would you like to explore about this?",
      "I'm listening. What's the deeper story here?",
    ];
    
    const responseIndex = userInput.length % fallbackResponses.length;
    return { 
      message: fallbackResponses[responseIndex], 
      choices: null, 
      askFreeInput: true 
    };
  }
}

export default async function handler(req: NextRequest) {
  const startTime = Date.now();
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: TurnRequest = await req.json();
    const { session_id, user_input, running_summary, client_hints } = body;

    console.log('API Request:', {
      user_input,
      client_hints,
      language: client_hints?.lang
    });

    if (!user_input || !session_id) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Build system prompt
    const systemPrompt = buildSystemPrompt();

    // Generate assistant response
    const { message, choices, askFreeInput } = await generateNextTurn(
      user_input,
      running_summary || '',
      systemPrompt,
      client_hints || {}
    );

    // Update running summary (simplified for now)
    const runningSummaryNext = running_summary 
      ? `${running_summary}\n\nUser: ${user_input}\nAssistant: ${message}`
      : `User: ${user_input}\nAssistant: ${message}`;

    const response: TurnResponse = {
      assistant_message: message,
      choices,
      ask_free_input: askFreeInput,
      running_summary_next: runningSummaryNext,
      meta: {
        session_id,
        timestamp: new Date().toISOString(),
        processing_time_ms: Date.now() - startTime,
      },
    };

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send the response as JSON
        const jsonResponse = JSON.stringify(response);
        controller.enqueue(encoder.encode(`data: ${jsonResponse}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in turn handler:', error);
    return new Response('Internal server error', { status: 500 });
  }
}