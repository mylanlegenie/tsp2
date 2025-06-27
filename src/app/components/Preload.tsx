'use client';

import { useEffect } from 'react';

export function PreloadImageLink() {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = '/image-provisoire.webp';
        link.type = 'image/jpeg';
        document.head.appendChild(link);
    }, []);

    return null;
}
