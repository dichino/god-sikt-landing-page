import { assetUrl } from '../lib/urls';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, CloudSun, Compass, Droplets, Info, LocateFixed, Map, MapPin, Minus, Navigation, Plus, Radio, RotateCcw, Signal, Smartphone, Sun, Wind, X } from 'lucide-react';
import { demoModesByLocale } from '../data/project';
import { useLocale } from '../i18n/LocaleContext';
import { demoCopy } from '../i18n/demo';
import type { DemoMode } from '../data/project';
import { places, positionFromPoint, sampleWeather, signCategories } from '../data/demo';
import type { Position, Sign } from '../data/demo';
import { Chart, Phone, SectionLabel } from './Shared';

type MainView = 'map' | 'signs' | 'about';

function WeatherPanel({ position, onClose }: { position: Position; onClose: () => void }) {
  const weather = sampleWeather(position);
  return <div className="weather-panel screen-enter" aria-label="Værdata som eksempel" aria-live="polite">
    <div className="sheet-handle"/><div className="weather-heading"><span><MapPin size={14}/>{position.name}</span><button className="icon-button" onClick={onClose} aria-label="Lukk værkort"><X size={19}/></button></div>
    <div className="weather-temperature"><div>{weather.temperature}<sup>°C</sup><span>{weather.condition}</span></div><Sun size={60} strokeWidth={1.3}/></div>
    <div className="weather-grid">
      <div><Wind/><span>Vind<strong>{weather.wind.toFixed(1).replace('.', ',')} m/s</strong></span></div><div><Navigation/><span>Vindretning<strong>{weather.direction}</strong></span></div>
      <div><Droplets/><span>Nedbør<strong>{weather.rain.toFixed(1).replace('.', ',')} mm</strong></span></div><div><CloudSun/><span>Tåkeandel<strong>{weather.fog}%</strong></span></div>
    </div>
    <div className="weather-alert"><Info size={17}/><span><strong>Se forholdene i sammenheng.</strong> Android-appen henter også farevarsler for valgt posisjon.</span></div>
    <p className="sample-note">EKSEMPELDATA · IKKE ET OPPDATERT VÆRVARSEL</p>
  </div>;
}

function MapView({ position, setPosition, weatherOpen, setWeatherOpen }: { position: Position; setPosition: (p: Position) => void; weatherOpen: boolean; setWeatherOpen: (open: boolean) => void }) {
  const [zoom, setZoom] = useState(1);
  const [help, setHelp] = useState(false);
  const selectPoint = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(positionFromPoint(((event.clientX - bounds.left) / bounds.width * 100 - 50) / zoom + 50, ((event.clientY - bounds.top) / bounds.height * 100 - 50) / zoom + 50));
  };
  const keyboardSelect = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, [number, number]> = { ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -3], ArrowDown: [0, 3] };
    if (event.key in moves) { event.preventDefault(); const [x, y] = moves[event.key]; setPosition(positionFromPoint(position.x + x, position.y + y)); }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setWeatherOpen(true); }
  };
  return <div className="demo-map">
    <div className="map-surface" role="button" tabIndex={0} aria-label="Illustrativt kart over Oslofjorden. Bruk piltastene for å velge posisjon og Enter for å åpne værkortet." onClick={selectPoint} onKeyDown={keyboardSelect}>
      <div className="map-transform" style={{ transform: `scale(${zoom})` }}><Chart labels/><div className="map-pin" style={{ left: `${position.x}%`, top: `${position.y}%` }}><MapPin size={29} fill="currentColor"/><span/></div></div>
    </div>
    <div className="map-label"><span className="status-dot"/> OSLOFJORDEN <span>ILLUSTRATIVT KART</span></div>
    <div className="map-compass" aria-hidden="true"><span>N</span><Navigation size={21}/></div>
    <div className="map-tools"><button className="icon-button" disabled={zoom >= 1.8} aria-label="Zoom inn" onClick={() => setZoom(Math.min(1.8, zoom + 0.2))}><Plus size={18}/></button><button className="icon-button" disabled={zoom <= 1} aria-label="Zoom ut" onClick={() => setZoom(Math.max(1, zoom - 0.2))}><Minus size={18}/></button><button className="icon-button" aria-label="Sentrer på eksempelposisjonen" onClick={() => { setPosition(places[0]); setZoom(1); }}><LocateFixed size={18}/></button><button className="icon-button" aria-label="Slik bruker du kartet" aria-expanded={help} onClick={() => setHelp(!help)}><Info size={18}/></button></div>
    {help && <div className="map-help"><button className="icon-button" aria-label="Lukk kartinstruksjoner" onClick={() => setHelp(false)}><X size={16}/></button><strong>Velg et sted. Se forholdene.</strong><p>Trykk på kartet eller velg et sted nedenfor, og åpne værkortet. Bruk + og − for å zoome. Posisjoner og værdata er kun eksempler.</p></div>}
    {!weatherOpen && <div className="location-panel"><div className="location-presets" aria-label="Eksempelsteder">{places.map(place => <button key={place.name} aria-pressed={position.name === place.name} onClick={() => setPosition(place)}>{place.name}</button>)}</div><div className="selected-location"><MapPin size={17}/><div><strong>{position.name}</strong><span>{position.lat.toFixed(3)}° N, {position.lon.toFixed(3)}° E</span></div></div><button className="weather-open-button" onClick={() => setWeatherOpen(true)}><CloudSun size={18}/> Vis vær <ArrowRight size={17}/></button></div>}
    {weatherOpen && <WeatherPanel position={position} onClose={() => setWeatherOpen(false)}/>}
  </div>;
}

function SignsView() {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Sign | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [category, selected]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(assetUrl('/assets/signs.json'), { signal: controller.signal }).then(response => { if (!response.ok) throw new Error('Unavailable'); return response.json(); }).then(setSigns).catch(error => { if (error.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, []);
  const categoryInfo = signCategories.find(c => c.id === category);
  const goBack = () => { if (selected) setSelected(null); else setCategory(null); };
  return <div className="sign-view screen-enter" lang="nb">
    <div className="app-inner-heading">{category && <button className="icon-button" aria-label="Tilbake" onClick={goBack}><ArrowLeft size={19}/></button>}<h3 ref={heading} tabIndex={-1}>{selected ? 'Skiltforklaring' : categoryInfo?.label ?? 'Skilt og regler'}</h3></div>
    {!category && <><p className="app-subtitle">Skiltbiblioteket fra den originale appen.</p><div className="category-list">{signCategories.map(item => <button key={item.id} onClick={() => { setCategory(item.id); setSelected(null); }}><span className="category-symbol">{item.symbol}</span><span>{item.label}<small>{item.description}</small></span><ChevronRight size={16}/></button>)}</div><p className="library-note">27 skilt · 5 kategorier<br/>Originale illustrasjoner og beskrivelser fra appen.</p></>}
    {category && !selected && <div className="sign-list">{error ? <p>Skiltbiblioteket kunne ikke lastes. Prøv å laste siden på nytt.</p> : signs.length === 0 ? <p>Laster skiltbiblioteket …</p> : signs.filter(sign => sign.category === category).map(sign => <button key={sign.id} onClick={() => { setSelected(sign); setFontSize(16); }}><img src={assetUrl(sign.image)} alt="" width="48" height="48"/><span>{sign.name}</span><ChevronRight size={16}/></button>)}</div>}
    {selected && <div className="sign-detail"><img src={assetUrl(selected.image)} alt={selected.name} width="120" height="120"/><h4>{selected.name}</h4><p style={{ fontSize }}>{selected.description}</p><div className="font-controls"><span>Tekststørrelse</span><button className="icon-button" aria-label="Reduser tekststørrelse" disabled={fontSize <= 14} onClick={() => setFontSize(v => v - 2)}><Minus size={19}/></button><button className="icon-button" aria-label="Øk tekststørrelse" disabled={fontSize >= 24} onClick={() => setFontSize(v => v + 2)}><Plus size={19}/></button></div></div>}
  </div>;
}

const aboutPages = [
  { title: 'Om oss', subtitle: 'Om prosjektet', body: 'God Sikt ble utviklet av seks studenter ved Universitetet i Oslo våren 2024, i emnet IN2000 – Software Engineering med prosjektarbeid. Appen samler kart, værinformasjon og maritime skilt for fritidsbåtførere.', photo: true },
  { title: 'Om datakilder', subtitle: 'Datakilder', body: 'Android-appen bruker Mapbox til kart, MET Norways Locationforecast til værdata og MetAlerts til farevarsler. De maritime skiltene ligger i en lokal Room-database. Denne nettversjonen bruker eksempeldata og et illustrativt kart.' },
  { title: 'Personvern', subtitle: 'Personvern i demoen', body: 'Demoen ber ikke om GPS-posisjonen din og sender ikke valgte posisjoner til en værtjeneste. Du trenger ingen konto. Alle handlinger skjer i nettleseren. Sentreringsknappen går tilbake til en eksempelposisjon.' },
  { title: 'Om demonstrasjonen', subtitle: 'Om nettversjonen', body: 'Her er utvalgte funksjoner fra God Sikt gjenskapt i nettleseren. Demoen viser prosjektet og skal ikke brukes til navigasjon. Den originale SOS-funksjonen var kun et konsept uten tilkobling til redningstjenesten. Den er derfor ikke gjenskapt her.' },
];

function AboutView() {
  const [page, setPage] = useState<number | null>(null);
  return <div className="about-view screen-enter"><div className="app-inner-heading">{page !== null && <button className="icon-button" aria-label="Tilbake til Om" onClick={() => setPage(null)}><ArrowLeft size={19}/></button>}<h3>{page === null ? 'Om God Sikt' : aboutPages[page].title}</h3></div>{page === null ? <><img className="about-logo" src={assetUrl('/assets/logo.png')} alt="God Sikt" width="55" height="79"/><p className="app-subtitle">Bli kjent med God Sikt.</p><div className="about-list">{aboutPages.map((item, index) => <button key={item.title} onClick={() => setPage(index)}><span>{item.title}<small>{item.subtitle}</small></span><ChevronRight size={17}/></button>)}</div><p className="library-note">UNIVERSITETET I OSLO · VÅREN 2024</p></> : <div className="about-detail">{aboutPages[page].photo && <img src={assetUrl('/assets/team.webp')} alt="Prosjektgruppen bak God Sikt samarbeider ved Universitetet i Oslo." width="900" height="675" loading="lazy"/>}<h4>{aboutPages[page].subtitle}</h4><p>{aboutPages[page].body}</p></div>}</div>;
}

export default function AppDemo() {
  const { locale } = useLocale();
  const copy = demoCopy[locale];
  const demoModes = demoModesByLocale[locale];
  const [view, setView] = useState<MainView>('map');
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [position, setPosition] = useState<Position>(places[0]);
  const [resetKey, setResetKey] = useState(0);
  const mode: DemoMode = view === 'map' ? weatherOpen ? 'weather' : 'map' : view;
  const chooseMode = (next: DemoMode) => { setView(next === 'weather' ? 'map' : next); setWeatherOpen(next === 'weather'); };
  const reset = () => { setView('map'); setWeatherOpen(false); setPosition(places[0]); setResetKey(v => v + 1); };
  return <section id="experience" className="experience section-border" aria-labelledby="experience-title"><div className="container experience-grid"><div className="experience-copy"><SectionLabel number="02">{copy.label}</SectionLabel><h2 id="experience-title">{copy.title}<br/><span>{copy.titleAccent}</span></h2><p className="section-intro">{copy.intro}<br/>{copy.introSecond}</p><div className="demo-mode-list" aria-label={copy.choose}>{demoModes.map((item, index) => <button key={item.id} aria-pressed={mode === item.id} onClick={() => chooseMode(item.id)}><span className="mode-number">0{index + 1}</span><span><strong>{item.label}</strong>{mode === item.id && <span className="mode-description">{item.description}</span>}</span><ArrowUpRightIcon active={mode === item.id}/></button>)}</div><div className="demo-disclaimer"><Smartphone size={18}/><div><strong>{copy.recreation}</strong><p>{copy.disclaimer}</p></div></div></div>
    <div className="demo-stage"><div className="demo-stage-top"><span><span className="status-dot"/> {copy.yourTurn}</span><button onClick={reset} className="reset-button"><RotateCcw size={13}/> {copy.reset}</button></div><Phone className="demo-phone" lang="nb"><div className="app-status" aria-hidden="true"><span>12:45</span><span><Signal size={12}/><Radio size={11}/><span className="battery-icon"/></span></div><div className="app-content" key={resetKey}>{view === 'map' && <MapView position={position} setPosition={setPosition} weatherOpen={weatherOpen} setWeatherOpen={setWeatherOpen}/ >}{view === 'signs' && <SignsView/>}{view === 'about' && <AboutView/>}</div><nav className="app-nav" aria-label="Appnavigasjon"><button aria-pressed={view === 'map'} onClick={() => chooseMode('map')}><Map size={20}/><span>Kart</span></button><button aria-pressed={view === 'signs'} onClick={() => chooseMode('signs')}><Compass size={20}/><span>Skilt</span></button><button aria-pressed={view === 'about'} onClick={() => chooseMode('about')}><Info size={20}/><span>Om</span></button></nav><div className="app-home-bar" aria-hidden="true"/></Phone><div className="demo-stage-bottom"><span>{copy.built}</span><span>{copy.recreated}</span></div></div>
  </div></section>;
}

function ArrowUpRightIcon({ active }: { active: boolean }) { return <span className={`mode-arrow ${active ? 'active' : ''}`}><ArrowRight size={18}/></span>; }
