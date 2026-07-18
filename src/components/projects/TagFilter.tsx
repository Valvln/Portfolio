import { useState } from 'react';

type TagValue = 'all' | 'sql' | 'ml' | 'viz';

const TAGS: { value: TagValue; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'sql', label: 'SQL' },
  { value: 'ml', label: 'ML' },
  { value: 'viz', label: 'Viz' },
];

/**
 * Filtro client-side: legge l'attributo data-tags già renderizzato da
 * ProjectCard.astro (dati provenienti dalla content collection) e ne
 * controlla la visibilità. Nessun dato di progetto duplicato in React.
 */
export default function TagFilter() {
  const [active, setActive] = useState<TagValue>('all');

  const handleSelect = (tag: TagValue) => {
    setActive(tag);
    const cards = document.querySelectorAll<HTMLElement>('.project-card');
    cards.forEach((card) => {
      const tags = (card.dataset.tags ?? '').split(',');
      const visible = tag === 'all' || tags.includes(tag);
      card.style.display = visible ? '' : 'none';
    });
  };

  return (
    <div className="tag-filter" role="group" aria-label="Filtra progetti per tag">
      {TAGS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`tag-filter__button${active === value ? ' tag-filter__button--active' : ''}`}
          aria-pressed={active === value}
          onClick={() => handleSelect(value)}
        >
          {label}
        </button>
      ))}
      <style>{`
        .tag-filter {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-block: 1rem;
        }
        .tag-filter__button {
          font: inherit;
          font-weight: 600;
          padding: 0.375rem 0.875rem;
          border-radius: 999px;
          border: 1px solid var(--color-border, #e1e3e8);
          background: var(--color-bg, #fff);
          color: var(--color-text, #16181d);
          cursor: pointer;
        }
        .tag-filter__button--active {
          background: var(--color-primary, #2f5fff);
          border-color: var(--color-primary, #2f5fff);
          color: var(--color-primary-contrast, #fff);
        }
      `}</style>
    </div>
  );
}
