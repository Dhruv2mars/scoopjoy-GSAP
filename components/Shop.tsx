"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const Shop: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const products = [
    {
      id: "premium-pint",
      name: "Premium Pint",
      description: "Take home our signature flavors in premium packaging",
      price: 12.99,
      image: "🍨",
      features: ["Premium packaging", "6 month shelf life", "Artisan crafted"],
    },
    {
      id: "family-pack",
      name: "Family Pack",
      description: "Perfect for sharing special moments with loved ones",
      price: 24.99,
      image: "🎁",
      features: ["4 pint variety", "Gift packaging", "Family sized"],
    },
    {
      id: "subscription",
      name: "Monthly Subscription",
      description: "Discover new flavors delivered to your door monthly",
      price: 19.99,
      image: "📦",
      features: ["Monthly delivery", "Exclusive flavors", "Cancel anytime"],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Apple's signature easing
      const appleEase = "cubic-bezier(0.25, 0.1, 0.25, 1)";
      const appleEaseOut = "cubic-bezier(0.16, 1, 0.3, 1)";

      // Set initial states
      gsap.set([titleRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.set(".product-card", {
        opacity: 0,
        y: 60,
        rotationY: 15,
      });

      // Section entrance
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          const tl = gsap.timeline();

          // Title entrance
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: appleEaseOut,
          })
          // Cards with 3D entrance
          .to(".product-card", {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.15,
            ease: appleEaseOut,
          }, "-=0.6");
        },
      });

      // Perfect 3D hover interactions
      const cards = gsap.utils.toArray(".product-card");
      cards.forEach((card: any) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / centerY * -10;
          const rotateY = (x - centerX) / centerX * 10;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: appleEase,
          });
        };

        const handleMouseEnter = () => {
          gsap.to(card, {
            z: 50,
            scale: 1.02,
            duration: 0.4,
            ease: appleEase,
          });

          gsap.to(card.querySelector(".card-shadow"), {
            opacity: 0.2,
            scale: 1.1,
            duration: 0.4,
            ease: appleEase,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            z: 0,
            scale: 1,
            duration: 0.4,
            ease: appleEase,
          });

          gsap.to(card.querySelector(".card-shadow"), {
            opacity: 0.1,
            scale: 1,
            duration: 0.4,
            ease: appleEase,
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProductSelect = (index: number) => {
    setSelectedProduct(index);
    
    // Apple-style selection feedback
    const card = document.querySelectorAll(".product-card")[index];
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
      id="shop"
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
            Take It Home
          </h2>
        </div>

        {/* Product Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card relative cursor-pointer"
              onClick={() => handleProductSelect(index)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Shadow */}
              <div 
                className="card-shadow absolute inset-0 bg-black rounded-3xl opacity-10 blur-xl transform translate-y-6"
                style={{ zIndex: -1 }}
              />
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden">
                {/* Selection Indicator */}
                {selectedProduct === index && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                )}

                {/* Product Visual */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{product.image}</div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 
                    className="text-2xl font-bold text-gray-900 mb-3"
                    style={{
                      fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {product.name}
                  </h3>
                  
                  <p 
                    className="text-gray-600 mb-6 leading-relaxed"
                    style={{
                      fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-600 flex items-center justify-center"
                          style={{
                            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                          }}
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div 
                    className="text-3xl font-bold text-gray-900 mb-6"
                    style={{
                      fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    ${product.price}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="w-full py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    style={{
                      fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-3xl p-12">
          <h3 
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Ready to Experience ScoopJoy?
          </h3>
          <p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Visit our store or order online for pickup and delivery.
            Your perfect scoop awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                minWidth: "200px",
              }}
            >
              Order Online
            </button>
            <button
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                minWidth: "200px",
              }}
            >
              Find Store
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};