'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Scissors, 
  Droplets, 
  Layers, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Image as ImageIcon, 
  ArrowDown 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Code comment: To use real images, drop image files in /public/images/
// and set the image field to e.g., "/images/weaving.jpg"
const STAGES = [
  {
    id: 'weaving',
    step: '01',
    title: 'Weaving',
    Icon: Scissors,
    image: '/assets/weaving.jpeg',
    description: 'Raw yarns are loaded onto precision looms where they are interlaced into our signature fabric. Tension and weave density are monitored continuously to give every blind its strength and drape.'
  },
  {
    id: 'dyeing',
    step: '02',
    title: 'Dyeing',
    Icon: Droplets,
    image: '/assets/Dying.jpeg',
    description: 'The woven fabric is immersed in colour-matched dye baths. Controlled temperature and timing lock in rich, fade-resistant tones that stay true season after season.'
  },
  {
    id: 'coating',
    step: '03',
    title: 'Coating',
    Icon: Layers,
    image: '/assets/Coating.jpeg',
    description: 'A protective coat is applied to add light control, moisture resistance and durability — the finish that turns fabric into a long-lasting blind.'
  },
  {
    id: 'assembly',
    step: '04',
    title: 'Assembly',
    Icon: Wrench,
    image: '/assets/Assembly.jpeg',
    description: 'Headrails, mechanisms and fabric come together on the assembly line. Skilled hands fit every component so each blind operates smoothly out of the box.'
  },
  {
    id: 'quality-check',
    step: '05',
    title: 'Quality Check',
    Icon: ShieldCheck,
    image: '/assets/QualityCHeck.jpeg',
    description: 'Every unit is inspected against our standards — colour, alignment, operation and finish. Only blinds that pass each checkpoint move forward.'
  },
  {
    id: 'dispatch',
    step: '06',
    title: 'Dispatch',
    Icon: Truck,
    image: '/assets/Dispatch.jpeg',
    description: 'Approved blinds are carefully packed, labelled and loaded for delivery — ready to travel from our factory floor to your window.'
  }
];

export default function FactoryPage() {
  const containerRef = useRef(null);

  // Track scroll progress of the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to scaleY (from 0 to 1)
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <Navbar />
      <div className="page active factory-page-container py-24 md:py-32">
        {/* Subtle SVG paper-grain noise overlay */}
        <div className="paper-grain" />

        {/* HERO SECTION */}
        <header className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-24 md:mb-32 mt-12 md:mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block text-sm font-semibold uppercase tracking-[0.35em] text-[var(--fc-clay)] mb-4"
          >
            Inside Our Factory
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--fc-ink)] leading-tight tracking-tight mb-6"
          >
            How our blinds are made — from <span className="text-[var(--fc-clay)]">thread</span> to your window.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-[var(--fc-ink-soft)] leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Scroll through the six stages of our craft — every blind passes through each step before it leaves our floor.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut"
              }}
              className="w-12 h-12 rounded-full border border-[var(--fc-line)] flex items-center justify-center text-[var(--fc-clay)] mx-auto cursor-pointer shadow-sm bg-[var(--fc-cream-deep)]/30"
              onClick={() => {
                const el = document.getElementById('factory-timeline');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </header>

        {/* TIMELINE SECTION */}
        <section 
          id="factory-timeline"
          data-testid="factory-timeline"
          ref={containerRef}
          className="relative max-w-6xl mx-auto px-6 md:px-0 py-12 mb-20 z-10"
        >
          {/* Vertical Spine (Starts and ends exactly at the dot centers) */}
          <div className="absolute top-[24px] bottom-[24px] left-[16px] md:left-1/2 -translate-x-1/2 w-[2px]">
            {/* Background static line */}
            <div className="w-full h-full bg-[var(--fc-line)] rounded-full" />
            {/* Animated drawing line */}
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-[var(--fc-clay)] rounded-full"
            />
          </div>

          {/* Process Stages */}
          <div className="space-y-24 md:space-y-36">
            {STAGES.map((stage, index) => {
              const isLeftText = index % 2 === 0;
              return (
                <TimelineStage 
                  key={stage.id} 
                  stage={stage} 
                  index={index} 
                  isLeftText={isLeftText} 
                />
              );
            })}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// Stage Component
function TimelineStage({ stage, index, isLeftText }) {
  const { Icon } = stage;

  return (
    <div 
      data-testid={`stage-${stage.id}`}
      className="relative flex flex-col md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-24 items-start pl-12 md:pl-0"
    >
      {/* Node Dot on Spine (Hollow clay circle with cream center, vertically centered with step number row) */}
      <div className="absolute left-[16px] md:left-1/2 top-[24px] -translate-y-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="w-5 h-5 rounded-full bg-[var(--fc-cream)] border-4 border-[var(--fc-clay)] shadow-sm"
        />
      </div>

      {/* TEXT BLOCK */}
      <motion.div
        initial={{ opacity: 0, x: isLeftText ? -48 : 48, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-col ${
          isLeftText 
            ? 'md:col-start-1 md:row-start-1 md:items-end md:text-right' 
            : 'md:col-start-2 md:row-start-1 md:items-start md:text-left'
        }`}
      >
        {/* Step Info Row (Height 12 / 48px to match dot center) */}
        <div 
          className={`flex items-center gap-4 mb-4 h-12 justify-start ${
            isLeftText ? 'md:justify-end md:flex-row-reverse' : ''
          }`}
        >
          {/* Icon in dark rounded square */}
          <div className="w-12 h-12 rounded-xl bg-[var(--fc-ink)] flex items-center justify-center text-[var(--fc-cream)] shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          {/* Step Number */}
          <span className="font-display text-5xl md:text-6xl text-[var(--fc-clay)] font-semibold leading-none">
            {stage.step}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl md:text-4xl font-semibold text-[var(--fc-ink)] mb-4 leading-tight">
          {stage.title}
        </h3>

        {/* Description */}
        <p className={`text-base leading-relaxed text-[var(--fc-ink-soft)] max-w-[28rem] ${
          isLeftText ? 'md:ml-auto md:text-right' : 'md:text-left'
        }`}>
          {stage.description}
        </p>
      </motion.div>

      {/* IMAGE BLOCK */}
      <motion.div
        initial={{ opacity: 0, x: isLeftText ? 48 : -48, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full mt-8 md:mt-0 ${
          isLeftText 
            ? 'md:col-start-2 md:row-start-1' 
            : 'md:col-start-1 md:row-start-1'
        }`}
      >
        <div className="aspect-video w-full rounded-[2rem] bg-[var(--fc-cream-deep)] shadow-[0_12px_32px_rgba(32,32,29,0.06)] overflow-hidden flex items-center justify-center p-4 border border-[var(--fc-line)]/30">
          {stage.image ? (
            <img 
              data-testid={`stage-image-${stage.id}`}
              src={stage.image} 
              alt={`${stage.title} process stage`} 
              className="w-full h-full object-cover rounded-[1.5rem]"
              loading="lazy"
            />
          ) : (
            <ImagePlaceholder stage={stage} />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Image Placeholder Component with Inset Dashed Border
function ImagePlaceholder({ stage }) {
  return (
    <div 
      data-testid={`stage-image-placeholder-${stage.id}`}
      className="flex flex-col items-center justify-center p-8 text-center w-full h-full border-2 border-dashed border-[var(--fc-line)] rounded-[1.5rem]"
    >
      <ImageIcon className="w-12 h-12 text-[var(--fc-sand)] mb-3" />
      <span className="font-semibold text-[var(--fc-ink)] text-lg mb-1">
        {stage.title} photo
      </span>
      <span className="text-xs text-[var(--fc-ink-soft)] opacity-80">
        Add image placeholder
      </span>
    </div>
  );
}
