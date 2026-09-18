import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

export const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const attemptSeek = () => {
      const video = videoRef.current;
      if (!video || isSeekingRef.current) return;

      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      const video = videoRef.current;
      if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        attemptSeek();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current !== null) {
        const delta = e.clientX - prevXRef.current;
        const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
        const newTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
        targetTimeRef.current = newTarget;
        attemptSeek();
      }

      prevXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Optional touch support for mobile scrubbing
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) {
        prevXRef.current = touch.clientX;
        return;
      }

      if (prevXRef.current !== null) {
        const delta = touch.clientX - prevXRef.current;
        const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
        const newTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
        targetTimeRef.current = newTarget;
        attemptSeek();
      }

      prevXRef.current = touch.clientX;
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('seeked', handleSeeked);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      // Initialize target time to current time or middle/start
      targetTimeRef.current = videoRef.current.currentTime;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '70% center',
        pointerEvents: 'none',
      }}
    />
  );
};
