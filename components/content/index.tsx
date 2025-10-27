"use client"

import { HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

export default function Content({
    children,
    ...props
}: HTMLMotionProps<"div">) {
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
