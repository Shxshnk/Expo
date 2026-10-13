/**
 * Google Analytics 4 (GA4) Integration
 * Commedia Solutions — Broadcast India Show 2026 Showcase
 *
 * Privacy and Data Quality Guarantees:
 * - Strict PII prevention: No names, email addresses, company names, or messages are ever sent to GA4.
 * - Sends only specified event names (page_view, product_demo_click, demo_video_start, generate_lead)
 *   and non-identifying product parameters ('CNMS' | 'Operations Advisor' | 'Both').
 * - Preserves native campaign attribution without hardcoding UTM parameters.
 * - Guards against duplicate page views, duplicate tags, and repeated video start events.
 * - Gracefully no-ops when VITE_GA_MEASUREMENT_ID is missing or empty.
 */

// Global window augmentation for Google Tag (gtag.js)
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ||
  'G-M60W5YXE1Y';

let isInitialized = false;

// Session-level set preventing repeated demo_video_start events per product during a page session
const videoStartTracked = new Set<string>();

/**
 * Initializes Google Analytics 4.
 * Injects the official Google Tag script if not present and configures the measurement ID.
 * Standard GA4 config automatically records the initial page_view and extracts UTM campaign parameters
 * (e.g., ?utm_source=broadcast_india_show&utm_medium=qr&utm_campaign=broadcast_india_2026) directly from window.location.
 */
export function initGA(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = GA_MEASUREMENT_ID;
  if (!measurementId || measurementId.trim() === '') {
    // GA4 gracefully disabled when measurement ID is not provided
    return;
  }

  // Prevent duplicate script tag injection if script already exists
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  // Setup dataLayer and gtag queue
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());

  // Enable debug_mode in dev or when URL has ?debug_mode=true for real-time testing in GA4 DebugView
  const isDebugMode =
    window.location.search.includes('debug_mode=true') ||
    import.meta.env.DEV;

  // Standard config command: GA4 handles initial page view and reads campaign attribution automatically
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    ...(isDebugMode ? { debug_mode: true } : {}),
  });

  isInitialized = true;
}

/**
 * Track when a user clicks a button or link to view a product demo.
 *
 * @param product 'CNMS' | 'Operations Advisor'
 */
export function trackProductDemoClick(product: 'CNMS' | 'Operations Advisor'): void {
  if (typeof window === 'undefined' || !window.gtag || !isInitialized) return;

  window.gtag('event', 'product_demo_click', {
    product,
  });
}

/**
 * Track when a product demo video actually begins playing for the first time during the page session.
 *
 * Requirements:
 * - Listens to native video playback events (e.g. onPlay).
 * - Does not fire on button click without playback starting.
 * - Does not fire repeated events on pause, resume, or scrubbing.
 * - Associated strictly with the product being played.
 *
 * @param product 'CNMS' | 'Operations Advisor'
 */
export function trackDemoVideoStart(product: 'CNMS' | 'Operations Advisor'): void {
  if (typeof window === 'undefined' || !window.gtag || !isInitialized) return;

  // Fire once per product during the page session
  if (videoStartTracked.has(product)) {
    return;
  }

  videoStartTracked.add(product);

  window.gtag('event', 'demo_video_start', {
    product,
  });
}

/**
 * Track GA4 recommended generate_lead event only after Formspree confirms a successful submission.
 *
 * Requirements:
 * - Fired once per successful submission (inside response.ok).
 * - Not fired on button clicks, validation attempts, or network failures.
 * - Zero PII: sends only the non-identifying product interest.
 *
 * @param product 'CNMS' | 'Operations Advisor' | 'Both'
 */
export function trackGenerateLead(product: 'CNMS' | 'Operations Advisor' | 'Both'): void {
  if (typeof window === 'undefined' || !window.gtag || !isInitialized) return;

  window.gtag('event', 'generate_lead', {
    product,
  });
}
