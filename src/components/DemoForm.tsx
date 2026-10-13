import React, { useState, useEffect } from 'react';
import { Mail, Phone, Globe, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { Radar3D } from './3d/Radar3D';
import { trackDemoRequestClick, trackContactEmailClick } from '../lib/analytics';

interface DemoFormProps {
  initialProduct?: 'cnms_v2' | 'operations_advisor' | 'both';
}

export const DemoForm: React.FC<DemoFormProps> = ({ initialProduct = 'both' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState<'cnms_v2' | 'operations_advisor' | 'both'>(initialProduct);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const productLabels: Record<'cnms_v2' | 'operations_advisor' | 'both', string> = {
    cnms_v2: 'CNMS v2.0',
    operations_advisor: 'Operations Advisor',
    both: 'Both Products',
  };

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) {
      errs.name = 'Full name is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Work email is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid corporate email.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructEmailContent = () => {
    const productName = productLabels[product];
    const subject = `Expo Demo Request | ${productName}`;
    const body = [
      `Hello Commedia Solutions Team,`,
      ``,
      `I would like to request a product demonstration from your Expo 2026 showcase:`,
      ``,
      `Name: ${name.trim()}`,
      `Work Email: ${email.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : null,
      `Product of Interest: ${productName}`,
      ``,
      message.trim() ? `Message / Requirements:\n${message.trim()}` : null,
      ``,
      `Best regards,`,
      `${name.trim()}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    return { subject, body };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // GA4 tracking without PII
    trackDemoRequestClick(product);

    const { subject, body } = constructEmailContent();
    const mailtoUrl = `mailto:sales@commediaindia.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    window.location.href = mailtoUrl;
  };

  const handleCopyDraft = () => {
    const { subject, body } = constructEmailContent();
    const fullText = `To: sales@commediaindia.com\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 3000);
    });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#04070E] border-b border-[#1E2D4A]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1020] border border-[#1E2D4A] text-cyan-electric text-tech-label uppercase mb-5">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMEDIA ENGAGEMENT HUB</span>
          </div>
          <h2 className="text-section-title text-white tracking-tight mb-4">
            Let&apos;s Explore What Works for Your Team.
          </h2>
          <p className="text-body-lead text-mutedgrey font-normal">
            Tell us which product interests you, and our engineering team can discuss your telemetry or operational requirements directly.
          </p>
        </div>

        {/* Asymmetric Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 3D Telemetry Radar + Corporate Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* 3D Telemetry Radar View */}
            <div className="rounded-3xl bg-[#080E1C] border border-[#1E2D4A] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-tech-label text-cyan-electric mb-2">
                <span>TELEMETRY RADAR 3D</span>
                <span className="text-mutedgrey">BEACON ACTIVE</span>
              </div>

              <div className="w-full h-64">
                <Radar3D />
              </div>

              <div className="pt-3 border-t border-[#1E2D4A]/60 flex items-center justify-between text-tech-label text-mutedgrey">
                <span>STATION LOCK: 142.84° AZ</span>
                <span className="text-emerald-400">READY FOR DISCOVERY</span>
              </div>
            </div>

            {/* Direct Official Contact Cards */}
            <div className="p-6 rounded-3xl bg-[#080E1C]/90 border border-[#1E2D4A] space-y-4">
              <h3 className="text-tech-label uppercase text-white font-semibold mb-4">
                Corporate Contact Channels
              </h3>

              <a
                href="mailto:sales@commediaindia.com"
                onClick={() => trackContactEmailClick()}
                className="flex items-center gap-4 p-4 rounded-2xl bg-obsidian border border-[#1E2D4A] hover:border-cyan-electric/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-cyan-electric/10 text-cyan-electric shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-tech-label text-mutedgrey uppercase block">Direct Inquiries</span>
                  <span className="text-sm font-sans font-semibold text-white group-hover:text-cyan-electric transition-colors truncate block">
                    sales@commediaindia.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.commediaindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-obsidian border border-[#1E2D4A] hover:border-cyan-electric/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-indigo-vibrant/15 text-indigo-300 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-tech-label text-mutedgrey uppercase block">Official Website</span>
                  <span className="text-sm font-sans font-semibold text-white group-hover:text-cyan-electric transition-colors flex items-center gap-1.5">
                    <span>www.commediaindia.com</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </span>
                </div>
              </a>

              <a
                href="tel:+2227562333"
                className="flex items-center gap-4 p-4 rounded-2xl bg-obsidian border border-[#1E2D4A] hover:border-cyan-electric/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-tech-label text-mutedgrey uppercase block">Corporate Switchboard</span>
                  <span className="text-sm font-sans font-semibold text-white group-hover:text-cyan-electric transition-colors">
                    +22 2756 2333
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact Editorial Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-7 sm:p-10 rounded-3xl bg-[#080E1C] border border-[#1E2D4A] shadow-2xl space-y-6 reticle-bracket"
            >
              <div>
                <span className="text-tech-label text-cyan-electric uppercase block mb-2">
                  DIRECT BRIEFING REQUEST
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                  Schedule an Operational Demonstration
                </h3>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-sans font-medium text-slate-300 mb-2">
                  Full Name <span className="text-cyan-electric">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g. Vikram Malhotra"
                  className={`w-full px-5 py-3.5 rounded-2xl bg-obsidian border ${
                    errors.name ? 'border-accent-danger' : 'border-[#1E2D4A] focus:border-cyan-electric'
                  } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors font-sans`}
                />
                {errors.name && <p className="text-xs text-accent-danger mt-1.5 font-sans">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-sans font-medium text-slate-300 mb-2">
                  Work Email <span className="text-cyan-electric">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="name@enterprise.com"
                  className={`w-full px-5 py-3.5 rounded-2xl bg-obsidian border ${
                    errors.email ? 'border-accent-danger' : 'border-[#1E2D4A] focus:border-cyan-electric'
                  } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors font-sans`}
                />
                {errors.email && <p className="text-xs text-accent-danger mt-1.5 font-sans">{errors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-sans font-medium text-slate-300 mb-2">
                  Company / Organization <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Satellite Telecom India"
                  className="w-full px-5 py-3.5 rounded-2xl bg-obsidian border border-[#1E2D4A] focus:border-cyan-electric text-white placeholder-slate-600 text-sm focus:outline-none transition-colors font-sans"
                />
              </div>

              {/* Product selector buttons */}
              <div>
                <label className="block text-xs sm:text-sm font-sans font-medium text-slate-300 mb-2">
                  Product of Interest <span className="text-cyan-electric">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['cnms_v2', 'operations_advisor', 'both'] as const).map((prodKey) => (
                    <button
                      type="button"
                      key={prodKey}
                      onClick={() => setProduct(prodKey)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all border text-center ${
                        product === prodKey
                          ? 'bg-cyan-electric text-obsidian border-cyan-electric shadow-[0_0_15px_rgba(69,216,255,0.3)] font-semibold'
                          : 'bg-obsidian border-[#1E2D4A] text-mutedgrey hover:text-white hover:border-[#1E2D4A]/90'
                      }`}
                    >
                      {productLabels[prodKey]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-sans font-medium text-slate-300 mb-2">
                  Operational Focus / Inquiries <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your network scale, satellite earth stations, or monitoring requirements..."
                  className="w-full px-5 py-3.5 rounded-2xl bg-obsidian border border-[#1E2D4A] focus:border-cyan-electric text-white placeholder-slate-600 text-sm focus:outline-none transition-colors resize-none font-sans"
                />
              </div>

              {/* Notice near button */}
              <div className="p-3.5 rounded-xl bg-obsidian border border-[#1E2D4A] text-xs text-mutedgrey font-sans">
                Submitting this form opens your email application. Your request is not sent until you send the email.
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-8 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-cyan-electric text-obsidian hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(69,216,255,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>DRAFT EMAIL REQUEST</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="py-3.5 px-6 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide bg-obsidian border border-[#1E2D4A] text-mutedgrey hover:text-white hover:border-cyan-electric/50 transition-all flex items-center justify-center gap-2"
                >
                  {copiedDraft ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDraft ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL DRAFT'}</span>
                </button>
              </div>

              {submitted && (
                <div className="p-4 rounded-2xl bg-cyan-electric/10 border border-cyan-electric/30 text-xs text-cyan-electric font-sans">
                  <p className="font-semibold mb-1">Your default email application was triggered.</p>
                  <p>If it did not launch automatically, use the &ldquo;Copy Email Draft&rdquo; button above and send directly to <strong>sales@commediaindia.com</strong>.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

