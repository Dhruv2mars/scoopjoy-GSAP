"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register available GSAP plugins (free version)
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    Draggable,
    Flip,
    MotionPathPlugin,
    ScrollToPlugin
  );
}

// Apple-level GSAP utility functions
export const gsapUtils = {
  // Apple's signature easing curves
  easing: {
    apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    appleOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    appleIn: "cubic-bezier(0.4, 0, 1, 1)",
    elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Premium entrance animation with Apple timing
  fadeInUp: (element: string | Element, delay = 0) => {
    return gsap.fromTo(
      element,
      { y: 60, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        delay, 
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        force3D: true
      }
    );
  },

  // Sophisticated wobble with Apple physics
  wobble: (element: string | Element) => {
    return gsap.to(element, {
      rotation: "+=3",
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: "sine.inOut",
      transformOrigin: "center bottom",
    });
  },

  // Apple-style button press feedback
  buttonPress: (element: string | Element) => {
    return gsap.to(element, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
  },

  // Magnetic hover effect (Apple-style)
  magneticHover: (element: string | Element, strength = 0.3) => {
    const el = gsap.utils.toArray(element)[0] as HTMLElement;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  },

  // Liquid morphing animation
  liquidMorph: (element: string | Element) => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(element, {
      scaleX: 1.1,
      scaleY: 0.9,
      duration: 1.5,
      ease: "sine.inOut",
    })
    .to(element, {
      scaleX: 0.9,
      scaleY: 1.1,
      duration: 1.5,
      ease: "sine.inOut",
    });
    return tl;
  },

  // Advanced stagger with Apple timing
  staggerIn: (elements: string | Element[], delay = 0.08) => {
    return gsap.fromTo(
      elements,
      { 
        y: 40, 
        opacity: 0, 
        scale: 0.9,
        rotationX: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        stagger: delay,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        force3D: true,
      }
    );
  },

  // Particle explosion effect
  particleExplosion: (container: Element, count = 20) => {
    const particles: HTMLElement[] = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #ff9999, #99ffcc, #6495ED);
        border-radius: 50%;
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        particles.forEach(p => p.remove());
      }
    });

    particles.forEach((particle, i) => {
      const angle = (360 / count) * i;
      const distance = gsap.utils.random(50, 150);
      const x = Math.cos(angle * Math.PI / 180) * distance;
      const y = Math.sin(angle * Math.PI / 180) * distance;

      tl.to(particle, {
        x,
        y,
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: "power2.out",
      }, 0);
    });

    return tl;
  },

  // Smooth scroll with Apple physics
  scrollTo: (target: string | Element, offset = 0) => {
    return gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: target, offsetY: offset },
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    });
  },

  // Text reveal animation (Apple keynote style)
  textReveal: (element: string | Element) => {
    const el = gsap.utils.toArray(element)[0] as HTMLElement;
    if (!el) return;

    const text = el.textContent || "";
    const chars = text.split("");
    el.innerHTML = chars.map(char => 
      `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");

    return gsap.to(el.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
  },

  // Floating animation with subtle randomness
  float: (element: string | Element) => {
    return gsap.to(element, {
      y: "random(-10, 10)",
      x: "random(-5, 5)",
      rotation: "random(-2, 2)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },

  // Premium loading animation
  premiumLoader: (element: string | Element) => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(element, {
      rotation: 360,
      duration: 2,
      ease: "none",
    })
    .to(element, {
      scale: 1.1,
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
    }, 0);
    return tl;
  },
};

// Animation presets for different sections
export const animations = {
  hero: {
    // Cone assembly animation
    assembleCone: (cone: Element, scoops: Element[], toppings: Element[]) => {
      const tl = gsap.timeline();
      
      // Cone rises from bottom
      tl.fromTo(cone, 
        { y: 100, opacity: 0, rotation: -10 },
        { y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );
      
      // Scoops stack with stagger
      tl.fromTo(scoops,
        { y: -100, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "bounce.out" },
        "-=0.5"
      );
      
      // Toppings fall animation
      tl.to(toppings, {
        y: "random(50, 100)",
        x: "random(-20, 20)",
        rotation: "random(0, 360)",
        duration: 1.5,
        ease: "bounce.out",
        stagger: 0.1,
      }, "-=0.3");
      
      return tl;
    },

    // Logo text animation (using CSS transforms)
    animateLogo: (logoElement: Element) => {
      return gsap.fromTo(logoElement,
        { y: 100, opacity: 0, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        }
      );
    },
  },

  flavors: {
    // Flavor cards entrance
    revealCards: (cards: Element[]) => {
      return gsap.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.8, rotationY: 45 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },

    // Scoop transform animation (using scale and rotation)
    morphScoop: (scoop: Element) => {
      return gsap.to(scoop, {
        scale: 1.1,
        rotation: 10,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    },
  },

  story: {
    // Ingredient swirl animation
    ingredientSwirl: (ingredients: Element[], bowl: Element) => {
      const tl = gsap.timeline();
      
      // Animate bowl appearance
      tl.fromTo(bowl,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }
      );
      
      // Ingredients follow motion paths
      ingredients.forEach((ingredient, index) => {
        const path = `M${100 + index * 50},50 Q200,100 150,200 T100,300`;
        tl.to(ingredient, {
          motionPath: {
            path: path,
            autoRotate: true,
          },
          duration: 2,
          ease: "power2.inOut",
        }, index * 0.3);
      });
      
      return tl;
    },
  },

  shop: {
    // Carousel flip animation
    flipCarousel: (items: Element[]) => {
      return gsap.to(items, {
        rotationY: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut",
        transformOrigin: "center center",
      });
    },

    // Button pulse animation
    pulseButton: (button: Element) => {
      return gsap.to(button, {
        scale: 1.05,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
      });
    },
  },

  footer: {
    // Social icon wiggle
    wiggleIcons: (icons: Element[]) => {
      return gsap.to(icons, {
        rotation: "+=10",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    },
  },
};

export { gsap, ScrollTrigger, Draggable, Flip, MotionPathPlugin, ScrollToPlugin };