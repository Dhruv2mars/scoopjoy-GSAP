"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Apple's signature easing
      const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)";
      const appleEaseOut = "cubic-bezier(0.16, 1, 0.3, 1)";

      // Set initial states
      gsap.set(".footer-item", {
        opacity: 0,
        y: 30,
      });

      // Footer entrance
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(".footer-item", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: appleEaseOut,
          });
        },
      });

      // Subtle hover interactions for links
      const links = gsap.utils.toArray(".footer-link");
      links.forEach((link: any) => {
        const handleMouseEnter = () => {
          gsap.to(link, {
            y: -2,
            duration: 0.3,
            ease: appleEase,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(link, {
            y: 0,
            duration: 0.3,
            ease: appleEase,
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Apple-style success feedback
    const form = e.target as HTMLFormElement;
    const button = form.querySelector("button");
    
    if (button) {
      gsap.to(button, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-gray-50 border-t border-gray-200"
    >
      <div className="container mx-auto px-6 py-16">
        <div ref={contentRef} className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="footer-item md:col-span-2">
            <div className="mb-6">
              <h3 
                className="text-3xl font-bold text-gray-900 mb-4"
                style={{
                  fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                ScoopJoy
              </h3>
              <p 
                className="text-gray-600 leading-relaxed max-w-md"
                style={{
                  fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Crafting moments of pure joy through premium ice cream experiences. 
                Every scoop tells a story of passion and perfection.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { name: "Instagram", icon: "📷" },
                { name: "Facebook", icon: "📘" },
                { name: "Twitter", icon: "🐦" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="footer-link w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h4 
              className="text-lg font-semibold text-gray-900 mb-6"
              style={{
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Flavors", href: "#flavors" },
                { label: "Our Story", href: "#story" },
                { label: "Shop", href: "#shop" },
                { label: "Locations", href: "#" },
                { label: "Catering", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="footer-link text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    style={{
                      fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-item">
            <h4 
              className="text-lg font-semibold text-gray-900 mb-6"
              style={{
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Stay Updated
            </h4>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                  style={{
                    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                style={{
                  fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Subscribe
              </button>
            </form>
            
            <p 
              className="text-sm text-gray-500 mt-4"
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Get the latest flavors and exclusive offers.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div 
            className="text-gray-500 text-sm mb-4 md:mb-0"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            © 2024 ScoopJoy. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
              <a 
                key={link}
                href="#" 
                className="footer-link text-gray-500 hover:text-gray-900 transition-colors duration-300"
                style={{
                  fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};