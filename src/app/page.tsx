"use client";

import React, { useState, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBookmark, setShowBookmark] = useState(false);

  useEffect(() => {
    // Show popup only on mobile devices and if not dismissed
    const dismissed = window.localStorage.getItem('bookmarkPopupDismissed');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!dismissed && isMobile) {
      setShowBookmark(true);
    }
  }, []);

  const handleClick = async (action: 'assist' | 'too-loud') => {
    setLoading(action);
    setSuccess(null);
    setError(null);
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('address');
    if (!address) { 
      setError('Address not found. Please scan the QR code again.');
      setLoading(null);
      return;
    }
    console.log(`Action: ${action}, Address: ${address}`);
    const data = {
        action,
        address
    };
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed');
      setSuccess(action === 'assist' ? 'I\'ve received your request. I will get back to you ASAP.' : 'When I see my notification, I will turn the music down. Otherwise, come over and let me know!');
    } catch (e: any) {
      setError(e.message || 'Error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-blue-300 to-cyan-400 relative overflow-hidden">
      {/* Top right icons */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <a
          href="https://github.com/coder-bat/local-link"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white/80 border border-blue-200 shadow-md p-2 hover:bg-blue-100 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          aria-label="GitHub"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0f172a" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
        </a>
      </div>
      {/* Bookmark suggestion popup */}
      {showBookmark && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-white/90 border border-blue-200 rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-xs animate-fade-in w-full backdrop-blur-sm">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#38bdf8" d="M6 3a3 3 0 0 0-3 3v15.382a1 1 0 0 0 1.447.894L12 19.118l7.553 3.158A1 1 0 0 0 21 21.382V6a3 3 0 0 0-3-3H6Zm0 2h12a1 1 0 0 1 1 1v13.764l-6.553-2.74a1 1 0 0 0-.894 0L5 19.764V6a1 1 0 0 1 1-1Z"/></svg>
          <span className="text-sm text-slate-800">Save this page to your home screen for quick access!</span>
          <button
            className="ml-2 text-slate-400 hover:text-slate-600 text-lg font-bold px-1"
            aria-label="Dismiss"
            onClick={() => {
              setShowBookmark(false);
              window.localStorage.setItem('bookmarkPopupDismissed', '1');
            }}
          >
            ×
          </button>
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 drop-shadow mb-2 mt-8 md:mt-0 text-center" style={{letterSpacing: '-0.02em'}}>LocalLink</h1>
        <p className="text-lg md:text-xl text-slate-800 mb-8 text-center max-w-2xl">
          Reach out to your neighbour with single click.
        </p>
        <div className="flex flex-col gap-5 w-full max-w-xs">
          <button
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-900 text-lg font-semibold shadow-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:opacity-60 cursor-pointer"
            onClick={() => handleClick('assist')}
            disabled={loading !== null}
          >
            {loading === 'assist' ? 'Sending…' : 'Assist!'}
          </button>
          <button
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-900 text-lg font-semibold shadow-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:opacity-60 cursor-pointer"
            onClick={() => handleClick('too-loud')}
            disabled={loading !== null}
          >
            {loading === 'too-loud' ? 'Sending…' : 'Music too loud!'}
          </button>
        </div>
        {success && <div className="text-green-600 text-center text-md mt-6 animate-fade-in">{success}</div>}
        {error && <div className="text-red-600 text-center text-md mt-6 animate-fade-in">{error}</div>}
      </div>
      <p className='mt-8'>Made with ❤️ by <a href="https://lovepeaceand.dev" target='_blank'>coder-bat (Viral)</a></p>
    </main>
  );
}
