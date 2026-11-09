import { useRef } from 'react';
import { profile } from '../data/profile';
import { siteUrl } from '../config/urls';
import { Spotlight } from './Effects';

export default function EducationCertificate() {
  const dialog = useRef<HTMLDialogElement>(null);
  const education = profile.education;
  const image = siteUrl(education.document);
  const alt = `Сертификат ${education.issuer}: ${profile.name}, ${education.title}, № ${education.certificateNumber}, ${education.certificateDateLabel}`;

  return <section className="certificate-section" aria-labelledby="education-title">
    <h3 id="education-title" className="eyebrow">ОБРАЗОВАНИЕ И СЕРТИФИКАТЫ</h3>
    <Spotlight className="education certificate-card">
      <a className="certificate-preview" href={image} target="_blank" rel="noopener noreferrer" aria-label="Увеличить сертификат Skillbox" onClick={event => {
        if (dialog.current && typeof dialog.current.showModal === 'function') {
          event.preventDefault();
          dialog.current.showModal();
        }
      }}>
        <img src={image} alt={alt} width="904" height="1280" loading="lazy" />
        <span>Увеличить <span aria-hidden="true">↗</span></span>
      </a>
      <div className="certificate-info">
        <p className="eyebrow">{education.issuer}</p>
        <h4>{education.title}</h4>
        <p>{education.description}</p>
        <dl className="certificate-meta">
          <div><dt>Владелец</dt><dd>{profile.name}</dd></div>
          <div><dt>Номер сертификата</dt><dd>{education.certificateNumber}</dd></div>
          <div><dt>Дата выдачи</dt><dd><time dateTime={education.certificateDate}>{education.certificateDateLabel}</time></dd></div>
        </dl>
        <a className="text-link" href={image} target="_blank" rel="noopener noreferrer">Открыть оригинал <span aria-hidden="true">↗</span></a>
      </div>
    </Spotlight>
    <dialog ref={dialog} className="certificate-dialog" aria-labelledby="certificate-dialog-title" onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
    }}>
      <div className="certificate-dialog-header"><h3 id="certificate-dialog-title">Сертификат Skillbox</h3><button type="button" className="icon-button" autoFocus aria-label="Закрыть сертификат" onClick={() => dialog.current?.close()}>×</button></div>
      <img src={image} alt={alt} width="904" height="1280" />
      <a className="text-link" href={image} target="_blank" rel="noopener noreferrer">Открыть в полном размере <span aria-hidden="true">↗</span></a>
    </dialog>
  </section>;
}
