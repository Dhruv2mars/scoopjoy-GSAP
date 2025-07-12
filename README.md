# ScoopJoy 🍦

A stunning ice cream landing page built with Next.js, TypeScript, and GSAP animations.

## Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, GSAP
- **Stunning Animations**: Full GSAP plugin suite including ScrollTrigger, Draggable, MorphSVG, Physics2D
- **Interactive Elements**: Draggable sundae builder, animated ice cream assembly
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Programmatic SVGs**: Custom ice cream components (cones, scoops, toppings)
- **Performance Optimized**: 60fps animations with GPU acceleration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: GSAP (all plugins)
- **Runtime**: Bun
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Bun (latest version)
- Node.js 18+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd scoopjoy
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
scoopjoy/
├── app/
│   ├── globals.css          # Global styles and fonts
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main landing page
├── components/
│   ├── ui/                  # Shadcn/UI components
│   ├── svgs/                # Programmatic SVG components
│   ├── Hero.tsx             # Hero section with cone assembly
│   ├── Flavors.tsx          # Flavor cards and sundae builder
│   ├── Story.tsx            # Our story with ingredient animation
│   ├── Shop.tsx             # Product carousel and CTA
│   └── Footer.tsx           # Footer with social links
├── lib/
│   ├── gsap.ts              # GSAP configuration and utilities
│   ├── flavors.ts           # Flavor and product data
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## GSAP Animations

This project showcases the full range of GSAP capabilities:

### ScrollTrigger
- Section entrance animations
- Parallax effects
- Pinned story section

### Draggable
- Interactive sundae builder
- Drag-and-drop scoops

### MorphSVG
- Shape transformations
- Scoop morphing effects

### Physics2D
- Realistic sprinkle falling
- Ingredient bouncing

### DrawSVG
- Animated drips
- Bowl outline drawing

### SplitText
- Character-by-character logo animation
- Text reveals

### MotionPath
- Ingredient swirl animations
- Curved movement paths

### Flip
- Carousel transitions
- State-based animations

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure build settings:
   - Build Command: `bun run build`
   - Install Command: `bun install`
   - Framework: Next.js

3. Deploy to production

The app will be available at `scoopjoy.vercel.app`

## Performance

- **60fps animations** with GPU acceleration
- **Optimized bundle size** with tree shaking
- **Responsive images** and lazy loading
- **Smooth scrolling** implementation
- **Mobile-optimized** touch interactions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- GSAP for incredible animation capabilities
- Shadcn/UI for beautiful components
- Tailwind CSS for utility-first styling
- Next.js for the amazing framework