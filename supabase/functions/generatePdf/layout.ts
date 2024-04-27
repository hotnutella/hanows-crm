import { Invoice } from '@/store/api/invoicesApi';
import { InvoiceLine } from '@/store/api/invoiceLinesApi';
import { Client } from '@/store/api/clientsApi';
import { PDFDocument, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib@1.16.0';

const alignRight = (x: number, text: string, fieldWidth: number, font: typeof StandardFonts, size = 12) => {
    const width = font.widthOfTextAtSize(text, size);
    return x + fieldWidth - width;
}

const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
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
    const mediumFieldWidth = 100;
    const largeFieldWidth = 180;

    const companyName = 'Hanows OÜ'; // TODO: replace with actual company name
    const helvetica = pdfDoc.embedStandardFont(StandardFonts.Helvetica);
    const helveticaBold = pdfDoc.embedStandardFont(StandardFonts.HelveticaBold);

    
    let x = left;
    let y = top;
    let txt = companyName;
    page.drawText(txt, {
        x,
        y,
        size: 24,
        font: helveticaBold,
        bold: true,
    });

    // Client block
    y -= 30;
    txt = 'Client:'
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 15;
    txt = client.name;
    txt = client.name || '';
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
        font: helveticaBold,
        bold: true,
    });

    y -= 15;
    txt = client?.address?.line1 || '[Address line 1 placeholder]';
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 15;
    txt = client?.address?.line2 || '[Address line 2 placeholder]';
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 15;
    txt = client?.address?.country || '[Country placeholder]';
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 15;
    txt = `Reg number: ${client.reg_number || '[Reg number placeholder]'}`;
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 15;
    txt = `VAT number: ${client.vat_number || '[VAT number placeholder]'}`;
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    // Invoice block
    y = top - 30;
    x = right - 2 * mediumFieldWidth;
    txt = 'Invoice nr:';
    page.drawText(txt, {
        x,
        y,
        size: 14,
        font: helveticaBold,
        bold: true,
    });

    txt = invoice.invoice_number;
    x += mediumFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, mediumFieldWidth, helveticaBold, 14),
        y,
        size: 14,
        font: helveticaBold,
        bold: true,
    });

    y -= 20;
    x = right - 2 * mediumFieldWidth;
    txt = 'Date:';
    page.drawText(txt, {
        x,
        y,
        size: 12,
    });

    txt = formatDate(invoice.issue_date);
    x += mediumFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, mediumFieldWidth, helvetica),
        y,
        size: 12,
    });

    y -= 20;
    x = right - 2 * mediumFieldWidth;
    txt = 'Terms:';
    page.drawText(txt, {
        x,
        y,
        size: 12,
    });

    // calculate days between issue and due date
    const days = Math.floor((new Date(invoice.due_date).getTime() - new Date(invoice.issue_date).getTime()) / (1000 * 60 * 60 * 24));
    txt = `${days} days`;
    x += mediumFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, mediumFieldWidth, helvetica),
        y,
        size: 12,
    });

    y -= 20;
    x = right - 2 * mediumFieldWidth;
    txt = 'Due date:';
    page.drawText(txt, {
        x,
        y: y,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = formatDate(invoice.due_date);
    x += mediumFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, mediumFieldWidth, helveticaBold),
        y: y,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    y -= 20;
    x = right - 2 * mediumFieldWidth;
    txt = 'Penalty:';
    page.drawText(txt, {
        x,
        y,
        size: 12,
    });

    txt = '0.05% per day';
    x += mediumFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, mediumFieldWidth, helvetica),
        y,
        size: 12,
    });

    y = top - 220;
    // Line titles
    txt = 'Description';
    page.drawText(txt, {
        x: left,
        y,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = 'Price';
    x = right - 4 * defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y,
        size: 12,
        font: helveticaBold,
        bold: true,
    });
    
    txt = 'Quantity';
    x += defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = 'VAT';
    x += defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y,
        size: 12,
        font: helveticaBold,
        bold: true,
    });

    txt = 'Total';
    x += defaultFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold),
        y,
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
        y = top - 240 - Number(i) * 20;

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
        y: top - 225 - (invoiceLines.length + 2) * 20,
        size: 12,
        font: helvetica,
        bold: true,
    });

    const totalWithoutVat = invoiceLines.reduce((acc, line) => acc + line.quantity * line.unit_price, 0);
    txt = totalWithoutVat.toFixed(2);
    x += largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helvetica),
        y: top - 225 - (invoiceLines.length + 2) * 20,
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
            y: top - 225 - (invoiceLines.length + 3 + Number(i)) * 20,
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
            y: top - 225 - (invoiceLines.length + 3 + Number(i)) * 20,
            size: 12,
            font: helvetica,
            bold: true,
        });
    }

    txt = 'Total to pay (EUR)';
    x = right - defaultFieldWidth - largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, largeFieldWidth, helveticaBold, 14),
        y: top - 225 - (invoiceLines.length + 3 + distinctVats.length) * 20,
        size: 14,
        font: helveticaBold,
        bold: true,
    });

    const totalAmount = invoice.total_amount;
    txt = totalAmount.toFixed(2);
    x += largeFieldWidth;
    page.drawText(txt, {
        x: alignRight(x, txt, defaultFieldWidth, helveticaBold, 14),
        y: top - 225 - (invoiceLines.length + 3 + distinctVats.length) * 20,
        size: 14,
        font: helveticaBold,
        bold: true,
    });

    txt = 'PLEASE PROVIDE INVOICE NUMBER IN PAYMENT DETAILS';
    page.drawText(txt, {
        x: left,
        y: top - 225 - (invoiceLines.length + 3 + distinctVats.length + 3) * 20,
        size: 10,
    });


    // Footer
    page.drawLine({
        start: { x: left, y: bottom },
        end: { x: right, y: bottom },
        thickness: lineThickness,
    });

    // Company block
    y = bottom - 12;
    txt = companyName;
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 12;
    txt = 'Kivimurru 7-12, 11411, Tallinn'; // TODO: replace with actual company address
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 12;
    txt = 'Reg number: 12871527'; // TODO: replace with actual company reg number
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    y -= 12;
    txt = 'VAT number: EE102714100'; // TODO: replace with actual company VAT number
    page.drawText(txt, {
        x: left,
        y,
        size: 10,
    });

    // Contact block
    y = bottom - 12;
    x = right - largeFieldWidth;
    txt = 'E-mail: deniss.suhhanov@gmail.com'; // TODO: replace with actual company email
    page.drawText(txt, {
        x: alignRight(x, txt, largeFieldWidth, helvetica, 10),
        y,
        size: 10,
    });

    y -= 12;
    txt = 'Phone: +372 xxxxxxxx'; // TODO: replace with actual company phone number
    page.drawText(txt, {
        x: alignRight(x, txt, largeFieldWidth, helvetica, 10),
        y,
        size: 10,
    });

    return pdfDoc;
}