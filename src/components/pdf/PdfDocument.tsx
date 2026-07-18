import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Props {
  fileUrl: string;
  projectTitle: string;
}

/**
 * Modulo separato apposta: importa react-pdf/pdfjs-dist (~550 KB + worker
 * ~1 MB). Caricato solo dinamicamente da PdfViewer.tsx al click, così il
 * bundle pesante non viene mai scaricato per chi non apre la presentazione
 * (Technical Context in plan.md: "viewer PDF caricato solo on-demand").
 */
export default function PdfDocument({ fileUrl, projectTitle }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState<string | null>(null);

  return (
    <>
      {loadError && <p role="alert">Impossibile caricare la presentazione: {loadError}</p>}
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages: n }) => {
          setNumPages(n);
          setPageNumber(1);
        }}
        onLoadError={(error) => setLoadError(error.message)}
        loading={
          <p className="pdf-viewer__loading" role="status">
            Caricamento presentazione «{projectTitle}» in corso…
          </p>
        }
      >
        <Page pageNumber={pageNumber} width={520} />
      </Document>

      {numPages && numPages > 1 && (
        <div className="pdf-viewer__pagination">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          >
            ← Precedente
          </button>
          <span>
            Pagina {pageNumber} di {numPages}
          </span>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          >
            Successiva →
          </button>
        </div>
      )}
    </>
  );
}
