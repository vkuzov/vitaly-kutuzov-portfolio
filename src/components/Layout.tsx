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
  const { email, telegram, telegramLabel, phone, phoneLabel, resume } = profile.contacts;
  return <section id="contacts" className="contact-section section-anchor" aria-labelledby="contacts-title">
    <div className="section-kicker"><span>05 / КОНТАКТЫ</span><span>СЛЕДУЮЩИЙ ШАГ</span></div>
    <div className="contact-content"><div><h2 id="contacts-title">Давайте сделаем<br /><span>что-то полезное.</span></h2><p>Обсудить сайт или предложить работу —<br className="desktop-break" /> буду рад познакомиться.</p></div><span className="contact-arrow" aria-hidden="true">↗</span></div>
    <div className="contact-links">
      <a className="contact-method" href={`mailto:${email}`}><span className="contact-method-label">Почта</span><span className="contact-method-value">{email}</span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
      <a className="contact-method" href={telegram} target="_blank" rel="noreferrer"><span className="contact-method-label">Telegram</span><span className="contact-method-value">{telegramLabel}</span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
      <a className="contact-method" href={`tel:${phone}`}><span className="contact-method-label">Телефон</span><span className="contact-method-value">{phoneLabel}</span><span className="contact-method-arrow" aria-hidden="true">↗</span></a>
    </div>
    {resume && <a className="text-link resume-link" href={siteUrl(resume)} target="_blank" rel="noreferrer">Резюме <span aria-hidden="true">↗</span></a>}
  </section>;
}

export function Footer() {
  return <footer className="site-footer"><a href={siteUrl('/')} className="footer-name">Виталий Кутузов<span>Сайты и QA</span></a><span className="footer-credit">Сделано с вниманием к деталям и помощью ИИ</span><a className="back-top" href="#top">Наверх <span aria-hidden="true">↑</span></a></footer>;
}

export function SectionHeading({ index, label, title, aside }: { index: string; label: string; title: string; aside?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{index} / {label}</p><h2>{title}</h2></div>{aside && <p className="section-aside">{aside}</p>}</div>;
}
