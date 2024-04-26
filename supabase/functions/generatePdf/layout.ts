import { Invoice } from '@/store/api/invoicesApi';
import { InvoiceLine } from '@/store/api/invoiceLinesApi';
import { Client } from '@/store/api/clientsApi';
import { PDFDocument, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib@1.16.0';

export const renderLayout = async (invoice: Invoice, invoiceLines: InvoiceLine[], client: Client) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const top = height - 50;
    const bottom = 80;
    const left = 50;
    const right = width - 50;

    const companyName = 'Hanows OÜ'; // TODO: replace with actual company name
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

    page.drawText('Price', {
        x: right - 240,
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });
    
    page.drawText('Quantity', {
        x: right - 170,
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    page.drawText('VAT', {
        x: right - 100,
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    page.drawText('Total', {
        x: right - 60,
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    page.drawLine({
        start: { x: left, y: top - 225 },
        end: { x: right, y: top - 225 },
        thickness: 1,
    });

    for (const [i, line] of Object.entries(invoiceLines)) {
        const y = top - 240 - Number(i) * 20;

        page.drawText(`${line.description}`, {
            x: left,
            y,
            size: 12,
        });

        page.drawText(`${line.unit_price}`, {
            x: right - 240,
            y,
            size: 12,
        });

        page.drawText(`${line.quantity}`, {
            x: right - 170,
            y,
            size: 12,
            textAlign: 'right',
        });

        page.drawText(`${line.vat}%`, {
            x: right - 100,
            y,
            size: 12,
        });

        const total = Math.round(line.quantity * line.unit_price + line.quantity * line.unit_price * line.vat / 100);
        page.drawText(`${total}`, {
            x: right - 60,
            y,
            size: 12,
        });
    }

    page.drawLine({
        start: { x: left, y: top - 225 - invoiceLines.length * 20 },
        end: { x: right, y: top - 225 - invoiceLines.length * 20 },
        thickness: 1,
    });


    // Footer
    page.drawLine({
        start: { x: left, y: bottom },
        end: { x: right, y: bottom },
        thickness: 1,
    });

    return pdfDoc;
}