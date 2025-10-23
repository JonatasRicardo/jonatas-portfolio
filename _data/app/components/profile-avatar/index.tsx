import React from "react";

import { ImageWithFallback } from "@/components/base-ui/ImageWithFallback";
import { cn } from "@/components/base-ui/utils";

import profileImg from "@/imgs/jonatas-ricardo-santos-frontend-avatar.png"

interface ProfileAvatarProps extends React.ComponentProps<"div"> {
    size?: 'small' | 'medium' | 'large';
}

export function ProfileAvatar({
    size = 'medium',
    className,
    ...props
}: ProfileAvatarProps) {
    const sizeClasses = {
        small: 'w-12 h-12 ring-2',
        medium: 'w-32 h-32 ring-3',
        large: 'w-64 h-64 ring-4',
    };

    return (
        <div
            {...props}
            className={cn(`${sizeClasses[size]} transition-all duration-500 rounded-full overflow-hidden ring-primary/20 shadow-xl`, className)}
         >
            <ImageWithFallback
                src={profileImg.src}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
            />
        </div>
    );
}