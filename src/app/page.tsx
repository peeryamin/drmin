"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SurgicalScene from "@/components/SurgicalScene";
import {
  innovations,
  milestones,
  education,
  expertise,
  memberships,
  felicitationImages,
  newsArticles,
} from "@/lib/data";

// Icons as inline SVG components
const Icons = {
  star: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  globe: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  heart: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  check: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  ),
  trophy: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 7v6M9 10H5M5 3h14a1 1 0 0 1 1 1v3a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V4a1 1 0 0 1 1-1z" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  whatsapp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  doc: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const innovationIcons = [Icons.star, Icons.check, Icons.heart, Icons.trophy, Icons.globe];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navs = [
    { href: "#home", label: "Overview" },
    { href: "#innovations", label: "Innovations" },
    { href: "#milestones", label: "Milestones" },
    { href: "#credentials", label: "Credentials" },
    { href: "#gallery", label: "Gallery" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-6 px-[6vw] py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(245,250,249,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #dce9e7" : "1px solid transparent",
        boxShadow: scrolled ? "0 8px 28px rgba(8,63,72,0.08)" : "none",
      }}
    >
      <a href="#home" className="flex items-center gap-3 text-[#062f36] font-black text-lg no-underline">
        <span
          className="flex items-center justify-center w-11 h-11 rounded-2xl text-white font-black text-lg"
          style={{ background: "linear-gradient(135deg, #0f6f7d, #062f36)", boxShadow: "0 10px 24px rgba(15,111,125,0.28)" }}
        >
          RS
        </span>
        Dr. Rafiq Simnani
      </a>

      <nav className="hidden md:flex gap-6" aria-label="Primary navigation">
        {navs.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="relative text-[#607579] font-extrabold text-sm no-underline transition-colors hover:text-[#0f6f7d] pb-1"
            style={{}}
          >
            {n.label}
            <span
              className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-transform origin-right"
              style={{ background: "#d8a847", transform: "scaleX(0)" }}
            />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <a
          href="tel:+919858369400"
          className="hidden md:flex btn-primary text-sm"
        >
          {Icons.phone} Call Now
        </a>
        <button
          className="md:hidden p-3 rounded-xl bg-white border border-[#dce9e7] shadow-sm"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? Icons.close : Icons.menu}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-4 right-4 mt-2 p-5 bg-white/96 rounded-2xl border border-[#dce9e7] shadow-[0_24px_70px_rgba(8,63,72,0.14)] flex flex-col gap-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {navs.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-[#062f36] font-extrabold text-base py-2 border-b border-[#dce9e7] last:border-0"
              >
                {n.label}
              </a>
            ))}
            <a href="tel:+919858369400" className="btn-primary text-sm text-center mt-2">
              {Icons.phone} Call Now
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function FloatingActions() {
  return (
    <div className="fixed right-5 bottom-5 z-[90] flex flex-col gap-2.5">
      <a
        href="tel:+919858369400"
        className="flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-extrabold shadow-[0_12px_26px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-1"
        style={{ background: "linear-gradient(135deg, #0f6f7d, #062f36)" }}
        aria-label="Call Dr. Simnani"
      >
        {Icons.phone} <span className="hidden sm:inline">Call</span>
      </a>
      <a
        href="https://wa.me/919858369400?text=Hello%20Dr.%20Simnani%2C%20I%20would%20like%20to%20schedule%20a%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-extrabold shadow-[0_12px_26px_rgba(37,211,102,0.22)] transition-all hover:-translate-y-1"
        style={{ background: "#25d366" }}
        aria-label="WhatsApp Dr. Simnani"
      >
        {Icons.whatsapp} <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden px-[6vw] pt-24 pb-16"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #eaf6f4 100%)" }}
    >
      {/* Background orbs */}
      <span
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 pointer-events-none"
        style={{ background: "#d8a847", filter: "blur(4px)" }}
      />
      <span
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#0f6f7d", filter: "blur(4px)" }}
      />
      <span
        className="absolute right-[9vw] bottom-[15vh] w-80 h-80 rounded-full border border-[rgba(15,111,125,0.18)] pointer-events-none pulse-ring"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center w-full max-w-7xl mx-auto relative z-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <p className="eyebrow">Certified Robotic Surgeon</p>
          <h1
            className="text-[clamp(48px,7vw,92px)] font-black leading-[0.94] tracking-[-0.06em] mb-4"
            style={{ color: "#062f36" }}
          >
            Dr. Rafiq<br />Simnani
          </h1>
          <p
            className="text-[clamp(20px,2.5vw,28px)] font-black leading-snug mb-4"
            style={{ color: "#0f6f7d" }}
          >
            Senior Consultant — Minimally Invasive, Robotic &amp; Advanced Laparoscopic Surgery
          </p>
          <p className="text-[18px] mb-6" style={{ color: "#607579" }}>
            Pioneering minimally invasive surgery specialist with{" "}
            <strong>16+ years</strong> of experience and{" "}
            <strong>7,500+</strong> laparoscopic procedures.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a href="tel:+919858369400" className="btn-primary">
              {Icons.phone} Book Appointment
            </a>
            <a href="#innovations" className="btn-outline">
              View Innovations
            </a>
            <a
              href="https://wa.me/919858369400?text=Hello%20Dr.%20Simnani%2C%20I%20would%20like%20to%20schedule%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              {Icons.whatsapp} WhatsApp
            </a>
          </div>
        </motion.div>

        {/* WebGL surgical scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative order-1 lg:order-2 min-h-[480px] rounded-[32px] overflow-hidden border border-white/20 shadow-[0_30px_80px_rgba(8,63,72,0.15)]"
        >
          <div className="absolute inset-0 z-0">
            <SurgicalScene />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#062f36]/80 pointer-events-none" />
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#d8a847] mb-1">Field of View</p>
            <h3 className="text-xl font-black text-white tracking-tight">Laparoscopic Perspective</h3>
          </div>
        </motion.div>
        {/* Floating badges */}
        <div
          className="absolute top-4 left-4 z-30 glass-card rounded-full px-4 py-2.5 text-sm font-extrabold flex items-center gap-2 float-badge"
          style={{ color: "#0f6f7d" }}
        >
          {Icons.star} Robotic Surgery
        </div>
        <div
          className="absolute top-1/2 right-4 z-30 glass-card rounded-full px-4 py-2.5 text-sm font-extrabold flex items-center gap-2 float-badge"
          style={{ color: "#0f6f7d" }}
        >
          {Icons.check} Single-Port Pioneer
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: 16, suffix: "+", label: "Years Experience" },
    { value: 7500, suffix: "+", label: "Laparoscopic Procedures" },
    { value: 15, suffix: "+", label: "Conferences" },
  ];
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map((s) => Math.round(s.value * eased)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <section className="px-[6vw] -mt-11 relative z-20">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-[26px] bg-white/90 border border-[#dce9e7] shadow-[0_18px_42px_rgba(8,63,72,0.1)] backdrop-blur-md"
          >
            <strong className="text-[clamp(34px,5vw,58px)] font-black leading-none" style={{ color: "#062f36" }}>
              {i === 3 ? "2026+" : counts[i].toLocaleString()}{i !== 3 ? s.suffix : ""}
            </strong>
            <p className="text-sm font-extrabold mt-2" style={{ color: "#607579" }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Innovations() {
  return (
    <section id="innovations" className="px-[6vw] py-20" style={{ background: "linear-gradient(180deg, #f5faf9 0%, #ffffff 100%)" }}>
      <div className="section-heading">
        <p className="eyebrow">Innovations</p>
        <h2>Landmark Breakthroughs</h2>
        <p className="section-desc">
          Pioneering contributions that redefined surgical standards in the region and beyond.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {innovations.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative bg-white border border-[#dce9e7] rounded-3xl p-8 flex gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(8,63,72,0.14)] overflow-hidden cursor-pointer"
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
              style={{ background: "linear-gradient(90deg, #0f6f7d, #d8a847)" }}
            />

            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg, #0f6f7d, #062f36)", boxShadow: "0 8px 18px rgba(15,111,125,0.25)" }}
            >
              {innovationIcons[i]}
            </div>

            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-xs font-black px-3 py-1 rounded-full mb-3"
                style={{ background: "#dff4f2", color: "#0f6f7d" }}
              >
                {item.year}
              </span>
              <h3 className="text-[22px] font-black mb-2 leading-snug" style={{ color: "#062f36" }}>
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#607579" }}>
                {item.description}
              </p>
              <span
                className="inline-block text-xs font-black px-3 py-1 rounded-full"
                style={{ background: "#fff2cf", color: "#8a6a1d" }}
              >
                {item.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ArticleSection() {
  return (
    <section className="px-[6vw] py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#dce9e7] rounded-3xl p-8 md:p-12 shadow-[0_18px_42px_rgba(8,63,72,0.08)]"
        >
          <span className="eyebrow text-[#0f6f7d]">Srinagar, Aug 19 — Day-Care Laparoscopic Surgery</span>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#183236" }}>
            Doctors and patients are excited about the advances in laparoscopic surgeries of the gallbladder in Kashmir. Patients suffering from gallstones, gallbladder polyps and related issues are having event-free surgeries and getting admitted, operated and discharged the same day — significantly reducing hospital stay times and expenses.
          </p>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#183236" }}>
            Day-care <em>Laparoscopic Cholecystectomy</em>, which is performed only at a few advanced surgical centers in the country, has been started in Kashmir by one of the senior-most Laparoscopic and Robotic surgeons, <strong>Dr. Rafiq Simnani</strong>. He shared that this is the first such facility in the Valley, in practice for the past six months.
          </p>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#183236" }}>
            "The aim of this advanced day-care laparoscopic surgery is to give the best surgical solution with the best comfort to patients' sufferings, in the shortest possible time — which at the same time lessens the psychological stress of the patients and the family to a significant extent. Overall it is cost-effective," he said.
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "#183236" }}>
            On <strong>August 15</strong>, Dr. Simnani performed the <strong>world's first day-care laparoscopic belly-button cholecystectomy</strong>. The 41-year-old patient from Srinagar had undergone multiple open surgeries previously and presented with fresh gallstone disease. The procedure was performed entirely through a single 10 mm umbilical incision with no other abdominal cuts. The patient was put on oral diet and discharged the same afternoon — a procedure not reported anywhere in medical literature till now.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Milestones() {
  return (
    <section
      id="milestones"
      className="px-[6vw] py-20"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #eef9f7 100%)" }}
    >
      <div className="section-heading">
        <p className="eyebrow">Career Milestones</p>
        <h2>My Evolution in Surgical Excellence</h2>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-[80px] top-4 bottom-4 w-0.5 rounded-full hidden md:block"
          style={{ background: "linear-gradient(180deg, #0f6f7d, #d8a847)" }}
        />

        <div className="flex flex-col gap-5">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative bg-white border border-[#dce9e7] rounded-2xl p-6 pl-[120px] md:pl-[110px] pr-6 transition-all duration-200 hover:shadow-[0_18px_40px_rgba(8,63,72,0.12)] hover:translate-x-1"
            >
              <span
                className="absolute left-0 top-5 w-[80px] text-right pr-4 text-[18px] font-black hidden md:block"
                style={{ color: "#0f6f7d" }}
              >
                {m.year}
              </span>
              <h3 className="text-[19px] font-black mb-1" style={{ color: "#062f36" }}>
                {m.title}
              </h3>
              <p className="text-[15px]" style={{ color: "#607579" }}>
                {m.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DistinguishedAchievements() {
  return (
    <section className="px-[6vw] py-16">
      <div className="section-heading">
        <p className="eyebrow">Legacy</p>
        <h2>Distinguished Achievements</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "World-First Surgical Innovations",
            items: [
              "World's first \"Single-Port Day Care Cholecystectomy\" — pioneering outpatient minimally invasive approach",
              "World's first \"Single-Port Laparoscopic Double Organ Surgery\" (Cholecystectomy with Ovarian Cystectomy) — 2010",
              "Regional pioneer: First introduction of single-port laparoscopic surgery in Kashmir Valley (2010)",
            ],
          },
          {
            title: "Clinical Excellence Milestones",
            items: [
              "Successfully performed laparoscopic cholecystectomy on a 105-year-old patient — second oldest case in world medical literature",
              "Pioneered day-care laparoscopic surgery programs in Kashmir Valley (since February 2025)",
              "Invented proprietary \"Simnani's Technique\" for mini-laparoscopic management of large gallstones (under patent process)",
            ],
          },
          {
            title: "Leadership & Knowledge Dissemination",
            items: [
              "Founding National Faculty in Laparoscopic Surgery; led major surgical workshops",
              "Organizing Secretary — First Live Laparoscopic Workshop in Kashmir (Fortis Hospital Gurgaon)",
              "Established \"Laparoscopic Gallbladder Week\" at Govt. Gousia Hospital, Srinagar",
              "Organized first Laparoscopic Bariatric Surgery Live Workshop in Kashmir (Fortis Hospital Faridabad)",
            ],
          },
        ].map((group) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#dce9e7] rounded-3xl p-8 shadow-[0_24px_70px_rgba(8,63,72,0.08)]"
          >
            <p className="eyebrow">{group.title.split(" ")[0]}</p>
            <h3 className="text-xl font-black mb-5" style={{ color: "#062f36" }}>
              {group.title}
            </h3>
            <ul className="space-y-4">
              {group.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#607579" }}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#d8a847" }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AcademicContributions() {
  return (
    <section className="px-[6vw] py-16">
      <div className="section-heading">
        <p className="eyebrow">Research & Mentorship</p>
        <h2>Academic Contributions & Research</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Publications & Conference Presentations",
            items: [
              "Presented papers and case studies at 15+ national and international surgical conferences",
              "Editorial Board Member – International Journal of Medicine & Public Health",
              "National Faculty Member in Laparoscopic Surgery; invited to lead advanced surgical workshops",
            ],
          },
          {
            title: "Editorial Responsibilities",
            items: [
              "Editorial Board Member – International Journal of Medicine & Public Health",
              "Peer reviewer for select national surgical journals",
            ],
          },
          {
            title: "Faculty & Mentorship",
            items: [
              "National Faculty Member in Laparoscopic Surgery",
              "Invited to lead advanced surgical workshops across India",
              "Mentored dozens of surgeons in minimally invasive techniques",
            ],
          },
        ].map((group) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#dce9e7] rounded-3xl p-8 shadow-[0_24px_70px_rgba(8,63,72,0.08)]"
          >
            <p className="eyebrow">{group.title.split(" ")[0]}</p>
            <h3 className="text-xl font-black mb-5" style={{ color: "#062f36" }}>
              {group.title}
            </h3>
            <ul className="space-y-4">
              {group.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#607579" }}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#d8a847" }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="credentials" className="px-[6vw] py-20">
      <div className="section-heading">
        <p className="eyebrow">Credentials</p>
        <h2>Qualifications &amp; Affiliations</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[#dce9e7] rounded-3xl p-8"
        >
          <p className="eyebrow">Education</p>
          <h3 className="text-xl font-black mb-5" style={{ color: "#062f36" }}>
            Academic &amp; Surgical Training
          </h3>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e} className="flex items-start gap-3 text-[15px]" style={{ color: "#607579" }}>
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0f6f7d" }} />
                {e}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white border border-[#dce9e7] rounded-3xl p-8"
        >
          <p className="eyebrow">Areas of Expertise</p>
          <h3 className="text-xl font-black mb-5" style={{ color: "#062f36" }}>
            What I Operate On
          </h3>
          <ul className="space-y-3">
            {expertise.map((e) => (
              <li key={e} className="flex items-start gap-3 text-[15px]" style={{ color: "#607579" }}>
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0f6f7d" }} />
                {e}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Memberships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white border border-[#dce9e7] rounded-3xl p-8"
        >
          <p className="eyebrow">Memberships</p>
          <h3 className="text-xl font-black mb-5" style={{ color: "#062f36" }}>
            Professional Affiliations
          </h3>
          <ul className="space-y-3">
            {memberships.map((m) => (
              <li key={m} className="flex items-start gap-3 text-[15px]" style={{ color: "#607579" }}>
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0f6f7d" }} />
                {m}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  const [activeTab, setActiveTab] = useState<"felicitations" | "media">("felicitations");

  return (
    <section
      id="gallery"
      className="px-[6vw] py-20"
      style={{ background: "#ffffff" }}
    >
      <div className="section-heading">
        <p className="eyebrow">Visual Archive</p>
        <h2>Photo Gallery &amp; Media</h2>
      </div>

      {/* Tabs */}
      <div className="flex max-w-[700px] mx-auto mb-10 border-b-2 border-[#e5edec]">
        {(["felicitations", "media"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex-1 py-3.5 px-6 text-sm font-extrabold transition-colors"
            style={{ color: activeTab === tab ? "#062f36" : "#607579" }}
          >
            {tab === "felicitations" ? "Felicitations & Awards" : "Media Coverage"}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-4 right-4 bottom-0 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #0f6f7d, #d8a847)" }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "felicitations" && (
          <motion.div
            key="felicitations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
          >
            {felicitationImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-[0_8px_22px_rgba(8,63,72,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(8,63,72,0.18)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,47,54,0.85)] to-transparent flex items-end p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-white font-bold text-sm">{img.caption}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "media" && (
          <motion.div
            key="media"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-[880px] mx-auto flex flex-col gap-4"
          >
            {newsArticles.map((item, i) => (
              <motion.a
                key={item.source}
                href={item.url || `#${i}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-5 p-5 bg-white border border-[#dce9e7] rounded-2xl text-decoration-none transition-all hover:shadow-[0_18px_40px_rgba(8,63,72,0.1)] hover:border-[rgba(15,111,125,0.3)] hover:translate-x-1"
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-[#0f6f7d]"
                  style={{ background: "#dff4f2" }}
                >
                  {Icons.doc}
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-[16px] font-black mb-0.5" style={{ color: "#062f36" }}>
                    {item.source}
                  </strong>
                  <p className="text-[14px] truncate" style={{ color: "#607579" }}>
                    {item.excerpt}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 text-[#0f6f7d] transition-transform group-hover:translate-x-1"
                >
                  {Icons.arrow}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="px-[6vw] py-12 grid grid-cols-1 md:grid-cols-2 gap-8"
      style={{ background: "#062f36", color: "#d7e8e6" }}
    >
      <div>
        <strong className="text-white text-lg font-black block mb-2">Dr. Rafiq Simnani</strong>
        <p className="text-sm">
          Senior Consultant — Minimally Invasive, Robotic &amp; Advanced Laparoscopic Surgery
        </p>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <a href="tel:+919858369400" className="hover:text-white transition-colors" style={{ color: "#d7e8e6" }}>
            +91 9858369400
          </a>
        </p>
        <p>
          <a href="mailto:rafiqsimnani2@gmail.com" className="hover:text-white transition-colors" style={{ color: "#d7e8e6" }}>
            rafiqsimnani2@gmail.com
          </a>
        </p>
        <p>Kashmir, India</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <Hero />
      <StatsBar />
      <Innovations />
      <ArticleSection />
      <Milestones />
      <DistinguishedAchievements />
      <AcademicContributions />
      <Credentials />
      <Gallery />
      <DistinguishedAchievements />
      <AcademicContributions />
      <Footer />
    </>
  );
}
