# BMW M4 | The Purest Form of Obsession

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A high-fidelity, editorial-style launch page for the **BMW M4 Competition**. This project focuses on premium aesthetics, cinematic scroll experiences, and interactive engineering visualizations to create a "wow" factor for automotive enthusiasts.

---

## 🏎️ Cinematic Experience

This landing page is designed to be more than just a website; it's a digital experience that mirrors the precision and power of BMW M.

### Key Features
- **Interactive Hero Canvas**: A high-performance canvas-based entrance that sets the stage for the M4.
- **Engineering HUD (Blueprint Reveal)**: An interactive section that reveals the internal components and structural integrity of the machine via a HUD-style interface.
- **Editorial Storytelling**: A "Heritage" section that blends typography and imagery to tell the story of BMW M since 1972.
- **Specs Visualization**: A technical grid displaying performance data (0-60, Horsepower, Torque) with animated counters and high-fidelity typography.
- **Material Story**: An interactive exploration of the premium materials used, including Frozen Black Metallic finish and Carbon-Fibre weaves.
- **Custom Interaction Design**: Custom cursors, parallax image effects, and smooth scroll transitions powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Interactivity**: React Hooks (Intersection Observer, custom scroll logic)

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router pages and layouts
│   ├── configure/        # Configuration and pricing page
│   ├── page.tsx          # Main Landing Page (Hero, Heritage, Engineering, etc.)
│   └── layout.tsx        # Global layout and fonts
├── components/           # Reusable UI components
│   ├── BlueprintHUD.tsx  # Interactive engineering overlay
│   ├── HeroCanvas.tsx    # Canvas-based hero experience
│   ├── SpecsGrid.tsx     # Technical specifications display
│   ├── ParallaxImage.tsx # Smooth image scroll effects
│   └── ...               # Various utility components (SplitText, FadeIn, etc.)
├── public/               # Static assets (High-res car renders, textures)
└── tailwind.config.ts    # Custom design tokens (Colors, Typography, Animations)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayush07571/BMW-launch-page.git
   cd bmw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the experience.

---

## 🎨 Design Philosophy

The project adheres to a **Dark Mode Editorial** aesthetic:
- **Colors**: Deep `#0A0A0A` backgrounds with `#E3000F` (BMW M Red) accents.
- **Typography**: A mix of bold display headings and light, widely-tracked body text for a premium feel.
- **Motion**: High-momentum transitions and spring-based animations that feel "mechanical" yet fluid.

---

## 📄 License

© 2024 BMW M GmbH. This project is a portfolio piece and is not officially affiliated with BMW.

