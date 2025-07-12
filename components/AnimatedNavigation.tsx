"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const AnimatedNavigation: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const menuItems = [
    { id: "hero", label: "Home" },
    { id: "flavors", label: "Flavors" },
    { id: "story", label: "Story" },
    { id: "shop", label: "Shop" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!navRef.current || !isMounted) return;

    const ctx = gsap.context(() => {
      // Apple's signature easing
      const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)";

      // Initial setup with stagger elements
      gsap.set(navRef.current, {
        y: -100,
        opacity: 0,
      });

      gsap.set(".nav-item", {
        opacity: 0,
        y: -20,
      });

      // Premium entrance animation with stagger
      const tl = gsap.timeline();
      
      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: appleEase,
        delay: 0.3,
      })
      .to(".nav-item", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      }, "-=0.6");

      // Scroll-based navigation transformation
      ScrollTrigger.create({
        trigger: "body",
        start: "100px top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrolled = self.scroll() > 100;
          
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
            
            // Apple-style backdrop blur transition
            gsap.to(navRef.current, {
              backgroundColor: scrolled 
                ? "rgba(255, 255, 255, 0.8)" 
                : "rgba(255, 255, 255, 0)",
              backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
              borderBottomColor: scrolled 
                ? "rgba(0, 0, 0, 0.1)" 
                : "rgba(0, 0, 0, 0)",
              duration: 0.3,
              ease: appleEase,
            });
          }
        },
      });

      // Section detection for active states
      const sections = ["hero", "flavors", "story", "shop"];
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setCurrentSection(section),
          onEnterBack: () => setCurrentSection(section),
        });
      });

    }, navRef);

    return () => ctx.revert();
  }, [isScrolled, isMounted]);

  const handleNavClick = (sectionId: string) => {
    // Apple-style smooth scroll
    const target = document.getElementById(sectionId);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      });
    }
  };

  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              ScoopJoy
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="px-4 py-2 text-sm font-medium text-gray-600"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="md:hidden p-2 text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo with premium animation */}
          <div
            ref={logoRef}
            className="nav-item flex items-center cursor-pointer group"
            onClick={() => handleNavClick("hero")}
          >
            <div className="text-2xl font-bold text-gray-900 tracking-tight transition-all duration-300 group-hover:scale-105">
              ScoopJoy
            </div>
          </div>

          {/* Desktop Menu with enhanced interactions */}
          <div ref={menuRef} className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  currentSection === item.id
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{
                  fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
                
                {/* Enhanced active indicator */}
                {currentSection === item.id && (
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded-full"
                    style={{
                      animation: "slideIn 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  />
                )}
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gray-100 rounded-lg opacity-0 transition-opacity duration-200 hover:opacity-100 -z-10" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};