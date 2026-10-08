import { siteUrl } from '../config/urls';
import { useEffect } from 'react';
import type { Project } from '../data/projects';
import { Reveal, Spotlight } from '../components/Effects';
import { Contacts } from '../components/Layout';

import Gallery from '../components/Gallery';

export default function CasePage({ project }: { project: Project }) {
  useEffect(() => {
    document.title = `${project.title} — кейс | Виталий Кутузов`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', project.summary);
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView();
    }
  }, [project]);
  return <main id="main" className="case-page">
    <section className="case-hero"><a className="text-link back-link" href={siteUrl('/#projects')}><span aria-hidden="true">←</span> Все проекты</a><div className="case-head"><div><p className="eyebrow">КЕЙС / {project.category}</p><h1>{project.title}<span className="lime-title">.</span></h1></div><div className="case-head-side"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.url && <a className="button button-primary" href={project.url} target="_blank" rel="noreferrer">Открыть сайт <span aria-hidden="true">↗</span></a>}</div></div><p className="case-lead">{project.summary}</p><div className="project-stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div></section>
    <Gallery items={project.gallery} />
    <Reveal><section className="case-section case-brief" aria-label="Задача и роль"><div><p className="eyebrow">01 / ЗАДАЧА</p><h2>Удобный путь<br />к заказу.</h2><p>{project.task}</p></div><div><p className="eyebrow">МОЯ РОЛЬ</p><h2>От идеи<br />к реализации.</h2><p>{project.role}</p><span className="role-note">Разработка с использованием ИИ</span></div></section></Reveal>
    <Reveal><section className="case-section" aria-labelledby="features-title"><p className="eyebrow">02 / ПОЛЬЗОВАТЕЛЬСКИЕ ВОЗМОЖНОСТИ</p><h2 id="features-title">Больше, чем меню.</h2><div className="case-feature-grid">{project.features.map((feature, i) => <Spotlight className="case-feature" key={feature.title}><span className="eyebrow">0{i + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></Spotlight>)}</div></section></Reveal>
    <Reveal><section className="case-section" aria-labelledby="architecture-title"><p className="eyebrow">03 / УСТРОЙСТВО ПРОЕКТА</p><h2 id="architecture-title">Что под капотом.</h2><p className="case-section-intro">Описание по доступным исходникам. Наличие реализации не подтверждает работоспособность всех сценариев в текущей опубликованной версии.</p><div className="architecture-list">{project.architecture.map((item, i) => <article key={item.title}><span className="architecture-index">0{i + 1}</span><h3>{item.title}</h3><div><p>{item.text}</p>{item.source && <p className="source-label">{item.source}</p>}</div></article>)}</div></section></Reveal>
    <Reveal><section id="qa-materials" className="case-section section-anchor" aria-labelledby="qa-materials-title"><p className="eyebrow">04 / QA-МАТЕРИАЛЫ</p><h2 id="qa-materials-title">Проверка начинается<br /><span className="lime-title">с правильного вопроса.</span></h2><div className="qa-material-grid">{project.qa.map(item => <article className="qa-material" key={item.title}><p className="eyebrow">{item.type}</p><h3>{item.title}</h3><p>{item.text}</p>{item.source && <p className="source-label">{item.source}</p>}</article>)}</div>{project.qaNote && <aside className="evidence-note"><span aria-hidden="true">i</span><p>{project.qaNote}</p></aside>}<div className="case-material-actions"><a className="button button-primary" href={siteUrl('/#qa')}>Попробовать QA-демонстрацию <span aria-hidden="true">↗</span></a>{project.materials?.map(material => <a key={material.url} className="button button-secondary" href={siteUrl(material.url)} download={material.download || undefined}>{material.title}<span aria-hidden="true">↓</span></a>)}</div></section></Reveal>
    <Reveal><Contacts /></Reveal>
  </main>;
}
