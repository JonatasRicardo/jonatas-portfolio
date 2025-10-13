"use client"

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ProfileAvatar } from '@/components/profile-avatar';
import { Button } from '@/components/base-ui/button';
import { Textarea } from '@/components/base-ui/textarea';
import { Send, Bot, User, ArrowUp } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';


export function Message() {
    return (
        <div className="mt-6 flex transition-all duration-500">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-16 md:w-1/4"
            >
                <div className="sticky top-[2rem] z-10">
                    <div className="relative flex justify-end pr-4">
                        <ProfileAvatar size="small" className="mt-[.25rem]" />

                        <div className="absolute right-[10px] top-1/2 mt-[-12px] ">
                            <div className="absolute ml-[-1px] w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px]  border-r-border border-b-[12px] border-b-transparent" />
                            <div className="absolute w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px]  border-r-card border-b-[12px] border-b-transparent" />
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="flex-1 lg:w-3/4">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative bg-card border border-border rounded-xl shadow-lg p-2 space-y-6"
                >
                    {/* Messages Area */}
                    {/* <div className="h-96 overflow-y-auto space-y-4 pr-2">
                   {messages.length === 0 ? (
                       <div className="flex items-center justify-center h-full text-muted-foreground">
                           <div className="text-center">
                               <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                               <p>Olá! Como posso ajudá-lo hoje?</p>
                           </div>
                       </div>
                   ) : (
                       messages.map((message) => (
                           <motion.div
                               key={message.id}
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.3 }}
                               className={`flex items-start space-x-3 ${
                                   message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                               }`}
                           >
                               <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                   message.role === 'user' 
                                       ? 'bg-primary text-primary-foreground' 
                                       : 'bg-muted text-muted-foreground'
                               }`}>
                                   {message.role === 'user' ? (
                                       <User className="w-4 h-4" />
                                   ) : (
                                       <Bot className="w-4 h-4" />
                                   )}
                               </div>
                               <div className={`flex-1 max-w-[80%] ${
                                   message.role === 'user' ? 'text-right' : ''
                               }`}>
                                   <div className={`inline-block p-3 rounded-lg ${
                                       message.role === 'user'
                                           ? 'bg-primary text-primary-foreground'
                                           : 'bg-muted text-foreground'
                                   }`}>
                                       <p className="text-sm whitespace-pre-wrap">
                                           {message.parts.map((part, index) =>
                                               part.type === 'text' ? part.text : null
                                           )}
                                       </p>
                                   </div>
                               </div>
                           </motion.div>
                       ))
                   )}
                   <div ref={messagesEndRef} />
               </div> */}

                    {/* Status Indicators */}
                    {/* {(status === 'submitted' || status === 'streaming') && (
                   <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                       <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                       <span className="text-sm">
                           {status === 'submitted' ? 'Enviando...' : 'Respondendo...'}
                       </span>
                   </div>
               )} */}

                    {error && (
                        <div className="flex items-center justify-center space-x-2 text-destructive">
                            <span className="text-sm">Erro ao enviar mensagem. Tente novamente.</span>
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <Textarea
                            placeholder="Digite sua mensagem..."
                            className="flex-1 min-h-[60px] resize-none bg-transparent border-0"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
                </motion.div>
            </div>
        </div>
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
    role: 'user' | 'system' | 'assistant' | 'form'
}) {
    const wrapperStyles = {
        'assistant': 'flex flex-1',
        'system': 'flex items-start',
        'user': 'flex items-end',
   }
    const talkBoxStyles = {
        'assistant': 'float-left',
        'system': 'float-left',
        'user': 'float-right',
   }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex"
        >
            <ChatSystemAvatar hide={['form','user'].includes(role)} />
            <div className="flex-1 lg:w-3/4">
                <motion.div
                    // initial={{ opacity: 0, x: 30 }}
                    // animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className={`${talkBoxStyles[role]} bg-card border border-border rounded-xl shadow-lg p-6 space-y-6`}
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');

    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && status === 'ready') {
            sendMessage({ text: input });
            setInput('');
        }
    };

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

            <ChatMessageBlock role='form'>
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Textarea
                        placeholder="Digite sua mensagem..."
                        className="flex-1 min-h-[60px] p-0 resize-none bg-transparent border-0"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
        </>
    );
}