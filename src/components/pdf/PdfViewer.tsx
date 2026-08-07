import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import dinamico: il bundle react-pdf/pdfjs-dist (~550 KB + worker ~1 MB)
// viene scaricato solo quando isOpen diventa true, non al mount dell'isola.
const PdfDocument = lazy(() => import('./PdfDocument'));

interface Props {
  fileUrl: string;
  label: string;
  projectTitle: string;
}

/**
 * Isola React (client:visible): componente leggero, nessuna dipendenza da
 * react-pdf a livello di modulo — resta SSR-safe. FR-007: embed e download
 * sono sempre offerti insieme, non alternative.
 */
export default function PdfViewer({ fileUrl, label, projectTitle }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const fileName = fileUrl.split('/').pop() ?? 'presentation.pdf';

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer__actions">
        <button
          type="button"
          className="pdf-viewer__button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Close presentation' : label}
        </button>
        <a
          href={fileUrl}
          download={fileName}
          className="pdf-viewer__button pdf-viewer__button--secondary"
        >
          Download PDF
        </a>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pdf-viewer__panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Suspense
              fallback={
                <p className="pdf-viewer__loading" role="status">
                  Loading presentation “{projectTitle}”…
                </p>
              }
            >
              <PdfDocument fileUrl={fileUrl} projectTitle={projectTitle} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pdf-viewer { margin-top: 0.75rem; }
        .pdf-viewer__actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .pdf-viewer__button {
          font: inherit; font-weight: 600; cursor: pointer;
          padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid var(--color-primary, #1d4ed8);
          background: var(--color-primary, #1d4ed8); color: #fff; text-decoration: none;
        }
        .pdf-viewer__button--secondary {
          background: transparent; color: var(--color-primary, #1d4ed8);
        }
        .pdf-viewer__panel { overflow: hidden; margin-top: 0.75rem; }
        .pdf-viewer__loading { color: var(--color-text-muted, #454b5c); }
        .pdf-viewer__pagination {
          display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; font-size: 0.875rem;
        }
        @media (max-width: 480px) {
          .pdf-viewer__actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </div>
  );
}
