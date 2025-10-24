"use client"

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
    title?: string,
    description?: string,
}

export default function Header({
    title,
    description
}: HeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 pb-6 border-b border-border"
        >
            <Link
                href="#"
                onClick={() => window.history.back()}
                className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
            >
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
                {title && <h1 className="text-2xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>
        </motion.div>
    );
}
