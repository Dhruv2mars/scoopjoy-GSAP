"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Scoop } from "./svgs/Scoop";
import { Cone } from "./svgs/Cone";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Apple's signature easing curves
      const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)";
      const appleEaseOut = "cubic-bezier(0.16, 1, 0.3, 1)";
      const elasticEase = "cubic-bezier(0.68, -0.55, 0.265, 1.55)";

      // Set initial states with more dramatic transforms
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationX: 15,
      });

      gsap.set(visualRef.current, {
        opacity: 0,
        scale: 0.6,
        y: 60,
        rotationY: 20,
      });

      // Premium entrance sequence with perfect Apple timing
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          // Start floating animations after entrance
          gsap.to(".scoop-element", {
            y: "random(-8, 8)",
            x: "random(-4, 4)",
            rotation: "random(-3, 3)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.5,
          });
        },
      });

      // Title entrance with character animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.4,
        ease: appleEaseOut,
      })
      // Subtitle with slight delay and elastic bounce
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: elasticEase,
      }, "-=0.9")
      // Visual element with dramatic scale and rotation
      .to(visualRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 1.6,
        ease: appleEaseOut,
      }, "-=0.8")
      // Individual scoop animations
      .to(".scoop-element", {
        scale: 1,
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      }, "-=1.2")
      // CTA button with magnetic effect setup
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: appleEaseOut,
      }, "-=0.6");

      // Advanced scroll-driven parallax with multiple layers
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const easeProgress = gsap.parseEase("power2.out")(progress);
          
          // Multi-layer parallax
          gsap.to(titleRef.current, {
            y: easeProgress * -80,
            opacity: 1 - easeProgress * 0.7,
            scale: 1 - easeProgress * 0.1,
            duration: 0.1,
          });

          gsap.to(subtitleRef.current, {
            y: easeProgress * -60,
            opacity: 1 - easeProgress * 0.8,
            duration: 0.1,
          });

          gsap.to(visualRef.current, {
            y: easeProgress * -40,
            scale: 1 - easeProgress * 0.15,
            rotationY: easeProgress * 10,
            duration: 0.1,
          });

          gsap.to(ctaRef.current, {
            y: easeProgress * -20,
            opacity: 1 - easeProgress * 0.9,
            duration: 0.1,
          });
        },
      });

      // Premium button interactions
      if (ctaRef.current) {
        const button = ctaRef.current;
        
        // Magnetic hover effect
        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.15;
          const deltaY = (e.clientY - centerY) * 0.15;

          gsap.to(button, {
            x: deltaX,
            y: deltaY,
            scale: 1.05,
            duration: 0.3,
            ease: appleEase,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: appleEaseOut,
          });
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          button.removeEventListener("mousemove", handleMouseMove);
          button.removeEventListener("mouseleave", handleMouseLeave);
        };
      }

      // Ambient particle system
      const createParticles = () => {
        const particleContainer = document.createElement("div");
        particleContainer.className = "particle-container";
        particleContainer.style.cssText = `
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        `;
        heroRef.current?.appendChild(particleContainer);

        for (let i = 0; i < 15; i++) {
          const particle = document.createElement("div");
          particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(45deg, #ff9999, #99ffcc, #6495ED);
            border-radius: 50%;
            opacity: 0.3;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
          `;
          particleContainer.appendChild(particle);

          gsap.to(particle, {
            y: "random(-100, 100)",
            x: "random(-50, 50)",
            opacity: "random(0.1, 0.5)",
            duration: "random(8, 15)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 5,
          });
        }
      };

      createParticles();

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTAClick = () => {
    // Premium button feedback with particle explosion
    gsap.to(ctaRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: () => {
        // Create particle explosion effect
        if (ctaRef.current) {
          const particles: HTMLElement[] = [];
          const rect = ctaRef.current.getBoundingClientRect();
          
          for (let i = 0; i < 12; i++) {
            const particle = document.createElement("div");
            particle.style.cssText = `
              position: fixed;
              width: 4px;
              height: 4px;
              background: linear-gradient(45deg, #ff9999, #99ffcc);
              border-radius: 50%;
              pointer-events: none;
              z-index: 1000;
              top: ${rect.top + rect.height / 2}px;
              left: ${rect.left + rect.width / 2}px;
            `;
            document.body.appendChild(particle);
            particles.push(particle);

            const angle = (360 / 12) * i;
            const distance = 60;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;

            gsap.to(particle, {
              x,
              y,
              opacity: 0,
              scale: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }
        }
      }
    });

    // Smooth scroll with Apple physics
    const target = document.getElementById("flavors");
    if (target) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: target, offsetY: 0 },
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      });
    }

    // Show loading state briefly
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ff9999 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #99ffcc 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Title - Apple typography hierarchy */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gray-900 mb-6"
          style={{
            fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 700,
            lineHeight: 0.9,
          }}
        >
          ScoopJoy
        </h1>

        {/* Subtitle - Perfect Apple spacing */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
          }}
        >
          Where premium ingredients meet perfect moments.
          <br />
          Experience ice cream, reimagined.
        </p>

        {/* Visual Element - Premium ice cream with advanced animations */}
        <div
          ref={visualRef}
          className="mb-16 flex justify-center items-end space-x-4"
        >
          {/* Sophisticated ice cream visual */}
          <div className="relative">
            {/* Scoops with individual animations */}
            <div className="flex flex-col items-center -space-y-6">
              <div className="scoop-element opacity-0 scale-75 transform">
                <Scoop color="#ff9999" size={100} flavor="strawberry" />
              </div>
              <div className="scoop-element opacity-0 scale-75 transform">
                <Scoop color="#99ffcc" size={110} flavor="mint" />
              </div>
              <div className="scoop-element opacity-0 scale-75 transform">
                <Scoop color="#6495ED" size={120} flavor="blueberry" />
              </div>
            </div>
            
            {/* Cone with entrance animation */}
            <div className="relative -mt-8 scoop-element opacity-0 scale-75">
              <Cone size={100} />
            </div>

            {/* Floating sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-60"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button - Premium Apple design with loading state */}
        <button
          ref={ctaRef}
          onClick={handleCTAClick}
          disabled={!isLoaded}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-70"
          style={{
            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            minWidth: "200px",
          }}
        >
          {isLoaded ? (
            "Explore Flavors"
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          )}
        </button>

        {/* Scroll indicator - Subtle Apple style */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Ambient lighting effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-pink-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-blue-100/30 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
};