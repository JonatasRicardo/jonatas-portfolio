# Chat Setup with AI SDK

## Installation

Dependencies have already been installed:
- `ai` - Vercel AI SDK
- `@ai-sdk/openai` - OpenAI provider for AI SDK

## Configuration

### 1. Environment Variables

Create a `.env.local` file in the project root with:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Important:** 
- The `.env.local` file is ignored by Git (already configured in `.gitignore`)
- Never commit your real API key
- Use only for local development

### 2. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Login or create an account
3. Go to "API Keys" in the sidebar menu
4. Click "Create new secret key"
5. Copy the key and paste it in the `.env.local` file

## Implemented Features

### ✅ Chat Interface
- Modern chat interface with animations
- Real-time messages
- Auto-scroll to new messages
- Loading indicator
- Responsive design

### ✅ API Route
- `/api/chat` endpoint configured
- Response streaming
- OpenAI GPT-4o-mini integration
- Error handling

### ✅ Components
- `app/components/chat/index.tsx` - Main chat component
- `app/api/chat/route.ts` - API route for processing

## How to Use

1. Configure the `OPENAI_API_KEY` environment variable
2. Run the project: `npm run dev`
3. Navigate to the page containing the Chat component
4. Type a message and press Enter or click the send button

## Customization

### AI Model
To change the model, edit `app/api/chat/route.ts`:

```typescript
model: openai('gpt-4o-mini'), // or 'gpt-4', 'gpt-3.5-turbo', etc.
```

### Parameters
Adjust temperature and max tokens:

```typescript
temperature: 0.7,    // 0.0 (deterministic) to 1.0 (creative)
maxTokens: 1000,      // Token limit in response
```

### Styles
The chat uses Tailwind CSS and can be customized by editing the classes in the component.

## Production Configuration

### Vercel
1. Go to the Vercel dashboard
2. Go to Settings > Environment Variables
3. Add `OPENAI_API_KEY` with your API key
4. Deploy

### Other Platforms
Configure the `OPENAI_API_KEY` environment variable in your hosting platform settings.

## Troubleshooting

### API Key Error
- Check if the key is correct in `.env.local`
- Make sure the file is in the project root
- Restart the server after adding the variable
- For production, verify the variable is configured in the hosting platform

### CORS Error
- The chat only works on localhost in development
- For production, configure CORS properly

### Streaming Error
- Check if the model supports streaming
- Some models may have rate limitations
