import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { motion } from '../config/motion';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return reduced || !motion.enabled;
}

export function Spotlight({ children, className = '', tilt = false }: { children: ReactNode; className?: string; tilt?: boolean }) {
  const reduced = useReducedMotion();
  const update = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (motion.spotlight) {
      el.style.setProperty('--spot-x', `${x}px`);
      el.style.setProperty('--spot-y', `${y}px`);
      el.style.setProperty('--spot-opacity', '1');
    }
    if (tilt && motion.tilt) {
      el.style.setProperty('--tilt-x', `${(0.5 - y / r.height) * motion.maxTilt * 2}deg`);
      el.style.setProperty('--tilt-y', `${(x / r.width - 0.5) * motion.maxTilt * 2}deg`);
    }
  };
  const reset = (e: PointerEvent<HTMLDivElement>) => {
    for (const name of ['--spot-opacity', '--tilt-x', '--tilt-y']) e.currentTarget.style.removeProperty(name);
  };
  return <div className={`spotlight ${tilt ? 'tilted' : ''} ${className}`} onPointerMove={update} onPointerLeave={reset}>{children}</div>;
}

export function DecryptedText({ text }: { text: string }) {
  const [value, setValue] = useState(text);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !motion.decrypt) { setValue(text); return; }
    const start = performance.now();
    const alphabet = '01/[]_<>*';
    const interval = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / motion.decryptDuration);
      setValue([...text].map((c, i) => i / text.length < progress || c === ' ' ? c : alphabet[Math.floor(Math.random() * alphabet.length)]).join(''));
      if (progress === 1) window.clearInterval(interval);
    }, 45);
    return () => window.clearInterval(interval);
  }, [text, reduced]);
  return <span aria-label={text}><span aria-hidden="true">{value}</span></span>;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !motion.reveal || !('IntersectionObserver' in window)) return;
    let animation: Animation | undefined;
    // Content is visible immediately; animate only when it enters the viewport.
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animation = element.animate([{ opacity: 0.7, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
        observer.disconnect();
      }
    }, { threshold: 0.06 });
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, [reduced]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function TargetArea({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const cursor = ref.current;
    if (!cursor || reduced || !motion.targetCursor || e.pointerType !== 'mouse') return;
    const area = e.currentTarget.getBoundingClientRect();
    const target = (e.target as HTMLElement).closest<HTMLElement>('button, summary, input, a');
    const rect = target?.getBoundingClientRect();
    const x = rect ? rect.left - area.left - 5 : e.clientX - area.left - 13;
    const y = rect ? rect.top - area.top - 5 : e.clientY - area.top - 13;
    Object.assign(cursor.style, { opacity: '1', transform: `translate(${x}px, ${y}px)`, width: `${rect ? rect.width + 10 : 26}px`, height: `${rect ? rect.height + 10 : 26}px` });
  };
  return <div className="target-area" onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.opacity = '0'; }}>
    {children}<span className="target-cursor" aria-hidden="true" ref={ref}><i /><i /><i /><i /></span>
  </div>;
}

export function Background() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = root.current;
    if (!element || reduced || !motion.background) return;
    const layers = Array.from(element.querySelectorAll<HTMLElement>('.parallax-layer'));
    const mobile = window.matchMedia('(max-width: 760px)');
    let viewport = Math.max(window.innerHeight, 1);
    let target = Math.max(0, window.scrollY);
    let current = target;
    let frame = 0;
    let previousTime = 0;
    const paint = () => {
      const phase = current / viewport;
      const strength = mobile.matches ? motion.mobileParallaxScale : 1;
      layers.forEach((layer, i) => {
        if (mobile.matches && i === 2) return;
        const speed = motion.parallaxSpeeds[i];
        // Bounded paths retain the decoration even on arbitrarily long case pages.
        // Every transform is a function of scroll position, so scrolling back retraces it.
        const y = Math.sin(phase * speed) * viewport * .24 * strength;
        const x = Math.sin(phase * speed * .7) * 95 * strength;
        const angle = Math.sin(phase * speed * .55) * (9 + i * 5) * strength;
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${(-y).toFixed(2)}px, 0) rotate(${angle.toFixed(3)}deg)`;
      });
    };
    const tick = (time: number) => {
      const dt = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;
      current += (target - current) * (1 - Math.exp(-dt / motion.scrollSmoothingMs));
      if (Math.abs(target - current) < .15) current = target;
      paint();
      if (current !== target) frame = requestAnimationFrame(tick);
      else { frame = 0; previousTime = 0; }
    };
    const schedule = () => {
      target = Math.max(0, window.scrollY);
      if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = () => { viewport = Math.max(window.innerHeight, 1); schedule(); };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
      else { current = target = Math.max(0, window.scrollY); paint(); }
    };
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    mobile.addEventListener('change', resize);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      mobile.removeEventListener('change', resize);
      document.removeEventListener('visibilitychange', visibility);
      layers.forEach(layer => layer.style.removeProperty('transform'));
    };
  }, [reduced]);
  return <div ref={root} className="ambient" aria-hidden="true" data-motion={!reduced && motion.background ? 'on' : 'off'}>
    <div className="ambient-glow" />
    <div className="parallax-layer depth-far"><div className="grid-field" /><div className="light-orbit orbit-0"><span /></div><span className="tech-mark mark-one">+<small>VK / 001</small></span></div>
    <div className="parallax-layer depth-middle"><div className="light-orbit orbit-1"><span /></div><span className="tech-mark mark-two">+<small>INTERFACE / LOGIC</small></span></div>
    <div className="parallax-layer depth-near"><div className="light-orbit orbit-2"><span /></div><span className="tech-mark mark-three">+<small>WEB / QA</small></span></div>
  </div>;
}
