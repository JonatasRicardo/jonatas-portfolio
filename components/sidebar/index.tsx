import React from 'react';
import { motion } from 'motion/react';
import { SocialLinks } from 'components/social-links';
import { ProfileAvatar } from 'components/profile-avatar';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-16 md:w-1/4"
        >
            <div className="sticky top-[2rem] z-10">
                <div className="relative">
                    <Link href="/">
                        <ProfileAvatar size="small" className="mt-[.25rem] w-sidebar md:h-32 lg:h-48 xl:h-64 lg:ring-4" />
                    </Link>

                    <div id="triangle" className="absolute md:right-[23px]! right-[10px] top-1/2 md:mt-[-24px]! mt-[-12px] ">
                        <div className="absolute ml-[-1px] w-0 h-0 md:border-t-[24px]! border-t-[12px]  border-t-transparent md:border-r-[24px]! border-r-[12px]  border-r-border md:border-b-[24px]! border-b-[12px]  border-b-transparent" />
                        <div className="absolute w-0 h-0 md:border-t-[24px]! border-t-[12px] border-t-transparent  md:border-r-[24px]! border-r-[12px] border-r-card md:border-b-[24px]! border-b-[12px] border-b-transparent" />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="hidden lg:block text-center w-sidebar mt-6 mb-2"
                >
                    <h1 className="text-xl">Jonatas Ricardo S. Santos</h1>
                    <h2 className="text-base">Fullstack Software Engineer</h2>
                </motion.div>

                <SocialLinks />
            </div>
        </motion.aside>
    )
}