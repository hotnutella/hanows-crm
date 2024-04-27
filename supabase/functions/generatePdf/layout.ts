import { Invoice } from '@/store/api/invoicesApi';
import { InvoiceLine } from '@/store/api/invoiceLinesApi';
import { Client } from '@/store/api/clientsApi';
import { PDFDocument, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib@1.16.0';

const alignRight = (x: number, text: string, fieldWidth: number, font: typeof StandardFonts, size = 12) => {
    const width = font.widthOfTextAtSize(text, size);
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
    const largeFieldWidth = 180;

    const companyName = 'Hanows OÜ'; // TODO: replace with actual company name
    const helvetica = pdfDoc.embedStandardFont(StandardFonts.Helvetica);
    const helveticaBold = pdfDoc.embedStandardFont(StandardFonts.HelveticaBold);

    let txt = companyName;
    page.drawText(txt, {
        x: left,
        y: top,
        size: 24,
        font: helveticaBold,
        bold: true,
    });

    txt = `Invoice ${invoice.invoice_number}`;
    page.drawText(`Invoice ${invoice.invoice_number}`, {
        x: left,
        y: top - 30,
        size: 12,
    });

    txt = `Invoice date: ${invoice.issue_date}`;
    page.drawText(txt, {
        x: left,
        y: top - 50,
        size: 12,
    });

    txt = `Due date: ${invoice.due_date}`;
    page.drawText(txt, {
        x: left,
        y: top - 70,
        size: 12,
    });

    txt = `Total: ${invoice.total_amount}`;
    page.drawText(txt, {
        x: left,
        y: top - 90,
        size: 12,
    });

    txt = `Status: ${invoice.status}`;
    page.drawText(txt, {
        x: left,
        y: top - 120,
        size: 12,
    });

    txt = `Client: ${client.name || ''}`;
    page.drawText(txt, {
        x: left,
        y: top - 140,
        size: 12,
    });

    txt = `Email: ${client.email || ''}`;
    page.drawText(txt, {
        x: left,
        y: top - 160,
        size: 12,
    });

    txt = `Phone: ${client.phone || ''}`;
    page.drawText(txt, {
        x: left,
        y: top - 180,
        size: 12,
    });

    // Line titles
    txt = 'Description';
    page.drawText(txt, {
        x: left,
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = 'Price';
    let x = right - 4 * defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });
    
    txt = 'Quantity';
    x += defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = 'VAT';
    x += defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y: top - 220,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = 'Total';
    x += defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
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

        txt = line.description;
        page.drawText(txt, {
            x: left,
            y,
            size: 12,
        });

        txt = line.unit_price.toFixed(2);
        x = right - 4 * defaultFieldWidth;
        page.drawText(txt, {
            x: alignRight(x, txt, defaultFieldWidth, helvetica),
            y,
            size: 12,
        });

        txt = `${line.quantity}`;
        x += defaultFieldWidth;
        page.drawText(txt, {
            x: alignRight(x, txt, defaultFieldWidth, helvetica),
            y,
            size: 12,
            textAlign: 'right',
        });

        txt = `${line.vat}%`;
        x += defaultFieldWidth;
        page.drawText(txt, {
            x: alignRight(x, txt, defaultFieldWidth, helvetica),
            y,
            size: 12,
        });

        txt = (line.quantity * line.unit_price).toFixed(2);
        x += defaultFieldWidth;
        page.drawText(txt, {
            x: alignRight(x, txt, defaultFieldWidth, helvetica),
            y,
            size: 12,
        });
    }

    page.drawLine({
        start: { x: left, y: top - 225 - invoiceLines.length * 20 },
        end: { x: right, y: top - 225 - invoiceLines.length * 20 },
        thickness: lineThickness,
    });

    txt = 'Subtotal without VAT';
    x = right - defaultFieldWidth - largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, largeFieldWidth, helvetica),
        y: top - 225 - (invoiceLines.length + 1) * 20,
        size: 12,
        font: helvetica,
        bold: true,
    });

    const totalWithoutVat = invoiceLines.reduce((acc, line) => acc + line.quantity * line.unit_price, 0);
    txt = totalWithoutVat.toFixed(2);
    x += largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helvetica),
        y: top - 225 - (invoiceLines.length + 1) * 20,
        size: 12,
        font: helvetica,
        bold: true,
    });

    const distinctVats = Array.from(new Set(invoiceLines.map((line) => line.vat)));
    for (const [i, vat] of Object.entries(distinctVats)) {
        txt = `Value added tax ${vat}%`;
        x = right - defaultFieldWidth - largeFieldWidth;
        page.drawText(txt, {
            x: alignRight(x, txt, largeFieldWidth, helvetica),
            y: top - 225 - (invoiceLines.length + 2 + Number(i)) * 20,
            size: 12,
            font: helvetica,
            bold: true,
        });

        const vatTotal = invoiceLines.reduce((acc, line) => {
            if (line.vat === vat) {
                return acc + line.quantity * line.unit_price * line.vat / 100;
            }
            return acc;
        }, 0);
        txt = vatTotal.toFixed(2);
        x += largeFieldWidth;
        page.drawText(txt, {
            x: alignRight(x, txt, defaultFieldWidth, helvetica),
            y: top - 225 - (invoiceLines.length + 2 + Number(i)) * 20,
            size: 12,
            font: helvetica,
            bold: true,
        });
    }

    txt = 'Total to pay (EUR)';
    x = right - defaultFieldWidth - largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, largeFieldWidth, helveticaBold, 14),
        y: top - 225 - (invoiceLines.length + 2 + distinctVats.length) * 20,
        size: 14,
        font: helveticaBold,
        bold: true,
    });

    const totalAmount = invoice.total_amount;
    txt = totalAmount.toFixed(2);
    x += largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold, 14),
        y: top - 225 - (invoiceLines.length + 2 + distinctVats.length) * 20,
        size: 14,
        font: helveticaBold,
        bold: true,
    });


    // Footer
    page.drawLine({
        start: { x: left, y: bottom },
        end: { x: right, y: bottom },
        thickness: lineThickness,
    });

    return pdfDoc;
}