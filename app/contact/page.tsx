"use client";

import { useState, useEffect, useRef } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type FormStatus = "idle" | "submitting" | "sent";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const heroRef = useRef<HTMLElement>(null);

  /* ── Parallax: shift hero-mesh background on mouse move ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      hero.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ── Form: idle → submitting (1.5 s) → sent (3 s) → idle + reset ── */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("sent");

      setTimeout(() => {
        setFormStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main
        ref={heroRef}
        className="hero-mesh pt-[48px] pb-[48px]"
      >
        <div className="max-w-[1280px] mx-auto px-[24px]">
          {/* ── Header Section ── */}
          <div className="mb-[48px] max-w-2xl">
            <div className="inline-flex items-center px-[16px] py-[4px] rounded-full glass-panel text-primary text-label-md mb-[16px]">
              <span
                className="material-symbols-outlined mr-[4px] text-[18px]"
              >
                support_agent
              </span>
              Customer Support
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-[16px]">
              Get in Touch
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Have a question about our utility suite or need technical
              assistance? Our team is here to help you get the most out of
              Jamro Tools.
            </p>
          </div>

          {/* ── Bento Content Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
            {/* ── Contact Form ── */}
            <div className="lg:col-span-8 glass-panel p-[48px] rounded-xl">
              <form className="space-y-[24px]" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div className="flex flex-col gap-[4px]">
                    <label
                      className="text-label-md text-on-surface-variant"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full px-[16px] py-[8px] bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label
                      className="text-label-md text-on-surface-variant"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className="w-full px-[16px] py-[8px] bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                      id="email"
                      placeholder="john@example.com"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label
                    className="text-label-md text-on-surface-variant"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="w-full px-[16px] py-[8px] bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                    id="subject"
                    placeholder="Technical Assistance"
                    type="text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label
                    className="text-label-md text-on-surface-variant"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-[16px] py-[8px] bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md resize-none"
                    id="message"
                    placeholder="How can we help you today?"
                    rows={5}
                    required
                  />
                </div>

                <button
                  className={`w-full md:w-auto px-[48px] py-[16px] text-on-primary text-label-md rounded-full shadow-lg transition-all flex items-center justify-center gap-[8px] ${
                    formStatus === "sent"
                      ? "bg-tertiary-container"
                      : "bg-primary hover:bg-secondary hover:-translate-y-0.5 active:scale-95"
                  }`}
                  type="submit"
                  disabled={formStatus !== "idle"}
                >
                  {formStatus === "idle" && (
                    <>
                      Send Message
                      <span className="material-symbols-outlined text-[20px]">
                        send
                      </span>
                    </>
                  )}

                  {formStatus === "submitting" && (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">
                        progress_activity
                      </span>
                      Sending...
                    </>
                  )}

                  {formStatus === "sent" && (
                    <>
                      <span className="material-symbols-outlined text-[20px]">
                        check_circle
                      </span>
                      Sent!
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ── Info Sidebar ── */}
            <div className="lg:col-span-4 flex flex-col gap-[24px]">
              {/* Contact Details Card */}
              <div className="glass-panel p-[24px] rounded-xl flex flex-col gap-[24px]">
                <div className="flex items-start gap-[16px]">
                  <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-xl text-primary shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h3 className="text-title-lg text-on-surface mb-[4px]">
                      Email Us
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      support@jamrotools.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[16px]">
                  <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-xl text-primary shrink-0">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="text-title-lg text-on-surface mb-[4px]">
                      Our Office
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      123 Utility Ave, Suite 500
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Map (real Google Maps embed) ── */}
              <div className="h-48 rounded-xl overflow-hidden relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019276122601!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4443%3A0x1d5a1c0f0d2e0e0!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jamro Tools Office Location"
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                <div className="absolute bottom-[16px] left-[16px] glass-panel px-[8px] py-[4px] rounded-lg flex items-center gap-[4px]">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-label-sm text-on-surface">
                    Main Hub
                  </span>
                </div>
              </div>

              {/* ── Social Media Card ── */}
              <div className="glass-panel p-[24px] rounded-xl">
                <h3 className="text-title-lg text-on-surface mb-[24px]">
                  Follow Our Updates
                </h3>
                <div className="flex gap-[16px]">
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all duration-200"
                    href="#"
                    aria-label="Website"
                  >
                    <span className="material-symbols-outlined">public</span>
                  </a>
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all duration-200"
                    href="#"
                    aria-label="Share"
                  >
                    <span className="material-symbols-outlined">share</span>
                  </a>
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all duration-200"
                    href="#"
                    aria-label="Campaign"
                  >
                    <span className="material-symbols-outlined">campaign</span>
                  </a>
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all duration-200"
                    href="#"
                    aria-label="Hub"
                  >
                    <span className="material-symbols-outlined">hub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── FAQ Section Preview ── */}
          <section className="mt-[48px] py-[48px] border-t border-outline-variant">
            <div className="text-center mb-[48px]">
              <h2 className="text-headline-md mb-[8px]">
                Common Questions
              </h2>
              <p className="text-on-surface-variant text-body-md">
                Get instant answers to the most frequent inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              <div className="p-[24px] bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary/40 transition-colors">
                <h4 className="text-label-md text-primary mb-[4px]">
                  Privacy Concerns
                </h4>
                <p className="text-body-md text-on-surface">
                  How secure are my files when using the converters?
                </p>
              </div>

              <div className="p-[24px] bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary/40 transition-colors">
                <h4 className="text-label-md text-primary mb-[4px]">
                  Account Access
                </h4>
                <p className="text-body-md text-on-surface">
                  I'm having trouble logging in to my pro account.
                </p>
              </div>

              <div className="p-[24px] bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary/40 transition-colors">
                <h4 className="text-label-md text-primary mb-[4px]">
                  API Documentation
                </h4>
                <p className="text-body-md text-on-surface">
                  Where can I find the latest API integration guides?
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter hasMarginBottom={false} />
    </div>
  );
}