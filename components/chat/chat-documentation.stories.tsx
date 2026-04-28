import type { Meta, StoryObj } from "@storybook/react";
import Chat from "./chat";
import { ChatMessageBlock } from "./chat-message-block";
import { ChatSystemAvatar } from "./chat-system-avatar";
import { Typing } from "./typing";

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function ChatDocumentationPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Chat Documentation</h1>
        <p className="text-sm text-muted-foreground">
          Guide to architecture, usage, and visual states for the chat module.
        </p>
      </header>

      <section className="space-y-3">
        <SectionTitle>Purpose</SectionTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          The module was split into smaller components to improve maintenance,
          reuse, and clarity:
        </p>
        <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
          <li>
            <code>Chat</code>: orchestrates state, sending, clearing, and rendering.
          </li>
          <li>
            <code>ChatMessageBlock</code>: controls alignment, border, and style by role.
          </li>
          <li>
            <code>ChatSystemAvatar</code>: side avatar for assistant/system messages.
          </li>
          <li>
            <code>Typing</code>: visual feedback for in-progress responses.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <SectionTitle>Integration</SectionTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          For the complete experience, use the main component. It uses{" "}
          <code>useChat</code> and sends messages to <code>/api/chat</code>.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs">
          <code>{`import Chat from "components/chat";

export default function Page() {
  return <Chat />;
}`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <SectionTitle>Key states</SectionTitle>
        <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
          <li>
            <code>status === "ready"</code>: form is enabled for sending.
          </li>
          <li>
            <code>status === "submitted"</code>: renders <code>Typing</code>.
          </li>
          <li>
            <code>messages.length &gt; 0</code>: shows the clear conversation button.
          </li>
          <li>
            <code>Ctrl + Enter</code> or <code>Cmd + Enter</code>: send shortcut.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SectionTitle>Visual examples</SectionTitle>

        <div className="space-y-3 rounded-lg border border-border p-4">
          <h3 className="text-base font-medium">Message block (assistant)</h3>
          <ChatMessageBlock role="assistant">
            <p className="text-sm">
              Hello, I can answer questions about portfolio, projects and
              technical experience.
            </p>
          </ChatMessageBlock>
        </div>

        <div className="space-y-3 rounded-lg border border-border p-4">
          <h3 className="text-base font-medium">Message block (user)</h3>
          <ChatMessageBlock role="user">
            <p className="text-sm">Show me your latest React and Next.js work.</p>
          </ChatMessageBlock>
        </div>

        <div className="space-y-3 rounded-lg border border-border p-4">
          <h3 className="text-base font-medium">Loading state</h3>
          <ChatMessageBlock role="loading">
            <Typing size="small" />
          </ChatMessageBlock>
        </div>

        <div className="space-y-3 rounded-lg border border-border p-4">
          <h3 className="text-base font-medium">System avatar</h3>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Visible</p>
              <ChatSystemAvatar />
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Hidden</p>
              <ChatSystemAvatar hide />
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-border p-4">
          <h3 className="text-base font-medium">Typing sizes</h3>
          <div className="flex items-center gap-6">
            <Typing size="small" />
            <Typing size="medium" />
            <Typing size="large" />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle>Full component</SectionTitle>
        <div className="rounded-lg border border-border p-4">
          <Chat />
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "0 Chat/0 Documentation",
  component: ChatDocumentationPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reference page for the chat module with usage guidance, states, and practical examples.",
      },
    },
  },
} satisfies Meta<typeof ChatDocumentationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const EmbeddedChat: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-4xl p-6">
      <Chat />
    </div>
  ),
};
