# Conversation / Собеседник

A minimalist digital companion with a typewriter aesthetic, built with Next.js and powered by OpenAI.

## Features

- 🎯 **Minimalist Design**: Clean, typewriter-style interface with dark theme
- 🤖 **AI-Powered Conversations**: Uses OpenAI GPT-3.5-turbo for thoughtful responses
- 📝 **Running Summary**: Maintains conversation context with structured summaries
- ⚡ **Real-time Streaming**: Typewriter effect for AI responses
- 🔒 **Privacy-First**: No server-side storage, all data stays in browser memory
- 🌍 **Bilingual Support**: English and Russian interface
- 🎨 **Responsive UI**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js (Pages Router), TypeScript, Tailwind CSS
- **AI Integration**: Vercel AI SDK with OpenAI
- **Components**: Custom React components with react-typical for typewriter effects
- **Runtime**: Edge Runtime for fast API responses

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cy-bot
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Project Structure

```
├── pages/
│   ├── api/
│   │   └── turn.ts          # API endpoint for AI conversations
│   ├── _app.tsx             # App wrapper with global styles
│   ├── _document.tsx        # HTML document structure
│   └── index.tsx            # Main chat interface
├── src/
│   ├── components/
│   │   ├── MessageList.tsx  # Chat message display
│   │   └── Typewriter.tsx   # Typewriter effect component
│   ├── lib/
│   │   ├── prompt/
│   │   │   └── system.ts    # System prompt configuration
│   │   └── summary.ts       # Conversation summary logic
│   ├── styles/
│   │   └── globals.css      # Global styles and dark theme
│   └── types/
│       └── react-typical.d.ts # Type definitions
```

## API Endpoints

### POST /api/turn

Processes a conversation turn and returns an AI response.

**Request Body:**
```json
{
  "session_id": "string",
  "user_input": "string", 
  "running_summary": "RunningSummary | null",
  "client_hints": "string[]"
}
```

**Response:**
```json
{
  "assistant_message": "string",
  "running_summary_next": "RunningSummary",
  "meta": {
    "session_id": "string",
    "timestamp": "string",
    "processing_time_ms": "number"
  }
}
```

## Key Features

### Running Summary System
The app maintains a structured conversation summary with sections:
- **Facts**: Key information shared by the user
- **State**: Current emotional/mental state
- **Goal**: What the user wants to achieve
- **Insight**: Observations and patterns
- **Open**: Unresolved questions or topics

### Typewriter Effect
AI responses are displayed with a realistic typewriter animation using `react-typical`.

### Privacy & Data
- No server-side storage or databases
- All conversation history stays in browser memory
- Session data is cleared on page reload
- No persistent user tracking

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js Edge Runtime:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## Development

### Adding New Features
- AI responses: Modify `src/lib/prompt/system.ts`
- UI components: Add to `src/components/`
- Styling: Update `src/styles/globals.css` or component styles

### Testing
```bash
# Run linting
npm run lint

# Build for production
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions, please open a GitHub issue or contact the maintainers.