import React from 'react';
import { analytics } from '../utils/analytics';

interface SocialLink {
    name: string;
    url: string;
    icon: string;
    ariaLabel: string;
}

const socialLinks: SocialLink[] = [
    {
        name: 'Twitter',
        url: 'https://twitter.com/Qwen3Coder',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
        ariaLabel: '在Twitter上关注我们'
    },
    {
        name: 'GitHub',
        url: 'https://github.com/qwen3coder',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
        ariaLabel: '访问我们的GitHub'
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/qwen3coder',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
        ariaLabel: '在LinkedIn上关注我们'
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com/@qwen3coder',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
        ariaLabel: '访问我们的YouTube频道'
    },
    {
        name: 'Discord',
        url: 'https://discord.gg/qwen3coder',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
        ariaLabel: '加入我们的Discord社区'
    }
];

interface SocialLinksProps {
    className?: string;
    iconClassName?: string;
    showText?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
    className = '',
    iconClassName = '',
    showText = false
}) => {
    const handleClick = (name: string, url: string) => {
        analytics.event({
            category: 'Social',
            action: 'Click',
            label: `${name} - ${url}`
        });
    };

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    onClick={() => handleClick(link.name, link.url)}
                    className={`group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 ${iconClassName}`}
                >
                    <span
                        className="w-6 h-6"
                        dangerouslySetInnerHTML={{ __html: link.icon }}
                    />
                    {showText && (
                        <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">
                            {link.name}
                        </span>
                    )}
                </a>
            ))}
        </div>
    );
};