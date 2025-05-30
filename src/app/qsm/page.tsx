// app/qsm/page.tsx
'use client'; // si ton composant a des hooks (comme useState, etc.)

import QSM from '../components/QSM';
import Navbar from '../components/Navbar';

export default function QSMPage() {
    return (
        <>
            <Navbar />
            <QSM />
        </>
    );
}