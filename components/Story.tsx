"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const Story: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Apple's signature easing
      const appleEaseOut = "cubic-bezier(0.16, 1, 0.3, 1)";

      // Pin section for cinematic effect (Apple-style)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Parallax content movement
          gsap.to(contentRef.current, {
            y: progress * -50,
            opacity: 1 - progress * 0.3,
            duration: 0.1,
          });

          // Visual element transformation
          gsap.to(visualRef.current, {
            scale: 1 + progress * 0.2,
            rotation: progress * 5,
            duration: 0.1,
          });
        },
      });

      // Content entrance animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline();

          // Staggered text reveal
          tl.fromTo(".story-text", {
            opacity: 0,
            y: 40,
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: appleEaseOut,
          })
          // Visual elements
          .fromTo(".story-visual", {
            opacity: 0,
            scale: 0.8,
          }, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: appleEaseOut,
          }, "-=0.6");
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #ff9999 1px, transparent 1px),
                             radial-gradient(circle at 80% 20%, #99ffcc 1px, transparent 1px),
                             radial-gradient(circle at 40% 40%, #6495ED 1px, transparent 1px)`,
            backgroundSize: "100px 100px, 80px 80px, 120px 120px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <div className="story-text">
              <h2 
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight"
                style={{
                  fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Crafted with
                <br />
                <span className="text-gray-600">Passion</span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="story-text">
                <p 
                  className="text-xl text-gray-600 leading-relaxed"
                  style={{
                    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Every scoop begins with a commitment to excellence. 
                  We source the finest ingredients from trusted partners 
                  around the world.
                </p>
              </div>

              <div className="story-text">
                <p 
                  className="text-xl text-gray-600 leading-relaxed"
                  style={{
                    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Our master craftsmen blend traditional techniques 
                  with modern innovation, creating flavors that 
                  tell a story in every bite.
                </p>
              </div>

              <div className="story-text">
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold text-gray-900 mb-2"
                      style={{
                        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      24h
                    </div>
                    <div 
                      className="text-sm text-gray-600 uppercase tracking-wide"
                      style={{
                        fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Aging Process
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold text-gray-900 mb-2"
                      style={{
                        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      100%
                    </div>
                    <div 
                      className="text-sm text-gray-600 uppercase tracking-wide"
                      style={{
                        fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Natural
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold text-gray-900 mb-2"
                      style={{
                        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      50+
                    </div>
                    <div 
                      className="text-sm text-gray-600 uppercase tracking-wide"
                      style={{
                        fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Flavors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="story-visual">
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative bg-white rounded-3xl p-12 shadow-2xl">
                {/* Ingredient Visualization */}
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 
                      className="text-2xl font-bold text-gray-900 mb-8"
                      style={{
                        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Premium Ingredients
                    </h3>
                  </div>

                  {/* Ingredient Flow */}
                  <div className="space-y-6">
                    {[
                      { name: "Madagascar Vanilla", icon: "🌟", color: "#FFF8DC" },
                      { name: "Belgian Chocolate", icon: "🍫", color: "#8B4513" },
                      { name: "Fresh Strawberries", icon: "🍓", color: "#ff9999" },
                      { name: "Organic Cream", icon: "🥛", color: "#ffffff" },
                    ].map((ingredient, index) => (
                      <div 
                        key={ingredient.name}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${ingredient.color}40` }}
                        >
                          {ingredient.icon}
                        </div>
                        <div>
                          <div 
                            className="font-semibold text-gray-900"
                            style={{
                              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                            }}
                          >
                            {ingredient.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Process Arrow */}
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* Final Product */}
                  <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl">
                    <div className="text-4xl mb-2">🍨</div>
                    <div 
                      className="font-bold text-gray-900"
                      style={{
                        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Perfect Scoop
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-200 rounded-full opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-200 rounded-full opacity-60" />
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-green-200 rounded-full opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};