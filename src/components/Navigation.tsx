import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { links, navigationByLocale } from '../data/project';
import { useLocale } from '../i18n/LocaleContext';
import { commonCopy } from '../i18n/common';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const copy = commonCopy[locale];
  const navigation = navigationByLocale[locale];
  return <header className="site-header"><div className="nav-inner">
    <a href="#top" className="brand" aria-label={copy.home}><img src="/assets/logo.png" alt="" width="24" height="35"/><span>god sikt<span className="brand-dot">.</span></span></a>
    <nav className="desktop-nav" aria-label={copy.mainNavigation}>{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <div className="nav-actions"><div className="language-switch" role="group" aria-label={copy.language}><button lang="nb" aria-label="Norsk bokmål" aria-pressed={locale === 'nb'} onClick={() => setLocale('nb')}>NO</button><span aria-hidden="true">|</span><button lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button></div>
    <a className="nav-source" href={links.github} target="_blank" rel="noopener noreferrer">{copy.source} <ArrowUpRight size={16}/><span className="sr-only">{copy.newTab}</span></a>
    <button className="menu-toggle icon-button" aria-label={open ? copy.closeMenu : copy.openMenu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
  </div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label={copy.mobileNavigation}>{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18}/></a>)}</nav>}</header>;
}
