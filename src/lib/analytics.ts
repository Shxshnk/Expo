/**
 * Google Analytics 4 (GA4) Integration for Commedia Solutions Expo Showcase
 * 
 * Provides privacy-conscious, enterprise-compliant event tracking.
 * Gracefully no-ops when VITE_GA_MEASUREMENT_ID is absent.
 * Strict PII prevention: No names, emails, company info, or form messages are ever sent.
 */

// Window interface augmentation for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isInitialized = false;

// Cache UTM parameters parsed from URL upon entry
export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function getUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParameters = {};
  
  if (params.get('utm_source')) utm.utm_source = params.get('utm_source')!;
  if (params.get('utm_medium')) utm.utm_medium = params.get('utm_medium')!;
  if (params.get('utm_campaign')) utm.utm_campaign = params.get('utm_campaign')!;
  if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!;
  if (params.get('utm_content')) utm.utm_content = params.get('utm_content')!;
  
  return utm;
}

export function initGA(): void {
  if (typeof window === 'undefined' || isInitialized) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || measurementId.trim() === '') {
    // Analytics is disabled gracefully
    return;
  }

  // Load gtag script asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  
  const utms = getUTMParameters();
  window.gtag('config', measurementId, {
    send_page_view: false, // controlled manually
    anonymize_ip: true,
    ...utms
  });

  isInitialized = true;
  trackPageView();
}

export function trackPageView(pagePath?: string): void {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!isInitialized || !window.gtag || !measurementId) return;

  const utms = getUTMParameters();
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath || window.location.pathname,
    ...utms
  });
}

export function trackProductSectionView(productName: 'cnms_v2' | 'operations_advisor'): void {
  if (!isInitialized || !window.gtag) return;
  window.gtag('event', 'product_section_view', {
    product_name: productName,
    ...getUTMParameters()
  });
}

export function trackProductCTAClick(
  productName: 'cnms_v2' | 'operations_advisor',
  ctaLocation: 'hero' | 'product_section' | 'contact_section'
): void {
  if (!isInitialized || !window.gtag) return;
  window.gtag('event', 'product_cta_click', {
    product_name: productName,
    cta_location: ctaLocation,
    ...getUTMParameters()
  });
}

export function trackVideoStart(videoTitle: string, productName: 'cnms_v2' | 'operations_advisor'): void {
  if (!isInitialized || !window.gtag) return;
  window.gtag('event', 'video_start', {
    video_title: videoTitle,
    product_name: productName,
    ...getUTMParameters()
  });
}

export function trackVideoProgress(
  videoTitle: string,
  productName: 'cnms_v2' | 'operations_advisor',
  progressPercent: 25 | 50 | 75
): void {
  if (!isInitialized || !window.gtag) return;
  window.gtag('event', 'video_progress', {
    video_title: videoTitle,
    product_name: productName,
    video_progress_percent: progressPercent,
    ...getUTMParameters()
  });
}

export function trackVideoComplete(videoTitle: string, productName: 'cnms_v2' | 'operations_advisor'): void {
  if (!isInitialized || !window.gtag) return;
  window.gtag('event', 'video_complete', {
    video_title: videoTitle,
    product_name: productName,
    video_progress_percent: 100,
    ...getUTMParameters()
  });
}

export function trackDemoRequestClick(selectedProduct: 'cnms_v2' | 'operations_advisor' | 'both'): void {
  if (!isInitialized || !window.gtag) return;
  // Note: Only the product category is sent. Never send PII (name, email, company, notes).
  window.gtag('event', 'demo_request_click', {
    product_name: selectedProduct,
    cta_location: 'contact_section',
    ...getUTMParameters()
  });
}

export function trackContactEmailClick(): void {
  if (!isInitialized || !window.gtag) return;
  window.gtag('event', 'contact_email_click', {
    ...getUTMParameters()
  });
}
