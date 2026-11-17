import { brand } from '@/lib/siteContent';

export function BrandLink() {
  return (
    <a href="#top" className="la-brand-link">
      <span className="la-brand-text">
        <span className="la-brand-name">{brand.name}</span>
        <span className="la-brand-role">{brand.role}</span>
      </span>
    </a>
  );
}
