import { useState } from 'react';
import { ArrowRight, Check, CloudSun, MapPin, MousePointer2, Radio, Wind } from 'lucide-react';
import { featuresCopy } from '../i18n/features';
import { useLocale } from '../i18n/LocaleContext';
import { Chart, SectionLabel } from './Shared';

export default function Features() {
  const { locale } = useLocale();
  const copy = featuresCopy[locale];
  return <section className="features container" aria-labelledby="features-title"><div className="section-heading"><div><SectionLabel number="03">{copy.sectionLabel}</SectionLabel><h2 id="features-title">{copy.title[0]}<br/><span>{copy.title[1]}</span></h2></div><p>{copy.introduction[0]}<br/>{copy.introduction[1]}</p></div>
    <div className="feature-editorial"><div className="feature-map-art"><Chart labels/><img src="/assets/app-map.webp" alt={copy.map.alt} width="600" height="1300" loading="lazy"/><span className="visual-caption">{copy.map.caption}</span></div><div className="feature-copy"><span className="small-label">{copy.map.label}</span><h3>{copy.map.title[0]}<br/>{copy.map.title[1]}</h3><p>{copy.map.description}</p><span className="feature-annotation"><MapPin size={15}/> {copy.map.annotation}</span></div></div>
    <div className="feature-pair"><article className="weather-feature"><div className="feature-copy"><span className="small-label">{copy.weather.label}</span><h3>{copy.weather.title[0]}<br/>{copy.weather.title[1]}</h3><p>{copy.weather.description}</p></div><div className="weather-feature-art"><img src="/assets/app-weather.webp" alt={copy.weather.alt} width="600" height="1300" loading="lazy"/><div className="metric-annotation"><Wind size={17}/><span>{copy.weather.annotation[0]}<br/>{copy.weather.annotation[1]}</span></div></div></article><article className="signs-feature"><div className="feature-copy"><span className="small-label">{copy.signs.label}</span><h3>{copy.signs.title[0]}<br/>{copy.signs.title[1]}</h3><p>{copy.signs.description}</p></div><div className="signs-feature-art"><div><img src="/assets/signs/sidemarkering_babord.webp" alt={copy.signs.portAlt} width="90" height="90" loading="lazy"/><span>{copy.signs.portLabel}</span></div><div><img src="/assets/signs/beste_punkt_for_passasje.webp" alt={copy.signs.passageAlt} width="90" height="90" loading="lazy"/><span>{copy.signs.passageLabel}</span></div><div><img src="/assets/signs/sidemarkering_styrbord.webp" alt={copy.signs.starboardAlt} width="90" height="90" loading="lazy"/><span>{copy.signs.starboardLabel}</span></div></div><a href="#experience" className="text-link">{copy.signs.demoLink} <ArrowRight size={16}/></a></article></div>
  </section>;
}

const stepIcons = [Radio, MousePointer2, CloudSun, Radio, Check];

export function HowItWorks() {
  const { locale } = useLocale();
  const copy = featuresCopy[locale].howItWorks;
  const [active, setActive] = useState(0);
  const StepIcon = stepIcons[active];
  return <section id="how-it-works" className="how-it-works section-border"><div className="container"><SectionLabel number="04">{copy.sectionLabel}</SectionLabel><div className="section-heading"><h2>{copy.title[0]}<br/><span>{copy.title[1]}</span></h2><p>{copy.introduction[0]}<br/>{copy.introduction[1]}</p></div><div className="flow-steps" aria-label={copy.flowLabel}>{copy.steps.map((step, index) => <button key={index} aria-pressed={index === active} onClick={() => setActive(index)}><span className="flow-step-number">0{index + 1}</span><span>{step.title}</span>{index < copy.steps.length - 1 && <ArrowRight size={15}/>}</button>)}</div><div className="flow-detail" aria-live="polite"><div className="flow-detail-symbol"><StepIcon size={29} strokeWidth={1.4}/></div><div><span className="small-label">{copy.steps[active].label}</span><p>{copy.steps[active].detail}</p></div><button className="icon-button" aria-label={active === copy.steps.length - 1 ? copy.restartLabel : copy.nextLabel} onClick={() => setActive((active + 1) % copy.steps.length)}><ArrowRight size={22}/></button></div></div></section>;
}
