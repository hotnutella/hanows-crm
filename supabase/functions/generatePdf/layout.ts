import { Invoice } from '@/store/api/invoicesApi';
import { InvoiceLine } from '@/store/api/invoiceLinesApi';
import { Client } from '@/store/api/clientsApi';
import { PDFDocument, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib@1.16.0';

const alignRight = (x: number, text: string, fieldWidth: number, font: typeof StandardFonts) => {
    const width = font.widthOfTextAtSize(text, 12);
    return x + fieldWidth - width;
}

export const renderLayout = async (invoice: Invoice, invoiceLines: InvoiceLine[], client: Client) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const top = height - 50;
    const bottom = 80;
    const left = 50;
    const right = width - 50;
    const lineThickness = 0.75;
    const defaultFieldWidth = 60;

    const companyName = 'Hanows OÜ'; // TODO: replace with actual company name
    const helvetica = pdfDoc.embedStandardFont(StandardFonts.Helvetica);
    const helveticaBold = pdfDoc.embedStandardFont(StandardFonts.HelveticaBold);

    page.drawText(companyName, {
        x: left,
        y: top,
        size: 24,
        font: helveticaBold,
        bold: true,
    });

    page.drawText(`Invoice ${invoice.invoice_number}`, {
        x: left,
        y: top - 30,
        size: 12,
    });

    page.drawText(`Invoice date: ${invoice.issue_date}`, {
        x: left,
        y: top - 50,
        size: 12,
    });

    page.drawText(`Due date: ${invoice.due_date}`, {
        x: left,
        y: top - 70,
        size: 12,
    });

    page.drawText(`Total: ${invoice.total_amount}`, {
        x: left,
        y: top - 90,
        size: 12,
    });

    page.drawText(`Client: ${client.name}`, {
        x: left,
        y: top - 120,
        size: 12,
    });

    page.drawText(`Address: ${client.address || ''}`, {
        x: left,
        y: top - 140,
        size: 12,
    });

    page.drawText(`Email: ${client.email || ''}`, {
        x: left,
        y: top - 160,
        size: 12,
    });

    page.drawText(`Phone: ${client.phone || ''}`, {
        x: left,
        y: top - 180,
        size: 12,
    });

    // Line titles
    page.drawText('Description', {
        x: left,
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    let x = right - 4 * defaultFieldWidth;
    page.drawText('Price', {
        x: alignRight(x, 'Price', defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });
    
    x += defaultFieldWidth;
    page.drawText('Quantity', {
        x: alignRight(x, 'Quantity', defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    x += defaultFieldWidth;
    page.drawText('VAT', {
        x: alignRight(x, 'VAT', defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    x += defaultFieldWidth;
    page.drawText('Total', {
        x: alignRight(x, 'Total', defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    page.drawLine({
        start: { x: left, y: top - 225 },
        end: { x: right, y: top - 225 },
        thickness: lineThickness,
    });

    for (const [i, line] of Object.entries(invoiceLines)) {
        const y = top - 240 - Number(i) * 20;

        page.drawText(`${line.description}`, {
            x: left,
            y,
            size: 12,
        });

        x = right - 4 * defaultFieldWidth;
        page.drawText(`${line.unit_price}`, {
            x: alignRight(x, `${line.unit_price}`, defaultFieldWidth, helvetica),
            y,
            size: 12,
        });

        x += defaultFieldWidth;
        page.drawText(`${line.quantity}`, {
            x: alignRight(x, `${line.quantity}`, defaultFieldWidth, helvetica),
            y,
            size: 12,
            textAlign: 'right',
        });

        x += defaultFieldWidth;
        page.drawText(`${line.vat}%`, {
            x: alignRight(x, `${line.vat}%`, defaultFieldWidth, helvetica),
            y,
            size: 12,
        });

        const total = (line.quantity * line.unit_price + line.quantity * line.unit_price * line.vat / 100).toFixed(2);
        x += defaultFieldWidth;
        page.drawText(total, {
            x: alignRight(x, total, defaultFieldWidth, helvetica),
            y,
            size: 12,
        });
    }

    page.drawLine({
        start: { x: left, y: top - 225 - invoiceLines.length * 20 },
        end: { x: right, y: top - 225 - invoiceLines.length * 20 },
        thickness: lineThickness,
    });


    // Footer
    page.drawLine({
        start: { x: left, y: bottom },
        end: { x: right, y: bottom },
        thickness: lineThickness,
    });

    return pdfDoc;
}