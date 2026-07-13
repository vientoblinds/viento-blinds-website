'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Scissors,
  Droplets,
  Layers,
  Wrench,
  ShieldCheck,
  Truck,
  Image as ImageIcon,
  ArrowDown,
  Quote,
  Star
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

const REVIEWS = [
  {
    id: 'sonal-shah',
    quote: 'The designs offered are absolutely stunning and very well curated. The fabric quality is top-notch, and you can feel the durability instantly.',
    name: 'Sonal Shah',
    role: 'Architect',
    initials: 'SS'
  },
  {
    id: 'office-client',
    quote: 'We ordered for our office space and the blinds look super professional. The light control is excellent and the material feels durable. Will definitely recommend everyone.',
    name: 'Verified Buyer',
    role: 'Office Fit-Out',
    initials: 'VB'
  },
  {
    id: 'eco-blackout',
    quote: 'I chose the eco blackout white fabric and I’m honestly very impressed. The shade looks clean and minimal, while still blocking out light really well. The fabric feels thick and high-quality, not flimsy at all. Also, the team was very supportive in helping me pick the right option and ensured everything was installed perfectly. Great experience overall!',
    name: 'Verified Buyer',
    role: 'Eco Blackout Shades',
    initials: 'VB'
  },
  {
    id: 'on-time',
    quote: 'Delivery was quick and perfectly on schedule. It’s rare to see such commitment to timelines. Made the whole experience stress-free.',
    name: 'Verified Buyer',
    role: 'Residential Order',
    initials: 'VB'
  }
];

// Free-floating drift. Each axis runs on its own prime-ish duration so x, y and rotate
// never resync — the bubble wanders instead of bobbing on a loop.
const FLOAT = [
  {
    x: [0, 30, -18, 24, -28, 0],
    y: [0, -34, -8, 26, -14, 0],
    rotate: [0, 3, -1.6, 2.4, -2.8, 0],
    dur: { x: 13, y: 9, rotate: 17 },
    delay: 0
  },
  {
    x: [0, -26, 22, -32, 14, 0],
    y: [0, 24, -30, 12, -22, 0],
    rotate: [0, -2.6, 2, -3, 1.4, 0],
    dur: { x: 11, y: 14, rotate: 19 },
    delay: 1.1
  },
  {
    x: [0, 22, -30, 14, 28, 0],
    y: [0, -26, 20, -34, 10, 0],
    rotate: [0, 2.2, -2.8, 1.2, -1.8, 0],
    dur: { x: 15, y: 11, rotate: 21 },
    delay: 0.5
  },
  {
    x: [0, -20, 30, -14, -26, 0],
    y: [0, 30, -16, 34, -28, 0],
    rotate: [0, -2, 2.8, -1.4, 3, 0],
    dur: { x: 12, y: 16, rotate: 18 },
    delay: 1.7
  }
];

const floatLoop = (duration, delay) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut'
});

// Used when a bubble is hovered: glide out of the drift and hold still.
// Tween rather than spring — no overshoot, so the zoom reads as one clean move.
const SETTLE = { type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] };

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
      <div 
        className="page active factory-page-container"
        style={{ paddingTop: '160px', paddingBottom: '80px' }}
      >
        {/* Subtle SVG paper-grain noise overlay */}
        <div className="paper-grain" />

        {/* HERO SECTION */}
        <header 
          className="relative z-10 text-center px-6 mb-24 md:mb-32 mt-4 md:mt-8"
          style={{ maxWidth: '896px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        >
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
          className="relative px-6 md:px-0 py-12 mb-20 z-10"
          style={{ maxWidth: '1152px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
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

        {/* REVIEWS SECTION */}
        <ReviewsSection />

        <Footer />
      </div>
    </>
  );
}

// Reviews Section — bubbles sit collapsed; hovering one expands it over its neighbours
function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      id="factory-reviews"
      data-testid="factory-reviews"
      className="relative z-10"
      style={{
        maxWidth: '1152px',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '1rem 1.5rem 8rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center gap-4"
        style={{ marginBottom: '4rem' }}
      >
        <span className="block text-sm font-semibold uppercase tracking-[0.35em] text-[var(--fc-clay)]">
          In Their Words
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--fc-ink)] leading-tight tracking-tight">
          What our customers say
        </h2>
        <p className="text-sm text-[var(--fc-ink-soft)]">
          Hover a review to read it in full.
        </p>
      </motion.div>

      <div
        className="review-bubble-row"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {REVIEWS.map((review, index) => (
          <ReviewBubble
            key={review.id}
            review={review}
            index={index}
            isActive={activeIndex === index}
            isDimmed={activeIndex !== null && activeIndex !== index}
            onHover={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

// Individual Review Bubble — collapsed cell keeps grid stable; the card grows out of it on hover
function ReviewBubble({ review, index, isActive, isDimmed, onHover }) {
  const reduceMotion = useReducedMotion();
  const float = FLOAT[index % FLOAT.length];
  // Only the hovered bubble stops drifting; the others keep floating behind it
  const drifting = !reduceMotion && !isActive;

  return (
    <motion.article
      data-testid={`review-${review.id}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
      // Fixed-size cell: the expanded bubble overflows it instead of pushing the grid around
      className={`relative outline-none ${isActive ? 'z-30' : 'z-10'}`}
      style={{ height: '260px' }}
    >
      <motion.div
        animate={{
          // Always a circle — hover only scales it. No width/height/radius animation,
          // so the whole thing runs on the compositor and stays smooth.
          scale: isActive ? 1.62 : isDimmed ? 0.92 : 1,
          opacity: isDimmed ? 0.4 : 1,
          filter: isDimmed ? 'blur(2px)' : 'blur(0px)',
          // Free drift; the hovered bubble settles so it stays readable
          x: drifting ? float.x : 0,
          y: drifting ? float.y : 0,
          rotate: drifting ? float.rotate : 0
        }}
        transition={{
          scale: SETTLE,
          opacity: { duration: 0.35 },
          filter: { duration: 0.35 },
          x: drifting ? floatLoop(float.dur.x, float.delay) : SETTLE,
          y: drifting ? floatLoop(float.dur.y, float.delay) : SETTLE,
          rotate: drifting ? floatLoop(float.dur.rotate, float.delay) : SETTLE
        }}
        // Padding is inline because globals.css has an unlayered `* { padding: 0 }`
        // reset that overrides Tailwind's layered p-* utilities.
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '236px',
          height: '236px',
          borderRadius: '50%',
          padding: '1.9rem',
          willChange: 'transform'
        }}
        className={`flex flex-col items-center justify-center gap-2 text-center bg-[var(--fc-cream-deep)] border transition-[border-color,box-shadow] duration-500 ${
          isActive
            ? 'border-[var(--fc-clay)]/70 shadow-[0_24px_60px_rgba(32,32,29,0.16)]'
            : 'border-[var(--fc-line)]/40 shadow-[0_10px_30px_rgba(32,32,29,0.07)]'
        }`}
      >
        {/* Bubble tail — two dots, like a thought bubble */}
        <div className="absolute -bottom-4 left-7 flex flex-col items-center gap-1">
          <span
            className={`w-2.5 h-2.5 rounded-full bg-[var(--fc-cream-deep)] border transition-colors duration-500 ${
              isActive ? 'border-[var(--fc-clay)]/70' : 'border-[var(--fc-line)]/40'
            }`}
          />
          <span
            className={`w-1 h-1 rounded-full bg-[var(--fc-cream-deep)] border transition-colors duration-500 ${
              isActive ? 'border-[var(--fc-clay)]/70' : 'border-[var(--fc-line)]/40'
            }`}
          />
        </div>

        <Quote className="w-4 h-4 shrink-0 text-[var(--fc-clay)] opacity-90" />

        {/* Collapsed: clamped to 3 lines. Hovered: full text, set smaller so it fits
            the circle — the 1.62x scale brings it back to a readable size. */}
        <p
          className={`text-[var(--fc-ink)] ${
            isActive
              ? 'text-[0.56rem] leading-[1.5]'
              : 'text-[0.8rem] leading-relaxed line-clamp-3'
          }`}
        >
          {review.quote}
        </p>

        <div className="flex flex-col items-center gap-0.5 shrink-0">
          <div className="flex gap-0.5 text-[var(--fc-clay)]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`fill-current ${isActive ? 'w-2 h-2' : 'w-3 h-3'}`}
              />
            ))}
          </div>
          <span
            className={`block font-semibold text-[var(--fc-ink)] leading-snug ${
              isActive ? 'text-[0.6rem]' : 'text-xs'
            }`}
          >
            {review.name}
          </span>
          <span
            className={`block uppercase tracking-[0.2em] text-[var(--fc-ink-soft)] ${
              isActive ? 'text-[0.42rem]' : 'text-[0.55rem]'
            }`}
          >
            {review.role}
          </span>
        </div>
      </motion.div>
    </motion.article>
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
        className={`w-full mt-8 md:mt-0 mb-6! md:mb-10! ${
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
