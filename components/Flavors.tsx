"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { flavors } from "@/lib/flavors";
import { Scoop } from "./svgs/Scoop";

export const Flavors: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Apple's signature easing
      const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)";
      const appleEaseOut = "cubic-bezier(0.16, 1, 0.3, 1)";

      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.set(".flavor-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
      });

      // Section entrance
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          const tl = gsap.timeline();

          // Title and subtitle with perfect timing
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: appleEaseOut,
          })
          .to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: appleEaseOut,
          }, "-=0.6")
          // Cards with staggered entrance
          .to(".flavor-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: appleEaseOut,
          }, "-=0.4");
        },
      });

      // Premium hover interactions with magnetic effect
      const cards = gsap.utils.toArray(".flavor-card");
      cards.forEach((card: any) => {
        // Magnetic hover effect
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.1;
          const deltaY = (e.clientY - centerY) * 0.1;

          gsap.to(card, {
            x: deltaX,
            y: deltaY - 12,
            scale: 1.03,
            rotationY: deltaX * 0.1,
            rotationX: -deltaY * 0.1,
            duration: 0.4,
            ease: appleEase,
            transformPerspective: 1000,
          });

          // Enhanced shadow with magnetic effect
          gsap.to(card.querySelector(".card-shadow"), {
            opacity: 0.2,
            scale: 1.08,
            x: deltaX * 0.5,
            y: deltaY * 0.5 + 8,
            duration: 0.4,
            ease: appleEase,
          });

          // Scoop animation on hover
          gsap.to(card.querySelector(".scoop-container"), {
            scale: 1.1,
            rotation: deltaX * 0.2,
            duration: 0.3,
            ease: appleEase,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: appleEaseOut,
          });

          gsap.to(card.querySelector(".card-shadow"), {
            opacity: 0.08,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: appleEaseOut,
          });

          gsap.to(card.querySelector(".scoop-container"), {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: appleEaseOut,
          });
        };

        // Click animation with particle effect
        const handleClick = () => {
          // Button press feedback
          gsap.to(card, {
            scale: 0.98,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          });

          // Create selection particles
          const rect = card.getBoundingClientRect();
          for (let i = 0; i < 8; i++) {
            const particle = document.createElement("div");
            particle.style.cssText = `
              position: fixed;
              width: 3px;
              height: 3px;
              background: ${card.dataset.color || "#ff9999"};
              border-radius: 50%;
              pointer-events: none;
              z-index: 1000;
              top: ${rect.top + rect.height / 2}px;
              left: ${rect.left + rect.width / 2}px;
            `;
            document.body.appendChild(particle);

            const angle = (360 / 8) * i;
            const distance = 40;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;

            gsap.to(particle, {
              x,
              y,
              opacity: 0,
              scale: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("click", handleClick);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFlavorSelect = (flavorId: string) => {
    setSelectedFlavor(flavorId);
    
    // Apple-style selection feedback
    const card = document.querySelector(`[data-flavor="${flavorId}"]`);
    if (card) {
      gsap.to(card, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{
              fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
              lineHeight: 1.1,
            }}
          >
            Crafted to Perfection
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Each flavor is meticulously crafted with premium ingredients,
            creating moments of pure joy in every scoop.
          </p>
        </div>

        {/* Flavor Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {flavors.map((flavor) => (
            <div
              key={flavor.id}
              data-flavor={flavor.id}
              data-color={flavor.color}
              className="flavor-card relative cursor-pointer group"
              onClick={() => handleFlavorSelect(flavor.id)}
            >
              {/* Card Shadow */}
              <div 
                className="card-shadow absolute inset-0 bg-black rounded-3xl opacity-8 blur-xl transform translate-y-4"
                style={{ zIndex: -1 }}
              />
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden">
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${flavor.color}, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Flavor Visual with enhanced animations */}
                  <div className="flex justify-center mb-6">
                    <div className="scoop-container transform">
                      <Scoop
                        color={flavor.color}
                        size={100}
                        flavor={flavor.id.split('-')[0]}
                      />
                      
                      {/* Floating elements around scoop */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full opacity-40"
                            style={{
                              background: flavor.color,
                              top: `${25 + Math.random() * 50}%`,
                              left: `${25 + Math.random() * 50}%`,
                              animationDelay: `${i * 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Flavor Info */}
                  <div className="text-center">
                    <h3 
                      className="text-2xl font-bold text-gray-900 mb-3"
                      style={{
                        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      {flavor.name}
                    </h3>
                    
                    <p 
                      className="text-gray-600 mb-6 leading-relaxed"
                      style={{
                        fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      {flavor.description}
                    </p>

                    {/* Ingredients */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Premium Ingredients
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {flavor.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full"
                            style={{
                              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                            }}
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="text-3xl font-bold text-gray-900"
                        style={{
                          fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        ${flavor.price}
                      </div>
                      
                      {/* Selection Indicator */}
                      <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                        selectedFlavor === flavor.id
                          ? "bg-gray-900 border-gray-900"
                          : "border-gray-300"
                      }`}>
                        {selectedFlavor === flavor.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Badge */}
                {flavor.popular && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              minWidth: "200px",
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};