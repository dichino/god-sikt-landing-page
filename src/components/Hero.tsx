import { ArrowDown, ArrowUpRight, Map, CloudSun, Compass, Wind, Droplets } from 'lucide-react';
import { Chart, Phone } from './Shared';
import { useLocale } from '../i18n/LocaleContext';
import { heroCopy } from '../i18n/hero';

export default function Hero() {
  const { locale } = useLocale();
  const copy = heroCopy[locale];
  return <>
    <section className="hero container" aria-labelledby="hero-title">
      <Chart className="hero-chart"/>
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot"/> {copy.university} <span className="eyebrow-divider">/</span> IN2000 · 2024</div>
        <h1 id="hero-title">{copy.title}<br/><span>{copy.titleAccent}</span></h1>
        <p className="hero-description">{copy.description}</p>
        <div className="hero-actions"><a className="button button-primary" href="#experience">{copy.explore} <ArrowDown size={17}/></a><a className="text-link" href="#how-it-works">{copy.how} <ArrowUpRight size={16}/></a></div>
        <div className="hero-tech"><span className="android-dot"/> ANDROID <span>·</span> KOTLIN <span>·</span> JETPACK COMPOSE <span>·</span> MAPBOX</div>
      </div>
      <div className="hero-visual">
        <div className="coordinate coordinate-top">59° 53′ 42″ N<br/>10° 44′ 13″ E</div>
        <div className="hero-orbit" aria-hidden="true"/><span className="chart-cross cross-one" aria-hidden="true">+</span><span className="chart-cross cross-two" aria-hidden="true">+</span>
        <Phone className="hero-phone"><img className="authentic-screen" src="/assets/app-chart.webp" alt={copy.screenshotAlt} width="600" height="1300" fetchPriority="high"/></Phone>
        <div className="floating-weather"><div className="floating-weather-top"><span><span className="status-dot"/> OSLOFJORDEN</span><span>{copy.example}</span></div><div className="floating-temperature"><span>18<sup>°</sup></span><CloudSun size={40} strokeWidth={1.2}/></div><div className="floating-metrics"><span><Wind size={15}/> {locale === 'nb' ? '2,1' : '2.1'} m/s</span><span><Droplets size={14}/> {locale === 'nb' ? '0,0' : '0.0'} mm</span></div></div>
        <div className="original-caption"><span/> {copy.original}</div>
      </div>
    </section>
    <div className="hero-bottom container"><span>{copy.built}</span><a href="#overview">{copy.discover} <ArrowDown size={15}/></a></div>
    <section className="overview container" id="overview" aria-labelledby="overview-title"><div><div className="section-label"><span>01</span><span>{copy.overviewLabel}</span></div><h2 id="overview-title">{copy.overviewTitle}<br/><span>{copy.overviewAccent}</span></h2></div><div className="overview-content"><p>{copy.overviewBody}</p><p className="muted">{copy.overviewContext}</p><div className="overview-pillars"><span><Map/> {copy.pillars[0]}</span><span><CloudSun/> {copy.pillars[1]}</span><span><Compass/> {copy.pillars[2]}</span></div></div></section>
  </>;
}
