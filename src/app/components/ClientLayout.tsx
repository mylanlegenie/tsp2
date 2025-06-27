'use client';
import dynamic from 'next/dynamic';
import Spinner from './Spinner';
import { PreloadImageLink } from './Preload';

const Navbar = dynamic(() => import('./Navbar'), {
    ssr: false,
    loading: () => <Spinner />,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <PreloadImageLink />
            {children}
        </>
    );
}
