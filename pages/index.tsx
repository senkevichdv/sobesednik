import React, { useState, useRef, useEffect } from 'react';
import { MessageList, Message } from '../src/components/MessageList';
import { getIntroMessage, getIntroChoices } from '../src/lib/introMessages';
import { Input } from '../src/components/ui/input';
import { Button } from '../src/components/ui/button';

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

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [runningSummary, setRunningSummary] = useState<string>('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [language, setLanguage] = useState<'en' | 'ru' | null>(null);
  const [showFreeInput, setShowFreeInput] = useState(false);
  const [currentChoices, setCurrentChoices] = useState<Array<{ id: string; label: string }> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowFreeInput(false);
    setCurrentChoices(null);

    try {
      const requestBody = {
        session_id: sessionId,
        user_input: userInput.trim(),
        running_summary: runningSummary,
        client_hints: language ? { lang: language, tone: 'noir-minimal' } : { tone: 'noir-minimal' },
      };
      
      console.log('Sending request:', {
        user_input: userInput.trim(),
        language,
        client_hints: requestBody.client_hints
      });

      const response = await fetch('/api/turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        result += decoder.decode(value, { stream: true });
      }

      // Parse the streaming response
      const lines = result.split('\n').filter(line => line.startsWith('data: '));
      if (lines.length > 0) {
        const data: TurnResponse = JSON.parse(lines[lines.length - 1].substring(6));
        
        const assistantMessage: Message = {
          id: `assistant_${Date.now()}`,
          type: 'assistant',
          content: data.assistant_message,
          timestamp: new Date(),
          choices: data.choices || undefined,
          askFreeInput: data.ask_free_input,
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setRunningSummary(data.running_summary_next);
        
        if (data.choices && data.choices.length > 0) {
          setCurrentChoices(data.choices);
          setShowFreeInput(false);
        } else if (data.ask_free_input) {
          setShowFreeInput(true);
          setCurrentChoices(null);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: 'assistant',
        content: language === 'ru' ? 'Извините, произошла ошибка. Попробуйте еще раз.' : "I'm sorry, there was an error. Please try again.",
        timestamp: new Date(),
        askFreeInput: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      setShowFreeInput(true);
      setCurrentChoices(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  const handleChoiceSelect = (choiceId: string) => {
    // Find the choice text by ID
    const choice = currentChoices?.find(c => c.id === choiceId);
    if (choice) {
      handleSubmit(choice.label);
    }
  };

  const selectLanguage = (lang: 'en' | 'ru') => {
    setLanguage(lang);
    
    // Create only intro message
    const introMessage: Message = {
      id: `intro_${Date.now()}`,
      type: 'assistant',
      content: getIntroMessage(lang),
      timestamp: new Date(),
      choices: getIntroChoices(lang),
      askFreeInput: false,
    };
    
    setMessages([introMessage]);
    setCurrentChoices(getIntroChoices(lang));
  };


  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            Sobesednik
          </h1>

        </div>
      </header>

      {/* Messages */}
      <main className="main">
        <div className="main-content">
          {language === null ? (
            <div className="landing-screen">
              <div className="landing-content">
                <div className="landing-icon">⌨️</div>
                <div className="landing-buttons">
                  <Button
                    onClick={() => selectLanguage("en")}
                    variant="outline"
                    size="default"
                    className="landing-button"
                  >
                    English
                  </Button>
                  <Button
                    onClick={() => selectLanguage("ru")}
                    variant="outline"
                    size="default"
                    className="landing-button"
                  >
                    Русский
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="landing-screen">
              <div className="landing-content">
                <div className="landing-icon">⌨️</div>
                
                {/* Language buttons - keep them after selection */}
                <div className="landing-buttons">
                  <Button
                    onClick={() => selectLanguage("en")}
                    variant="outline"
                    size="default"
                    className={`landing-button ${language === 'en' ? 'selected' : ''}`}
                    disabled={language !== null}
                  >
                    English
                  </Button>
                  <Button
                    onClick={() => selectLanguage("ru")}
                    variant="outline"
                    size="default"
                    className={`landing-button ${language === 'ru' ? 'selected' : ''}`}
                    disabled={language !== null}
                  >
                    Русский
                  </Button>
                </div>

                {/* Description - separate element with original styles */}
                <div className="description-section">
                  <h2 className="landing-title">
                    {language === 'ru' 
                      ? 'Пространство для размышлений' 
                      : 'A space for reflection'
                    }
                  </h2>
                  <p className="landing-description">
                    {language === 'ru'
                      ? 'Здесь вы исследуете короткие истории, отражающие внутренние пейзажи. Ничего не сохраняется.'
                      : 'Here you\'ll explore short stories that mirror inner landscapes. Nothing is saved.'
                    }
                  </p>
                  <div className="landing-features">
                    <div className="feature">
                      {language === 'ru' ? '• Короткие психологические путешествия' : '• Short psychological journeys'}
                    </div>
                    <div className="feature">
                      {language === 'ru' ? '• Атмосферные сцены' : '• Atmospheric scenes'}
                    </div>
                    <div className="feature">
                      {language === 'ru' ? '• Ничего не сохраняется' : '• Nothing is saved'}
                    </div>
                  </div>
                </div>

                {/* Messages list */}
                <div className="messages-section">
                  <MessageList 
                    messages={messages} 
                    isLoading={isLoading}
                    onScrollToBottom={scrollToBottom}
                  />
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Choices */}
      {currentChoices && currentChoices.length > 0 && (
        <div className="choices-area">
          <div className="choices-content">
            <div className="choices">
              {currentChoices.map((choice) => (
                <Button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice.id)}
                  variant="outline"
                  size="default"
                  className="choice-button"
                >
                  {choice.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      {showFreeInput && (
        <footer className="footer">
          <div className="footer-content">
            <div className="input-area">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === "ru"
                    ? "Напечатайте сообщение..."
                    : "Type a message..."
                }
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSubmit(input)}
                disabled={!input.trim() || isLoading}
                variant="outline"
                size="default"
              >
                {isLoading ? "..." : "Send"}
              </Button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}