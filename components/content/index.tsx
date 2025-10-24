"use client"

import React from 'react';
import { motion } from 'motion/react';

export default function Content({
    children,
    ...props
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
