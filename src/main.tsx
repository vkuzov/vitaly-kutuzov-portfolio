import { siteUrl, sitePath } from './config/urls';
import { Component, lazy, StrictMode, Suspense } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import './styles/tokens.css';
import './styles/main.css';
import './styles/identity.css';
import { projects } from './data/projects';
import { motion } from './config/motion';
import { Background } from './components/Effects';
import { Footer, Header } from './components/Layout';
import Home from './pages/Home';

const CasePage = lazy(() => import('./pages/CasePage'));

class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <main id="main" className="error-page"><p className="eyebrow">НЕ УДАЛОСЬ ЗАГРУЗИТЬ СТРАНИЦУ</p><h1>Попробуем ещё раз?</h1><p>Обновите страницу. Если ошибка повторится, вернитесь на главную.</p><a className="button button-primary" href={window.location.pathname}>Обновить страницу</a><a className="text-link" href={siteUrl('/')}>На главную ↗</a></main> : this.props.children;
  }
}

function App() {
  const path = sitePath(window.location.pathname);
  const slug = path.startsWith('/projects/') ? path.slice('/projects/'.length) : '';
  const project = projects.find(item => item.slug === slug);
  return <><a className="skip-link" href="#main">Перейти к содержимому</a><Background /><div className="site-shell" id="top"><Header /><PageBoundary><Suspense fallback={<main id="main" className="page-loading" role="status">Загружается кейс…</main>}>{path === '/' ? <Home /> : project ? <CasePage project={project} /> : <main id="main" className="error-page"><p className="eyebrow">404 / СТРАНИЦА НЕ НАЙДЕНА</p><h1>Здесь пока пусто.</h1><a className="button button-primary" href={siteUrl('/')}>На главную <span aria-hidden="true">↗</span></a></main>}</Suspense></PageBoundary><Footer /></div></>;
}

document.documentElement.dataset.motion = motion.enabled ? 'on' : 'off';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
