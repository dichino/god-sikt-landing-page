import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Figma, Github } from 'lucide-react';
import { links } from '../data/project';
import { useLocale } from '../i18n/LocaleContext';
import { processCopy } from '../i18n/process';
import { ExternalLink, Phone, SectionLabel } from './Shared';
import TeamSection from './TeamSection';

export default function Process() {
  const { locale } = useLocale();
  const copy = processCopy[locale];
  const evolution = copy.evolution;
  const development = copy.development;
  const [comparison, setComparison] = useState<'map' | 'weather'>('map');
  return <>
    <section id="process" className="process section-border" aria-labelledby="process-title"><div className="container"><div className="section-heading"><div><SectionLabel number="06">{evolution.sectionLabel}</SectionLabel><h2 id="process-title">{evolution.title[0]}<br/><span>{evolution.title[1]}</span></h2></div><div><p>{evolution.introduction[0]}<br/>{evolution.introduction[1]}</p><ExternalLink href={links.figma} className="text-link">{evolution.figmaLink}</ExternalLink></div></div>
      <div className="comparison-switch" aria-label={evolution.comparisonLabel}><button aria-pressed={comparison === 'map'} onClick={() => setComparison('map')}>{evolution.mapButton}</button><button aria-pressed={comparison === 'weather'} onClick={() => setComparison('weather')}>{evolution.weatherButton}</button></div>
      <div className="comparison-grid"><div className="comparison-side"><div className="comparison-label"><span>{evolution.prototype.label}</span><span>{evolution.prototype.phase}</span></div><Phone className="comparison-phone"><img src={`/assets/prototype-${comparison}.webp`} alt={comparison === 'map' ? evolution.prototype.mapAlt : evolution.prototype.weatherAlt} width="600" height="1299" loading="lazy"/></Phone><h3>{evolution.prototype.title}</h3><p>{evolution.prototype.description}</p><span className="comparison-tag">{evolution.prototype.tag}</span></div><div className="comparison-arrow" aria-hidden="true"><ArrowRight size={24}/></div><div className="comparison-side"><div className="comparison-label"><span>{evolution.application.label}</span><span>{evolution.application.phase}</span></div><Phone className="comparison-phone"><img src={`/assets/app-${comparison}.webp`} alt={comparison === 'map' ? evolution.application.mapAlt : evolution.application.weatherAlt} width="600" height="1300" loading="lazy"/></Phone><h3>{evolution.application.title}</h3><p>{evolution.application.description}</p><span className="comparison-tag delivered"><Check size={12}/> {evolution.application.tag}</span></div></div>
      <p className="prototype-note">{evolution.note}</p>
    </div></section>
    <section className="development container" aria-labelledby="development-title"><SectionLabel number="07">{development.sectionLabel}</SectionLabel><div className="section-heading"><h2 id="development-title">{development.title[0]}<br/><span>{development.title[1]}</span></h2><p>{development.introduction[0]}<br/>{development.introduction[1]}</p></div><div className="process-timeline">{development.timeline.map(({ number, title, description }) => <div key={number}><span className="timeline-point"/><span className="small-label">{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div><div className="testing-note"><div><span className="small-label">{development.qualityLabel}</span><h3>{development.qualityTitle}</h3></div><div><p>{development.testingDescription}</p><p className="muted">{development.testingNote}</p></div></div></section>
    <TeamSection/>
    <ProjectLinks/>
  </>;
}

function ProjectLinks() {
  const { locale } = useLocale();
  const copy = processCopy[locale].links;
  return <section className="project-links section-border" aria-labelledby="project-links-title"><div className="container"><div className="project-links-heading"><span className="eyebrow"><span className="status-dot"/> {copy.eyebrow}</span><h2 id="project-links-title">{copy.title}<span className="accent">.</span></h2><p>{copy.description}</p></div><div className="project-link-grid"><ExternalLink href={links.github} className="project-resource"><Github size={27}/><span><small>{copy.sourceLabel}</small><strong>{copy.sourceTitle}</strong><span>{copy.sourceDescription}</span></span></ExternalLink><ExternalLink href={links.figma} className="project-resource"><Figma size={27}/><span><small>{copy.prototypeLabel}</small><strong>{copy.prototypeTitle}</strong><span>{copy.prototypeDescription}</span></span></ExternalLink></div><p className="resource-note">{copy.note}</p></div></section>;
}

export function Footer() {
  const { locale } = useLocale();
  const copy = processCopy[locale].footer;
  return <footer className="container footer"><div><a href="#top" className="brand"><img src="/assets/logo.png" alt="" width="22" height="32"/><span>god sikt<span className="brand-dot">.</span></span></a><p>{copy.description}<br/>{copy.university}</p></div><div className="footer-credit"><span>{copy.credit}</span><a href="#top">{copy.backToTop} <ArrowUpRight size={16}/></a></div></footer>;
}
