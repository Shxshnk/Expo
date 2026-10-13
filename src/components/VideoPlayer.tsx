import React, { useRef, useState, useEffect } from 'react';
import { Play, AlertCircle, RefreshCw } from 'lucide-react';
import {
  trackVideoStart,
  trackVideoProgress,
  trackVideoComplete,
} from '../lib/analytics';

interface VideoPlayerProps {
  src: string;
  title: string;
  productName: 'cnms_v2' | 'operations_advisor';
  poster?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  productName,
  poster,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [milestonesReached, setMilestonesReached] = useState<Set<number>>(new Set());

  // Reset milestone tracking when source changes
  useEffect(() => {
    setMilestonesReached(new Set());
    setHasError(false);
  }, [src]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (!milestonesReached.has(0)) {
      trackVideoStart(title, productName);
      setMilestonesReached((prev) => new Set(prev).add(0));
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || video.duration === 0) return;

    const percent = (video.currentTime / video.duration) * 100;

    // Milestone tracking (25, 50, 75)
    if (percent >= 25 && !milestonesReached.has(25)) {
      trackVideoProgress(title, productName, 25);
      setMilestonesReached((prev) => new Set(prev).add(25));
    } else if (percent >= 50 && !milestonesReached.has(50)) {
      trackVideoProgress(title, productName, 50);
      setMilestonesReached((prev) => new Set(prev).add(50));
    } else if (percent >= 75 && !milestonesReached.has(75)) {
      trackVideoProgress(title, productName, 75);
      setMilestonesReached((prev) => new Set(prev).add(75));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (!milestonesReached.has(100)) {
      trackVideoComplete(title, productName);
      setMilestonesReached((prev) => new Set(prev).add(100));
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-2xl group ${className}`}>
      {/* Subtle top border highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent z-10 pointer-events-none" />

      {hasError ? (
        <div className="aspect-video w-full flex flex-col items-center justify-center p-8 text-center bg-card-bg/95">
          <AlertCircle className="w-12 h-12 text-accent-danger mb-4 opacity-80" />
          <h4 className="text-base font-semibold text-white mb-2">Video Demonstration Unavailable</h4>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mb-6 leading-relaxed">
            The media stream could not be loaded. Please ensure the demonstration file is available at the expected path.
          </p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-bg border border-card-border text-xs font-medium text-white hover:border-accent-primary transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Loading</span>
          </button>
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-black/90">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            title={title}
            aria-label={title}
            controls
            preload="metadata"
            playsInline
            onPlay={handlePlay}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={handleError}
            className="w-full h-full object-contain"
          >
            Your browser does not support HTML5 video playback.
          </video>

          {/* Quick status bar overlay on pause */}
          {!isPlaying && (
            <div className="absolute bottom-16 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur text-[11px] font-mono text-cyan-300 border border-cyan-500/20">
              <Play className="w-3 h-3 fill-current" />
              <span>{title}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
