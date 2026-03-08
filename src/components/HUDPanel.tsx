/**
 * HUDPanel.tsx - Reusable Panel Component
 * ========================================
 * 
 * WHAT IS A COMPONENT?
 * In plain HTML, if you wanted 10 identical boxes with titles, you'd copy-paste
 * the same HTML 10 times. In React, you create ONE component and reuse it:
 * 
 *   <HUDPanel title="SECTION 1">content here</HUDPanel>
 *   <HUDPanel title="SECTION 2">other content</HUDPanel>
 * 
 * WHAT ARE PROPS?
 * Props are like HTML attributes but for React components.
 *   HTML:   <img src="photo.jpg" alt="My photo">
 *   React:  <HUDPanel title="MY TITLE" delay={0.2}>
 * 
 * Props this component accepts:
 *   title     → Text for the header bar (optional)
 *   children  → Whatever you put between <HUDPanel> and </HUDPanel>
 *   className → Extra CSS classes (optional)
 *   delay     → Seconds before animation starts (optional, default: 0)
 */

import { motion } from "framer-motion"; // Animation library
import { ReactNode } from "react";

// TypeScript INTERFACE = defines what properties (props) this component expects
// Think of it as documentation: "this component needs these inputs"
interface HUDPanelProps {
  title?: string;       // ? means optional (doesn't have to be provided)
  children: ReactNode;  // "children" = whatever HTML/components go inside
  className?: string;   // Extra CSS classes
  delay?: number;       // Animation delay in seconds
}

// Component function: receives props, returns HTML (JSX)
const HUDPanel = ({ title, children, className = "", delay = 0 }: HUDPanelProps) => {
  return (
    // motion.div = a <div> with animation powers (from Framer Motion)
    //
    // ANIMATION EXPLAINED:
    // initial = where the element STARTS (invisible + 15px below its position)
    // animate = where the element ENDS (fully visible + normal position)
    // transition = HOW it gets there (0.5 second duration, with delay)
    //
    // In plain CSS, this would be:
    //   @keyframes fadeInUp {
    //     from { opacity: 0; transform: translateY(15px); }
    //     to   { opacity: 1; transform: translateY(0); }
    //   }
    //   .panel { animation: fadeInUp 0.5s ease forwards; }
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_20px_48px_hsl(230_40%_35%_/_0.14)] hud-bracket ${className}`}
    >
      {/* Title Bar — only shows if title prop was provided */}
      {/* In plain JS: if (title) { show this HTML } */}
      {title && (
        <div className="flex items-center gap-2 border-b border-white/55 bg-white/45 px-4 py-2.5">
          {/* Small glowing dot */}
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />

          {/* Title text */}
          <span className="font-display text-[11px] tracking-[0.18em] text-primary uppercase">
            {title}
          </span>
        </div>
      )}

      {/* Content Area — renders whatever was placed inside <HUDPanel>...</HUDPanel> */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default HUDPanel;
