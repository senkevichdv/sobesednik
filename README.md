# Conversation / Собеседник

A minimalist digital companion with a typewriter aesthetic, built with Next.js and powered by OpenAI.

## Features

- 🎯 **Minimalist Design**: Clean, typewriter-style interface with dark theme
- 🤖 **AI-Powered Conversations**: Uses OpenAI GPT-4o-mini for thoughtful responses
- 📝 **Running Summary**: Maintains conversation context with structured summaries
- ⚡ **Real-time Streaming**: Typewriter effect for AI responses
- 🔒 **Privacy-First**: No server-side storage, all data stays in browser memory
- 🌍 **Bilingual Support**: English and Russian interface
- 🎨 **Responsive UI**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16 (Pages Router), React 19, TypeScript
- **Styling**: Custom CSS with monospace typography
- **AI Integration**: Vercel AI SDK (`ai`, `@ai-sdk/openai`) with OpenAI GPT-4o-mini
- **Components**: Custom React components with custom typewriter effect
- **Telegram Integration**: Telegram Mini App support via `@twa-dev/sdk`
- **Runtime**: Standard Next.js runtime (Edge Runtime removed for Telegram Mini App compatibility)

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/senkevichdv/sobesednik.git
cd sobesednik
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```
> **Note**: `--legacy-peer-deps` is required for compatibility between React 19 and Next.js 16 with other dependencies.

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```
This uses Next.js with Turbopack for faster development builds.

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Telegram Mini App

This app can be deployed as a [Telegram Mini App](https://core.telegram.org/bots/webapps) for seamless integration with Telegram bots. See [TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md) for detailed setup instructions including:
- Telegram WebApp SDK integration
- Theme adaptation (matches Telegram dark/light mode)
- Haptic feedback and MainButton integration
- Deployment and BotFather configuration

## Project Structure

```
├── pages/
│   ├── api/
│   │   └── turn.ts          # API endpoint for AI conversations
│   ├── _app.tsx             # App wrapper with Telegram integration
│   ├── _document.tsx        # HTML document structure
│   ├── index.tsx            # Main chat interface
│   └── privacy.tsx          # Privacy policy page
├── src/
│   ├── components/
│   │   ├── MessageList.tsx  # Chat message display
│   │   ├── Typewriter.tsx   # Typewriter effect component
│   │   ├── Loading.tsx      # Loading indicator
│   │   └── ui/              # Reusable UI components
│   ├── lib/
│   │   ├── prompt/
│   │   │   └── system.ts    # System prompt configuration
│   │   ├── introMessages.ts # Initial conversation messages
│   │   └── exportConversation.ts # Conversation export utilities
│   └── styles/
│       └── globals.css      # Global styles and dark theme
```

## API Endpoints

### POST /api/turn

Processes a conversation turn and returns an AI response.

**Request Body:**
```json
{
  "session_id": "string",
  "user_input": "string", 
  "running_summary": "string",
  "client_hints": {
    "lang": "en | ru",
    "tone": "noir-minimal"
  }
}
```

**Response:**
```json
{
  "assistant_message": "string",
  "choices": [{"id": "string", "label": "string"}] | null,
  "ask_free_input": "boolean",
  "running_summary_next": "string",
  "meta": {
    "session_id": "string",
    "timestamp": "string",
    "processing_time_ms": "number"
  }
}
```

## Key Features

### Conversation System
The app uses an interactive conversation flow with:
- **Dynamic choices**: AI-generated numbered options for user selection
- **Free-form input**: Falls back to text input when appropriate
- **Running summary**: Maintains conversation context across turns
- **Bilingual support**: Automatically adapts to English or Russian based on client hints

### Typewriter Effect
AI responses are displayed with a custom typewriter animation component.

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
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

> **Note**: The app uses standard Next.js runtime (not Edge Runtime) for compatibility with Telegram Mini App integration.

## Development

### Adding New Features
- AI responses: Modify `src/lib/prompt/system.ts`
- UI components: Add to `src/components/`
- Styling: Update `src/styles/globals.css` or component styles

### Testing
```bash
# Run linting
npm run lint

# Build for production (uses Turbopack)
npm run build

# Start production server
npm run start
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