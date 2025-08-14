import React from 'react';
import { analytics } from '../utils/analytics';

interface ShareOption {
    name: string;
    icon: string;
    shareUrl: (url: string, title: string) => string;
    ariaLabel: string;
}

const shareOptions: ShareOption[] = [
    {
        name: 'Twitter',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
        shareUrl: (url, title) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        ariaLabel: 'Share to Twitter'
    },
    {
        name: 'Facebook',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
        shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        ariaLabel: 'Share to Facebook'
    },
    {
        name: 'LinkedIn',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
        shareUrl: (url, title) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        ariaLabel: 'Share to LinkedIn'
    },
    {
        name: 'WhatsApp',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
        shareUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
        ariaLabel: 'Share to WhatsApp'
    }
];

interface ShareButtonsProps {
    url?: string;
    title?: string;
    description?: string;
    className?: string;
    iconClassName?: string;
    showText?: boolean;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
    url = typeof window !== 'undefined' ? window.location.href : '',
    title = document.title,
    className = '',
    iconClassName = '',
    showText = false
}) => {
    const handleShare = async (option: ShareOption) => {
        try {
            if (navigator.share && /mobile/i.test(navigator.userAgent)) {
                // Use native share API (if available)
                await navigator.share({
                    title,
                    url
                });
                
                analytics.event({
                    category: 'Share',
                    action: 'Native Share',
                    label: url
                });
            } else {
                // Open share popup
                const shareUrl = option.shareUrl(url, title);
                window.open(shareUrl, '_blank', 'width=600,height=400');
                
                analytics.event({
                    category: 'Share',
                    action: `Share to ${option.name}`,
                    label: url
                });
            }
        } catch (error) {
            console.error('Share failed:', error);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            
            analytics.event({
                category: 'Share',
                action: 'Copy Link',
                label: url
            });
            
            // A success notification can be added here
        } catch (error) {
            console.error('Copy link failed:', error);
        }
    };

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {shareOptions.map((option) => (
                <button
                    key={option.name}
                    onClick={() => handleShare(option)}
                    aria-label={option.ariaLabel}
                    className={`group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 ${iconClassName}`}
                >
                    <span
                        className="w-6 h-6"
                        dangerouslySetInnerHTML={{ __html: option.icon }}
                    />
                    {showText && (
                        <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">
                            {option.name}
                        </span>
                    )}
                </button>
            ))}
            <button
                onClick={copyToClipboard}
                aria-label="Copy Link"
                className={`group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 ${iconClassName}`}
            >
                <span className="w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </span>
                {showText && (
                    <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">
                        Copy Link
                    </span>
                )}
            </button>
        </div>
    );
};