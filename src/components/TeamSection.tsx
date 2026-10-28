import { assetUrl } from '../lib/urls';
import { useLocale } from '../i18n/LocaleContext';
import { teamCopy, teamMembers } from '../i18n/team';
import { SectionLabel } from './Shared';

export default function TeamSection() {
  const { locale } = useLocale();
  const copy = teamCopy[locale];
  return <section id="team" className="team-section container" aria-labelledby="team-title">
    <figure className="team-photo"><img src={assetUrl('/assets/team-portrait.webp')} alt={copy.photoAlt} width="1200" height="1200" loading="lazy"/><figcaption>{copy.caption}</figcaption></figure>
    <div className="team-copy"><SectionLabel number="08">{copy.label}</SectionLabel><h2 id="team-title">{copy.title}<br/><span>{copy.titleAccent}</span></h2><p>{copy.description}</p><p className="muted">{copy.collaboration}</p><div className="team-members"><span className="small-label">{copy.namesLabel}</span><ul>{teamMembers.map(name => <li key={name}>{name}</li>)}</ul></div></div>
  </section>;
}
