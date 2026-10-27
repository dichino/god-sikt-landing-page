import { useState } from 'react';
import { ArrowDown, ArrowRight, Braces, Check, ChevronDown, Database, Layers3, Network, Radio } from 'lucide-react';
import { architectureByLocale, technologiesByLocale } from '../data/project';
import { useLocale } from '../i18n/LocaleContext';
import { engineeringCopy } from '../i18n/engineering';
import { SectionLabel } from './Shared';

const architectureIcons = [Layers3, Braces, Network, Radio, Database];
export default function Engineering() {
  const { locale } = useLocale();
  const copy = engineeringCopy[locale];
  const architecture = architectureByLocale[locale];
  const technologies = technologiesByLocale[locale];
  const [active, setActive] = useState(1);
  const ActiveIcon = architectureIcons[active];
  return <section id="engineering" className="engineering container" aria-labelledby="engineering-title"><div className="section-heading"><div><SectionLabel number="05">{copy.sectionLabel}</SectionLabel><h2 id="engineering-title">{copy.title}<br/><span>{copy.titleAccent}</span></h2></div><p>{copy.introduction}<br/>{copy.introductionDetail}</p></div>
    <div className="architecture-layout"><div className="architecture-diagram"><div className="diagram-heading"><span>{copy.architectureHeading}</span><span>{copy.selectLayer} <ArrowDown size={12}/></span></div>{architecture.slice(0, 4).map((layer, index) => { const Icon = architectureIcons[index]; return <div className="architecture-row" key={layer.id}><button aria-pressed={active === index} onClick={() => setActive(index)}><Icon size={20}/><span><small>{layer.layer}</small><strong>{layer.name}</strong></span><ArrowRight size={16}/></button>{index < 3 && <div className="architecture-connector"><span/><small>{copy.connectors[index]}</small></div>}</div>; })}<div className="room-branch"><button aria-pressed={active === 4} onClick={() => setActive(4)}><Database size={20}/><span><small>{copy.signFlow}</small><strong>{copy.signLibrary}</strong></span><ArrowRight size={16}/></button></div><p className="diagram-footnote">{copy.diagramFootnote}</p></div>
    <div className="architecture-explanation" aria-live="polite"><div className="architecture-icon"><ActiveIcon size={30} strokeWidth={1.3}/></div><span className="small-label">{architecture[active].layer}</span><h3>{architecture[active].name}</h3><p>{architecture[active].description}</p><div className="code-label">{architecture[active].file}</div><div className="architecture-note"><span/><p>{architecture[active].detail}</p></div></div></div>
    <div className="stack-heading"><h3>{copy.stackTitle}</h3><span>{copy.stackLabel}</span></div><div className="tech-stack">{technologies.map(technology => <div key={technology.name}><span>{technology.tag}</span><h4>{technology.name}</h4><p>{technology.role}</p></div>)}</div>
    <Challenges/>
  </section>;
}

function Challenges() {
  const { locale } = useLocale();
  const copy = engineeringCopy[locale];
  const [open, setOpen] = useState<number | null>(0);
  return <div className="challenges"><div className="challenges-intro"><span className="small-label">{copy.decisionsLabel}</span><h2>{copy.decisionsTitle}<span className="accent">.</span></h2><p>{copy.decisionsIntroduction}<br/>{copy.decisionsIntroductionDetail}</p></div><div className="challenge-list">{copy.challenges.map((item, index) => <article className={open === index ? 'challenge open' : 'challenge'} key={index}><h3><button aria-expanded={open === index} aria-controls={`challenge-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className="challenge-number">0{index + 1}</span><span>{item.title}<small>{item.tag}</small></span><ChevronDown size={21}/></button></h3><div id={`challenge-${index}`} hidden={open !== index} className="challenge-body"><div><span>{copy.challengeLabel}</span><p>{item.challenge}</p></div><div><span>{copy.decisionLabel}</span><p>{item.decision}</p></div><div><span><Check size={13}/> {copy.resultLabel}</span><p>{item.result}</p></div></div></article>)}</div></div>;
}
