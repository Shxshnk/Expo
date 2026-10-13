import { useEffect, useState } from 'react';
import anime from 'animejs';

/**
 * Calculates page scroll progress percentage (0 - 100)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

/**
 * Signature Cinematic Scroll Reveals using Anime.js and IntersectionObserver.
 * Handles text-mask reveals, video scale entrances, and delicate editorial fades.
 */
export function useCinematicScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll('.text-mask-child').forEach((el) => {
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.opacity = '1';
      });
      document.querySelectorAll('[data-cinematic-reveal]').forEach((el) => {
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }

    // 1. Text-Mask Line Reveal
    const maskObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const children = target.querySelectorAll('.text-mask-child');
            if (children.length > 0) {
              anime({
                targets: children,
                translateY: ['115%', '0%'],
                opacity: [0, 1],
                duration: 850,
                delay: anime.stagger(140),
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              });
            }
            maskObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-mask-reveal]').forEach((el) => maskObserver.observe(el));

    // 2. Video Frame Cinematic Scale Entrance
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              scale: [0.96, 1],
              opacity: [0.35, 1],
              duration: 900,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });
            videoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-video-entrance]').forEach((el) => videoObserver.observe(el));

    // 3. Editorial Content Fade-Up
    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              translateY: [18, 0],
              opacity: [0, 1],
              duration: 750,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });
            contentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-cinematic-reveal]').forEach((el) => contentObserver.observe(el));

    return () => {
      maskObserver.disconnect();
      videoObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);
}
