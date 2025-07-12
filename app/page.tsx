"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AnimatedNavigation } from "@/components/AnimatedNavigation";
import { Hero } from "@/components/Hero";
import { Flavors } from "@/components/Flavors";
import { Story } from "@/components/Story";
import { Shop } from "@/components/Shop";
import { Footer } from "@/components/Footer";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Apple-level performance optimizations
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Register plugins
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scrolling setup (Apple-style)
    const setupSmoothScrolling = () => {
      // Disable default scroll behavior
      document.documentElement.style.scrollBehavior = "auto";
      
      // Custom smooth scroll implementation
      let isScrolling = false;
      let targetY = 0;
      let currentY = 0;
      
      const smoothScroll = () => {
        if (Math.abs(targetY - currentY) < 0.1) {
          isScrolling = false;
          return;
        }
        
        currentY += (targetY - currentY) * 0.1;
        window.scrollTo(0, currentY);
        
        if (isScrolling) {
          requestAnimationFrame(smoothScroll);
        }
      };

      // Handle scroll events
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        targetY += e.deltaY * 0.8;
        targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
        
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(smoothScroll);
        }
      };

      // Only enable on desktop for performance
      if (window.innerWidth > 768) {
        window.addEventListener("wheel", handleWheel, { passive: false });
        
        return () => {
          window.removeEventListener("wheel", handleWheel);
        };
      }
    };

    // Loading sequence with Apple timing
    const initializeApp = async () => {
      // Show loading screen
      if (loadingRef.current) {
        gsap.set(loadingRef.current, { display: "flex", opacity: 1 });
      }

      // Hide main content initially
      gsap.set(mainRef.current, { opacity: 0 });

      // Simulate loading time for smooth experience
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Apple-style loading exit
      const tl = gsap.timeline();
      
      if (loadingRef.current) {
        tl.to(loadingRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        })
        .set(loadingRef.current, { display: "none" });
      }

      // Main content entrance
      tl.to(mainRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      }, "-=0.4");

      // Initialize smooth scrolling after loading
      const cleanupScrolling = setupSmoothScrolling();
      
      return cleanupScrolling;
    };

    // Performance monitoring
    const monitorPerformance = () => {
      let frameCount = 0;
      let lastTime = performance.now();
      
      const checkFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          
          // Log performance in development
          if (process.env.NODE_ENV === "development") {
            console.log(`FPS: ${fps}`);
          }
          
          // Optimize if FPS drops below 50
          if (fps < 50) {
            gsap.globalTimeline.timeScale(0.8);
          } else {
            gsap.globalTimeline.timeScale(1);
          }
          
          frameCount = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
      };
      
      requestAnimationFrame(checkFPS);
    };

    // Initialize everything
    let cleanupScrolling: (() => void) | undefined;
    
    initializeApp().then((cleanup) => {
      cleanupScrolling = cleanup;
      monitorPerformance();
    });

    // Cleanup
    return () => {
      if (cleanupScrolling) {
        cleanupScrolling();
      }
      ScrollTrigger.killAll();
      gsap.killTweensOf("*");
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="text-2xl font-bold text-gray-900 tracking-tight">
                ScoopJoy
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Loading Screen */}
      <div 
        ref={loadingRef}
        className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        style={{ display: "none" }}
      >
        <div className="text-center">
          <div 
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            ScoopJoy
          </div>
          
          {/* Apple-style loading indicator */}
          <div className="w-8 h-8 mx-auto">
            <div className="w-full h-full border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <main 
        ref={mainRef}
        className="overflow-x-hidden"
        style={{
          fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Navigation */}
        <AnimatedNavigation />

        {/* Page Sections */}
        <div id="hero">
          <Hero />
        </div>
        
        <div id="flavors">
          <Flavors />
        </div>
        
        <div id="story">
          <Story />
        </div>
        
        <div id="shop">
          <Shop />
        </div>
        
        <Footer />


      </main>
    </>
  );
}