import { siteUrl } from '../config/urls';
import { useRef, useState } from 'react';
import type { GalleryItem } from '../data/projects';

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  if (!items.length) return <p className="empty-state">Скриншоты проекта будут добавлены.</p>;
  const item = items[index];
  const change = (direction: number) => setIndex(current => (current + direction + items.length) % items.length);
  return <section className="gallery" aria-label="Скриншоты проекта" aria-roledescription="карусель">
    <div className="browser-bar" aria-hidden="true"><span className="browser-dots">● ● ●</span><span>STARFOOD / АРХИВ ПРОЕКТА</span><span>↗</span></div>
    <div className="gallery-stage" tabIndex={0} aria-label="Изображение. Используйте стрелки влево и вправо для переключения" onKeyDown={e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); change(e.key === 'ArrowLeft' ? -1 : 1); }
      if (e.key === 'Home') { e.preventDefault(); setIndex(0); }
      if (e.key === 'End') { e.preventDefault(); setIndex(items.length - 1); }
    }} onTouchStart={e => { start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }} onTouchCancel={() => { start.current = null; }} onTouchEnd={e => {
      if (!start.current) return;
      const dx = e.changedTouches[0].clientX - start.current.x;
      const dy = e.changedTouches[0].clientY - start.current.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) change(dx > 0 ? -1 : 1);
      start.current = null;
    }}><img key={item.src} src={siteUrl(item.src)} alt={item.alt} width="1440" height="900" /></div>
    <div className="gallery-bottom"><div className="gallery-caption" aria-live="polite" aria-atomic="true"><p><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span> {item.caption}</p><small>{item.note}</small></div><div className="gallery-arrows"><button className="icon-button" onClick={() => change(-1)} aria-label="Предыдущий скриншот" disabled={items.length < 2}>←</button><button className="icon-button" onClick={() => change(1)} aria-label="Следующий скриншот" disabled={items.length < 2}>→</button></div></div>
    <div className="gallery-dots" aria-label="Выбор скриншота">{items.map((slide, i) => <button key={slide.src} className={i === index ? 'selected' : ''} aria-label={`Скриншот ${i + 1}: ${slide.caption}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />)}</div>
  </section>;
}
