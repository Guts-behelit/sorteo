import { jsPDF } from "jspdf";
import styles from './styles/generatePdf.module.css'

export default function GeneratePdf({ codigos }) {
  const listCodigos = [... codigos].map((c)=> c.number);
  const generarPDF = () => {
    const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const boxWidth = 50;   // ancho rectángulo
  const boxHeight = 30;  // alto rectángulo
  const gapX = 10;       // espacio horizontal entre rectángulos
  const gapY = 10;       // espacio vertical entre rectángulos

  // Calcular cuántos rectángulos caben por página
  const cols = Math.floor((pageWidth + gapX) / (boxWidth + gapX));
  const rows = Math.floor((pageHeight + gapY) / (boxHeight + gapY));

  const perPage = cols * rows;

  listCodigos.forEach((codigo, index) => {
    //const pageIndex = Math.floor(index / perPage);
    const posInPage = index % perPage;

    const col = posInPage % cols;
    const row = Math.floor(posInPage / cols);

    // calcular espacio sobrante para centrar
    const totalWidth = cols * boxWidth + (cols - 1) * gapX;
    const totalHeight = rows * boxHeight + (rows - 1) * gapY;

    const startX = (pageWidth - totalWidth) / 2;
    const startY = (pageHeight - totalHeight) / 2;

    const x = startX + col * (boxWidth + gapX);
    const y = startY + row * (boxHeight + gapY);

    if (posInPage === 0 && index !== 0) {
      doc.addPage();
    }

    // dibujar rectángulo
    doc.rect(x, y, boxWidth, boxHeight);

    // centrar texto dentro del rectángulo
    doc.setFont("helvetica","bold");
    
    doc.text(codigo, x + boxWidth / 2, y + boxHeight / 2, {
      align: "center",
      baseline: "middle",
    });
  });

  doc.save("codigos.pdf");
  };

  return (
    <div className={styles.generatePdfContainer}>
      <h1>GENERAR PDF</h1>
      <button onClick={generarPDF}>Descargar PDF</button>
    </div>
  )
}
