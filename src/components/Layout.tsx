import { siteUrl } from '../config/urls';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const links = [['projects', 'Проекты'], ['qa', 'QA-практика'], ['about', 'Обо мне'], ['contacts', 'Контакты']];
  useEffect(() => {
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); button.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) setOpen(false); };
    const query = window.matchMedia('(min-width: 761px)');
    const resize = () => { if (query.matches) setOpen(false); };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    query.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); query.removeEventListener('change', resize); };
  }, [open]);
  return <header className="site-header" ref={header} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <a className="wordmark" href={siteUrl('/')} aria-label="Виталий Кутузов — главная"><span className="wordmark-symbol">вк<span>_</span></span><span className="wordmark-name">Виталий<br />Кутузов</span></a>
    <button ref={button} className="menu-button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Закрыть' : 'Меню'}<span aria-hidden="true">{open ? '×' : '+'}</span></button>
    <nav id="main-nav" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Основная навигация">{links.map(([id, title]) => <a href={siteUrl(`/#${id}`)} key={id} onClick={() => setOpen(false)}>{title}{id === 'contacts' && <span aria-hidden="true">↗</span>}</a>)}</nav>
  </header>;
}

export function Contacts() {
  const { email, telegram, telegramLabel, phone, phoneLabel, github, resume } = profile.contacts;
  return <section id="contacts" className="contact-section section-anchor" aria-labelledby="contacts-title">
    <div className="section-kicker"><span>05 / КОНТАКТЫ</span><span>СЛЕДУЮЩИЙ ШАГ</span></div>
    <div className="contact-content"><div><h2 id="contacts-title">Давайте сделаем<br /><span>что-то полезное.</span></h2><p>Обсудить сайт или предложить работу —<br className="desktop-break" /> буду рад познакомиться.</p></div><span className="contact-arrow" aria-hidden="true">↗</span></div>
    <div className="contact-links">
      <a className="contact-method" href={`mailto:${email}`}><span className="contact-method-label">Почта</span><span className="contact-method-value">{email}</span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
      <a className="contact-method" href={telegram} target="_blank" rel="noreferrer"><span className="contact-method-label">Telegram</span><span className="contact-method-value">{telegramLabel}</span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
      <a className="contact-method" href={`tel:${phone}`}><span className="contact-method-label">Телефон</span><span className="contact-method-value">{phoneLabel}</span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
    </div>
    <a className="text-link github-link" href={github} target="_blank" rel="noopener noreferrer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.99 10.99 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.13v3.15c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" /></svg>
      <span>Мой GitHub</span><span aria-hidden="true">↗</span>
    </a>
    {resume && <a className="text-link resume-link" href={siteUrl(resume)} target="_blank" rel="noreferrer">Резюме <span aria-hidden="true">↗</span></a>}
  </section>;
}

export function Footer() {
  return <footer className="site-footer"><a href={siteUrl('/')} className="footer-name">Виталий Кутузов<span>Сайты и QA</span></a><span className="footer-credit">Сделано с вниманием к деталям и помощью ИИ</span><a className="back-top" href="#top">Наверх <span aria-hidden="true">↑</span></a></footer>;
}

export function SectionHeading({ index, label, title, aside }: { index: string; label: string; title: string; aside?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{index} / {label}</p><h2>{title}</h2></div>{aside && <p className="section-aside">{aside}</p>}</div>;
}
