import React, { useState, useEffect } from 'react';
import { Mail, Phone, Globe, Send, Check, Copy, ExternalLink, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { trackDemoRequestClick, trackContactEmailClick } from '../lib/analytics';

interface DemoFormProps {
  initialProduct?: 'cnms_v2' | 'operations_advisor' | 'both';
}

const FORMSPREE_ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT as string | undefined) ||
  'https://formspree.io/f/xvkzwqen';

export const DemoForm: React.FC<DemoFormProps> = ({ initialProduct = 'both' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState<'cnms_v2' | 'operations_advisor' | 'both'>(initialProduct);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const productLabels: Record<'cnms_v2' | 'operations_advisor' | 'both', string> = {
    cnms_v2: 'CNMS v2.0 Platform',
    operations_advisor: 'Operations Advisor Co-Pilot',
    both: 'Both Systems (CNMS v2.0 & Operations Advisor)',
  };

  const validate = () => {
    const errs: { name?: string; email?: string; company?: string } = {};

    if (!name.trim()) {
      errs.name = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Corporate work email is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid corporate email address.';
    }

    if (!company.trim()) {
      errs.company = 'Company or organization is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Spam honeypot detection
    if (honeypot.trim()) {
      // Silently simulate success for bots
      setIsSuccess(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    trackDemoRequestClick(product);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      product: productLabels[product],
      productCode: product,
      message: message.trim() || 'No specific notes provided',
      eventSource: 'Broadcast India Show 2026 QR Showcase',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        setErrorMessage(null);
      } else {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.errors && errorData.errors.length > 0) {
          const detail = errorData.errors.map((err: { message?: string }) => err.message).filter(Boolean).join('. ');
          setErrorMessage(detail || 'Formspree rejected the submission. Please verify your details.');
        } else {
          setErrorMessage('Could not complete submission. Please check your connection and try again.');
        }
      }
    } catch {
      setErrorMessage(
        'A network connection error occurred while submitting. Please check your network or email sales@commediaindia.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setProduct(initialProduct);
    setErrors({});
    setIsSuccess(false);
    setErrorMessage(null);
  };

  const handleCopyDraft = () => {
    const productName = productLabels[product];
    const fullText = [
      `To: sales@commediaindia.com`,
      `Subject: Broadcast India 2026 | Technical Briefing Request — ${productName}`,
      ``,
      `Hello Commedia Solutions Engineering Team,`,
      ``,
      `I would like to request a technical briefing:`,
      `Full Name: ${name.trim() || '[Your Name]'}`,
      `Work Email: ${email.trim() || '[Your Email]'}`,
      `Company: ${company.trim() || '[Your Company]'}`,
      `Product Interest: ${productName}`,
      message.trim() ? `Operational Scope:\n${message.trim()}` : null,
      ``,
      `Best regards,`,
      `${name.trim() || '[Your Name]'}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 3000);
    });
  };

  return (
    <section
      id="contact"
      className="relative pt-10 sm:pt-14 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#050608] hairline-b"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 sm:mb-10" data-cinematic-reveal>
          <div className="lg:col-span-3">
            <span className="editorial-label text-neutral-400 block mb-2">
              04 &bull; ENGAGEMENT
            </span>
            <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block">
              Direct Engineering Consultation
            </span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="editorial-section-title text-white mb-6">
              Discuss your operational requirements.
            </h2>
            <p className="editorial-body-lead text-neutral-300 max-w-2xl">
              Whether you are attending the Broadcast India Show 2026 or planning upcoming ground station, teleport, or telemetry infrastructure, our engineering leadership is available for technical discussions.
            </p>
          </div>
        </div>

        {/* Two-Column Swiss Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" data-cinematic-reveal>
          {/* Left Column: Verified Corporate Channels (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="hairline-all p-6 sm:p-8 bg-[#080A0F] space-y-6">
              <div>
                <span className="editorial-label text-neutral-400 block mb-1">
                  HEADQUARTERS &amp; SALES
                </span>
                <h3 className="text-lg font-display font-medium text-white">
                  Commedia Solutions Pvt. Ltd.
                </h3>
              </div>

              <div className="space-y-4 pt-4 hairline-t text-xs font-sans text-neutral-300">
                <a
                  href="mailto:sales@commediaindia.com"
                  onClick={() => trackContactEmailClick()}
                  className="flex items-center gap-3 p-3.5 bg-[#0A0D14] hairline-all hover:border-neutral-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Direct Inquiries</span>
                    <span className="text-white group-hover:text-sky-300 truncate block text-xs sm:text-sm font-medium">
                      sales@commediaindia.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.commediaindia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 bg-[#0A0D14] hairline-all hover:border-neutral-400 transition-colors group"
                >
                  <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Corporate Website</span>
                    <span className="text-white group-hover:text-sky-300 flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                      <span>www.commediaindia.com</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+2227562333"
                  className="flex items-center gap-3 p-3.5 bg-[#0A0D14] hairline-all hover:border-neutral-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Corporate Office</span>
                    <span className="text-white group-hover:text-sky-300 text-xs sm:text-sm font-medium">
                      +22 2756 2333
                    </span>
                  </div>
                </a>
              </div>

              <div className="pt-4 hairline-t text-xs font-sans text-neutral-400 space-y-2 leading-relaxed">
                <p>
                  Exhibition coordinators stationed at the Broadcast India Show 2026.
                </p>
                <p className="text-neutral-500 text-[11px]">
                  Submitting directly connects to our Formspree inquiry endpoint. No third-party marketing cookies or tracker scripts are injected.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Briefing Form Connected to Formspree (Span 7) */}
          <div className="lg:col-span-7">
            <div className="hairline-all p-6 sm:p-8 bg-[#080A0F]">
              {/* Form Header */}
              <div className="mb-6">
                <span className="editorial-label text-neutral-400 block mb-1">
                  BRIEFING INVITATION
                </span>
                <h3 className="text-xl font-display font-medium text-white">
                  Schedule an Operational Demonstration
                </h3>
              </div>

              {/* SUCCESS STATE */}
              {isSuccess ? (
                <div className="p-6 bg-[#081216] hairline-all border-emerald-500/40 space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <h4 className="font-display font-semibold text-base text-white">
                      Briefing Request Dispatched
                    </h4>
                  </div>

                  <p className="editorial-body text-neutral-300 text-sm leading-relaxed">
                    Thank you, <strong className="text-white font-medium">{name}</strong>. Your enquiry for <strong className="text-white font-medium">{productLabels[product]}</strong> has been received by our engineering team at the Broadcast India Show 2026.
                  </p>

                  <p className="editorial-body text-neutral-400 text-xs leading-relaxed">
                    We will follow up at <span className="text-sky-300">{email}</span> with scheduling availability and deployment specifications.
                  </p>

                  <div className="pt-4 hairline-t flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 text-xs font-sans font-medium text-neutral-300 hover:text-white hairline-all bg-[#0A0D14] hover:border-neutral-400 transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Spam Honeypot Field (Hidden from legitimate users) */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Top Row: Full Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name (Required) */}
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-sans font-medium text-neutral-300 mb-1.5">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        type="text"
                        value={name}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Vikram Malhotra"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={`w-full px-3.5 py-2.5 bg-[#050608] hairline-all text-xs font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-60 ${
                          errors.name ? 'border-rose-500' : ''
                        }`}
                      />
                      {errors.name && (
                        <p id="error-name" className="text-[11px] text-rose-400 mt-1 font-sans">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Work Email (Required, Validated) */}
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-sans font-medium text-neutral-300 mb-1.5">
                        Work Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="form-email"
                        name="email"
                        type="email"
                        value={email}
                        disabled={isSubmitting}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="name@enterprise.com"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`w-full px-3.5 py-2.5 bg-[#050608] hairline-all text-xs font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-60 ${
                          errors.email ? 'border-rose-500' : ''
                        }`}
                      />
                      {errors.email && (
                        <p id="error-email" className="text-[11px] text-rose-400 mt-1 font-sans">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company / Teleport Organization (Required) */}
                  <div>
                    <label htmlFor="form-company" className="block text-xs font-sans font-medium text-neutral-300 mb-1.5">
                      Company / Teleport Facility <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="form-company"
                      name="company"
                      type="text"
                      value={company}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (errors.company) setErrors({ ...errors, company: undefined });
                      }}
                      placeholder="e.g. Broadcast Telecom India"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'error-company' : undefined}
                      className={`w-full px-3.5 py-2.5 bg-[#050608] hairline-all text-xs font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-60 ${
                        errors.company ? 'border-rose-500' : ''
                      }`}
                    />
                    {errors.company && (
                      <p id="error-company" className="text-[11px] text-rose-400 mt-1 font-sans">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  {/* Product Interest (Required) */}
                  <fieldset>
                    <legend className="block text-xs font-sans font-medium text-neutral-300 mb-2">
                      Product Focus <span className="text-rose-400">*</span>
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['cnms_v2', 'operations_advisor', 'both'] as const).map((prodKey) => (
                        <button
                          type="button"
                          key={prodKey}
                          disabled={isSubmitting}
                          onClick={() => setProduct(prodKey)}
                          className={`p-2.5 text-xs font-display font-medium transition-colors hairline-all text-center ${
                            product === prodKey
                              ? prodKey === 'cnms_v2'
                                ? 'bg-sky-500/15 text-sky-300 border-sky-400'
                                : prodKey === 'operations_advisor'
                                ? 'bg-purple-500/15 text-purple-300 border-purple-400'
                                : 'bg-white text-black font-semibold'
                              : 'bg-[#050608] text-neutral-400 hover:text-white hover:bg-[#0A0D14]'
                          }`}
                        >
                          {prodKey === 'cnms_v2'
                            ? 'CNMS v2.0'
                            : prodKey === 'operations_advisor'
                            ? 'Operations Advisor'
                            : 'Both Platforms'}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Operational Scope / Message (Optional) */}
                  <div>
                    <label htmlFor="form-message" className="block text-xs font-sans font-medium text-neutral-300 mb-1.5">
                      Operational Requirements <span className="text-neutral-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={3}
                      value={message}
                      disabled={isSubmitting}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your earth station locations, antenna scale, or monitoring requirements..."
                      className="w-full px-3.5 py-2.5 bg-[#050608] hairline-all text-xs font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none disabled:opacity-60"
                    />
                  </div>

                  {/* Error Alert Banner (Preserves User Input) */}
                  {errorMessage && (
                    <div className="p-3.5 bg-rose-950/40 hairline-all border-rose-500/50 flex items-start gap-2.5 text-rose-300 text-xs font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block mb-0.5">Submission Error</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {/* Primary Submit via Formspree */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-5 bg-white text-black font-display text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Briefing Request</span>
                        </>
                      )}
                    </button>

                    {/* Secondary Copy Draft Option */}
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      disabled={isSubmitting}
                      className="py-3 px-4 bg-[#050608] text-neutral-300 font-sans text-xs hairline-all hover:text-white hover:border-neutral-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {copiedDraft ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedDraft ? 'Copied to Clipboard' : 'Copy Email Draft'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
