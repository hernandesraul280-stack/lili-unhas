import { brand } from '@/lib/siteContent';

export function Sparkle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 0c2.2 10.1 5.9 13.8 16 16-10.1 2.2-13.8 5.9-16 16C13.8 21.9 10.1 18.2 0 16 10.1 13.8 13.8 10.1 16 0Z" />
    </svg>
  );
}

export function BrandLink() {
  return (
    <a href="#top" className="la-brand-link">
      <span className="la-brand-emblem" aria-hidden="true">
        <img src={brand.logo} alt="" width={500} height={500} />
      </span>
      <span className="la-brand-text">
        <span className="la-brand-name">{brand.name}</span>
        <span className="la-brand-role">{brand.role}</span>
      </span>
    </a>
  );
}
