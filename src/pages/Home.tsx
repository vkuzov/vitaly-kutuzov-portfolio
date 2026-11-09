import EducationCertificate from '../components/EducationCertificate';
import { siteUrl } from '../config/urls';
import { useEffect } from 'react';
import { profile, skills, directions, dossierSkills } from '../data/profile';
import { projects } from '../data/projects';
import { DecryptedText, Reveal, Spotlight } from '../components/Effects';
import { Contacts, SectionHeading } from '../components/Layout';
import QADemo from '../components/QADemo';

function ProfileCard() {
  return <div className="profile-wrap"><span className="profile-orbit" aria-hidden="true" /><Spotlight className="profile-card" tilt>
    <div className="profile-top"><span className="eyebrow">ЛИЧНОЕ ДЕЛО / 001</span><span aria-hidden="true">⌗</span></div>
    <div className="profile-photo">{profile.photo ? <img src={siteUrl(profile.photo)} alt={profile.name} width="360" height="420" /> : <><span className="profile-initials" aria-label="Инициалы Виталия Кутузова">{profile.initials}</span><span className="photo-note">ЗДЕСЬ БУДЕТ ФОТО</span><i className="photo-corner corner-tl" /><i className="photo-corner corner-tr" /><i className="photo-corner corner-bl" /><i className="photo-corner corner-br" /></>}</div>
    <div className="profile-info"><strong>{profile.name}</strong><p className="cooperation-status"><i aria-hidden="true" />Готов к сотрудничеству</p><p>Разработка с ИИ · QA-практика</p></div>
    <dl className="dossier-fields"><div><dt>НАПРАВЛЕНИЕ</dt><dd>Сайты + QA</dd></div><div><dt>ПОДХОД</dt><dd>Создавать и исследовать</dd></div></dl>
    <div className="profile-bottom"><span>ИДЕЯ → ИНТЕРФЕЙС → ПРОВЕРКА</span><span aria-hidden="true">+</span></div>
  </Spotlight><span className="profile-caption eyebrow">ВНИМАНИЕ К ВИДИМОМУ И НЕВИДИМОМУ</span></div>;
}

export default function Home() {
  useEffect(() => {
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, []);
  return <main id="main">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="hero-label"><span className="tiny-cross" aria-hidden="true">+</span><DecryptedText text="ПЕРСОНАЛЬНОЕ ПОРТФОЛИО / WEB + QA" /></p>
        <h1 id="hero-title" className="hero-name">{profile.name}</h1>
        <p className="hero-statement">Создаю сайты.<br /><span>Проверяю, как они работают.</span></p>
        <p className="hero-description">Использую ИИ, чтобы воплощать идеи в сайты.<br className="desktop-break" /> Развиваюсь в QA, чтобы смотреть глубже интерфейса.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Смотреть проекты <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="#contacts">Связаться <span aria-hidden="true">↗</span></a></div>
      </div><ProfileCard />
      <section className="dossier-skills" aria-label="Личное дело: навыки">
        <p className="eyebrow dossier-skills-label">ЛИЧНОЕ ДЕЛО / НАВЫКИ</p>
        {dossierSkills.map(block => <div className="dossier-skill-block" key={block.title}>
          <h2>{block.title}</h2>
          <ul className="dossier-skill-labels">{block.groups.flatMap(group => group.items).map(item => <li key={item.label}>{item.label}</li>)}</ul>
          <details><summary>Подробнее о навыках<span aria-hidden="true">+</span></summary>
            <div className="dossier-skill-details">{block.groups.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.flatMap(item => item.details).map(detail => <li key={detail}>{detail}</li>)}</ul></div>)}</div>
          </details>
        </div>)}
      </section>
      <div className="hero-bottom"><span className="eyebrow">СОЗДАВАТЬ. РАЗБИРАТЬСЯ. УЛУЧШАТЬ.</span><a href="#projects">Дальше — практика <span aria-hidden="true">↓</span></a></div>
    </section>
    <Reveal><section id="projects" className="content-section section-anchor" aria-label="Проекты">
      <SectionHeading index="01" label="ПРОЕКТЫ" title="Идеи в действии." aside="Реальный проект. Задачи, решения и внимание к пользовательскому опыту." />
      <div className="projects-list">{projects.map((project, index) => <Spotlight className="project-card" key={project.slug}>
        <a className="project-image-link" href={siteUrl(`/projects/${project.slug}/`)} aria-label={`Открыть кейс ${project.title}`}><div className="project-image-bar"><span className="browser-dots" aria-hidden="true">● ● ●</span><span>{project.title.toLowerCase()} / website</span><span aria-hidden="true">↗</span></div><div className="project-image"><img src={siteUrl(project.cover)} alt={`Архивный скриншот главной страницы ${project.title}`} width="1440" height="900" loading="lazy" /></div></a>
        <div className="project-description"><div className="project-meta"><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {project.category}</span><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><h3>{project.title}<span aria-hidden="true">↗</span></h3><p>{project.summary}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a className="text-link project-cta" href={siteUrl(`/projects/${project.slug}/`)}>Разобрать кейс <span aria-hidden="true">↗</span></a></div>
      </Spotlight>)}</div>
    </section></Reveal>
    <Reveal><section id="qa" className="content-section qa-section section-anchor" aria-labelledby="qa-title">
      <div className="qa-intro"><p className="eyebrow">02 / QA-ПРАКТИКА</p><p className="qa-overline">Как я проверяю интерфейс</p><h2 id="qa-title">А если ровно<br /><span className="lime-title">на границе?</span></h2><p>Бесплатная доставка от 600 ₽.<br />Кажется, всё просто. Но один знак в условии меняет результат.</p><p className="qa-invitation">Выберите сумму и посмотрите,<br />что произойдёт с доставкой.</p><div className="boundary-diagram" aria-hidden="true"><span>599</span><i /><span className="boundary-point">600</span><i /><span>601</span></div><a className="text-link" href={siteUrl('/projects/starfood/#qa-materials')}>QA-разбор Starfood <span aria-hidden="true">↗</span></a></div>
      <QADemo />
    </section></Reveal>
    <Reveal><section className="content-section opportunities" aria-label="Сотрудничество"><SectionHeading index="03" label="СОТРУДНИЧЕСТВО" title="Два направления. Один подход." />
      <div className="opportunity-grid">{directions.map(direction => <Spotlight key={direction.id} className="opportunity"><div className="opportunity-top"><p className="eyebrow">{direction.label}</p><span className="opportunity-symbol" aria-hidden="true">{direction.symbol}</span></div><h3>{direction.title}</h3><p>{direction.text}</p><a className="text-link" href={siteUrl(direction.link)}>{direction.action}<span aria-hidden="true">↗</span></a></Spotlight>)}</div>
    </section></Reveal>
    <Reveal><section id="about" className="content-section section-anchor" aria-labelledby="about-title"><div className="about-header"><div><p className="eyebrow">04 / ОБО МНЕ</p><h2 id="about-title">За интерфейсом —<br /><span className="muted-title">любопытство.</span></h2></div><div className="about-copy"><p>{profile.bio}</p><p>Учусь на собственных задачах: от структуры страниц до пограничных сценариев. Показываю конкретные примеры и честно обозначаю, что ещё изучаю.</p></div></div>
      <div className="skills-grid">{skills.map((skill, index) => <div className="skill" key={skill.title}><span className="skill-number">0{index + 1}</span><h3>{skill.title}</h3><p>{skill.detail}</p><div className="skill-tags">{skill.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>)}</div>
      <EducationCertificate />
    </section></Reveal>
    <Reveal><Contacts /></Reveal>
  </main>;
}
