import { useId } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { commonCopy } from '../i18n/common';

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}
export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const { locale } = useLocale();
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={17}/><span className="sr-only">{commonCopy[locale].newTab}</span></a>;
}
export function Phone({ children, className = '', lang }: { children: ReactNode; className?: string; lang?: string }) {
  return <div className={`phone ${className}`} lang={lang}><div className="phone-camera" aria-hidden="true"/><div className="phone-screen">{children}</div><div className="phone-side" aria-hidden="true"/></div>;
}
export function Chart({ className = '', labels = false }: { className?: string; labels?: boolean }) {
  const patternId = useId();
  return <svg className={`chart ${className}`} viewBox="0 0 700 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <defs><pattern id={patternId} width="70" height="80" patternUnits="userSpaceOnUse"><path d="M70 0H0V80" stroke="currentColor" strokeWidth=".5" opacity=".3"/></pattern></defs>
    <rect width="700" height="800" fill={`url(#${patternId})`}/>
    <g stroke="currentColor" strokeWidth="1">
      <path className="chart-land" d="M0 0H700V155L650 147 630 171 600 164 570 192 533 179 505 209 477 196 463 222 438 212 421 241 395 230 384 210 365 212 353 245 332 249 310 240 287 266 260 262 250 303 228 300 222 341 194 347 182 379 151 390 163 417 140 450 130 491 98 521 90 552 59 557 47 583 0 596Z"/>
      <path className="chart-land" d="M700 309L677 324 670 352 649 364 634 407 609 422 601 454 578 472 572 514 544 532 536 559 505 570 488 603 470 609 448 652 454 679 433 701 420 743 385 769 372 800H700Z"/>
      <path className="chart-land" d="M279 800L284 741 302 698 317 658 321 601 338 561 351 542 356 560 354 603 346 641 346 688 324 728 327 778 318 800Z"/>
      <path className="chart-land" d="M335 305L358 294 382 309 378 326 349 336 327 321Z M402 365L426 355 442 367 427 394 409 389Z M253 441L266 424 279 437 279 466 263 486 250 469Z M455 460L477 446 484 468 468 491 452 482Z M295 367L307 361 321 371 318 390 303 399 293 387Z"/>
      <g opacity=".3"><path d="M-60 638C110 638 147 568 183 470S261 305 320 288 386 278 434 278 580 212 760 213"/><path d="M-60 662C123 656 176 582 202 487S265 324 328 312 369 350 424 327 572 237 760 241"/><path d="M-60 689C123 696 202 604 225 515S286 352 335 359 365 392 431 364 591 254 760 268"/><path d="M-60 721C168 711 211 637 246 544S278 410 330 420 383 429 441 403 597 287 760 299"/><path d="M99 820C185 774 234 751 257 700S276 548 314 506 398 510 451 464 550 357 676 326"/><path d="M136 820C208 784 254 746 277 703S285 575 320 536 408 542 477 488 567 377 701 351"/><path d="M367 820C401 738 423 713 425 664S468 579 517 555 586 459 700 418"/><path d="M350 820C377 740 406 705 402 661S451 556 508 528 567 429 700 393"/></g>
      <g opacity=".2" strokeDasharray="3 5"><path d="M0 80L700 720M0 720L700 80"/><circle cx="365" cy="405" r="170"/><circle cx="365" cy="405" r="250"/></g>
    </g>
    {labels && <g fill="currentColor" stroke="none" fontFamily="Manrope, sans-serif" fontSize="15" letterSpacing="2"><text x="390" y="170">OSLO</text><text x="116" y="278" fontSize="11">BYGDØY</text><text x="330" y="288" fontSize="10">HOVEDØYA</text><text x="294" y="735" fontSize="11" transform="rotate(-77 294 735)">NESODDEN</text><text x="475" y="660" fontSize="11" transform="rotate(-51 475 660)">OSLOFJORDEN</text><text x="65" y="650" fontSize="9">59° 53′ N</text></g>}
  </svg>;
}
