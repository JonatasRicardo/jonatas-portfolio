"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ProfileAvatar } from '@/components/profile-avatar';
import { Textarea } from '@/components/base-ui/textarea';
import { ArrowUp } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

interface TypingProps {
    size?: 'small' | 'medium' | 'large';
}

export function Typing({ size = 'large' }: TypingProps) {
    const sizeConfig = {
        small: {
            width: 30,
            height: 16,
            viewBox: "0 0 30 16",
            circleRadius: 2.5,
            circlePositions: [5, 15, 25],
            centerY: 8
        },
        medium: {
            width: 38,
            height: 20,
            viewBox: "0 0 38 20",
            circleRadius: 3.5,
            circlePositions: [6.5, 19, 31.5],
            centerY: 10
        },
        large: {
            width: 46,
            height: 24,
            viewBox: "0 0 46 24",
            circleRadius: 4,
            circlePositions: [8, 24, 40],
            centerY: 12
        }
    };

    const config = sizeConfig[size];

    return (
        <svg 
            width={config.width} 
            height={config.height} 
            viewBox={config.viewBox} 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle 
                cx={config.circlePositions[0]} 
                cy={config.centerY} 
                r={config.circleRadius} 
                fill="#888"
            >
                <animate 
                    attributeName="cy" 
                    values={`${config.centerY};${config.centerY - 4};${config.centerY}`} 
                    dur="0.6s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
            </circle>
            <circle 
                cx={config.circlePositions[1]} 
                cy={config.centerY} 
                r={config.circleRadius} 
                fill="#888"
            >
                <animate 
                    attributeName="cy" 
                    values={`${config.centerY};${config.centerY - 4};${config.centerY}`} 
                    dur="0.6s" 
                    repeatCount="indefinite" 
                    begin="0.2s" 
                />
            </circle>
            <circle 
                cx={config.circlePositions[2]} 
                cy={config.centerY} 
                r={config.circleRadius} 
                fill="#888"
            >
                <animate 
                    attributeName="cy" 
                    values={`${config.centerY};${config.centerY - 4};${config.centerY}`} 
                    dur="0.6s" 
                    repeatCount="indefinite" 
                    begin="0.4s" 
                />
            </circle>
        </svg>
    )
}

export function ChatSystemAvatar({
    hide = false
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-16 md:w-1/4"
        >
            <div className="sticky top-[2rem] z-10">
                {!hide && <div className="relative flex justify-end pr-4">
                    <ProfileAvatar size="small" className="mt-[.25rem]" />

                    <div className="absolute right-[10px] top-1/2 mt-[-12px] ">
                        <div className="absolute ml-[-1px] w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px]  border-r-border border-b-[12px] border-b-transparent" />
                        <div className="absolute w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px]  border-r-card border-b-[12px] border-b-transparent" />
                    </div>
                </div>}
            </div>
        </motion.div>
    )
};

export function ChatMessageBlock({ children, role }: {
    children: React.ReactElement<any>,
    role?: 'user' | 'system' | 'assistant' | 'form' | 'loading'
}) {
    const talkBoxStyles = {
        'assistant': 'float-left',
        'system': 'float-left',
        'user': 'float-right',
        'loading': 'float-left',
        'form': '',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex"
        >
            <ChatSystemAvatar hide={['form', 'user', 'loading'].includes(role)} />
            <div className="flex-1 lg:w-3/4">
                <div className={`${talkBoxStyles[role] ?? 'float-right'} bg-card border border-border rounded-xl shadow-lg p-6 space-y-6`}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

export default function Chat() {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && status === 'ready') {
            sendMessage({ text: input });
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSubmit(e);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <>
            {messages.map((message) => (
                <ChatMessageBlock
                    key={message.id}
                    role={message.role}
                >
                    {message && <p className="text-sm whitespace-pre-wrap">
                        {message.parts.map((part, index) =>
                            part.type === 'text' ? part.text : null
                        )}
                    </p>}
                </ChatMessageBlock>
            ))}

            {status === 'submitted' && (
                <ChatMessageBlock role="loading">
                    <Typing size='small' />
                </ChatMessageBlock>
            )}

            <ChatMessageBlock role='form'>
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Textarea
                        placeholder="Type your message..."
                        className="flex-1 min-h-[60px] p-0 resize-none bg-transparent border-0"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={status !== 'ready'}
                    />
                    <button
                        type="submit"
                        disabled={status !== 'ready' || !input.trim()}
                        className="self-center w-10 h-10 enabled:hover:bg-accent flex items-center justify-center bg-primary/10  rounded-full transition-colors duration-300"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </button>
                </form>
            </ChatMessageBlock>

            <div ref={messagesEndRef} />
        </>
    );
}