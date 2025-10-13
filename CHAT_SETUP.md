# Configuração do Chat com AI SDK

## Instalação

As dependências já foram instaladas:
- `ai` - AI SDK da Vercel
- `@ai-sdk/openai` - Provedor OpenAI para o AI SDK

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
OPENAI_API_KEY=sua_chave_api_openai_aqui
```

**Importante:** 
- O arquivo `.env.local` é ignorado pelo Git (já configurado no `.gitignore`)
- Nunca commite sua chave de API real
- Use apenas para desenvolvimento local

### 2. Obter Chave da API OpenAI

1. Acesse [OpenAI Platform](https://platform.openai.com/)
2. Faça login ou crie uma conta
3. Vá para "API Keys" no menu lateral
4. Clique em "Create new secret key"
5. Copie a chave e cole no arquivo `.env.local`

## Funcionalidades Implementadas

### ✅ Chat Interface
- Interface de chat moderna com animações
- Mensagens em tempo real
- Scroll automático para novas mensagens
- Indicador de carregamento
- Design responsivo

### ✅ API Route
- Endpoint `/api/chat` configurado
- Streaming de respostas
- Integração com OpenAI GPT-4o-mini
- Tratamento de erros

### ✅ Componentes
- `app/components/chat/index.tsx` - Componente principal do chat
- `app/api/chat/route.ts` - API route para processamento

## Como Usar

1. Configure a variável de ambiente `OPENAI_API_KEY`
2. Execute o projeto: `npm run dev`
3. Navegue até a página que contém o componente Chat
4. Digite uma mensagem e pressione Enter ou clique no botão de envio

## Personalização

### Modelo de IA
Para alterar o modelo, edite `app/api/chat/route.ts`:

```typescript
model: openai('gpt-4o-mini'), // ou 'gpt-4', 'gpt-3.5-turbo', etc.
```

### Parâmetros
Ajuste temperatura e tokens máximos:

```typescript
temperature: 0.7,    // 0.0 (determinístico) a 1.0 (criativo)
maxTokens: 1000,      // Limite de tokens na resposta
```

### Estilos
O chat usa Tailwind CSS e pode ser personalizado editando as classes no componente.

## Configuração para Produção

### Vercel
1. Acesse o dashboard da Vercel
2. Vá para Settings > Environment Variables
3. Adicione `OPENAI_API_KEY` com sua chave de API
4. Faça o deploy

### Outras Plataformas
Configure a variável de ambiente `OPENAI_API_KEY` nas configurações da sua plataforma de hospedagem.

## Troubleshooting

### Erro de API Key
- Verifique se a chave está correta no `.env.local`
- Certifique-se de que o arquivo está na raiz do projeto
- Reinicie o servidor após adicionar a variável
- Para produção, verifique se a variável está configurada na plataforma de hospedagem

### Erro de CORS
- O chat funciona apenas em localhost em desenvolvimento
- Para produção, configure CORS adequadamente

### Erro de Streaming
- Verifique se o modelo suporta streaming
- Alguns modelos podem ter limitações de taxa
