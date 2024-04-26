import React, { useEffect, useState } from 'react'
import { Document, Page, StyleSheet, View, Text, Font } from '@react-pdf/renderer'
import { Invoice } from '@/store/api/invoicesApi';
import { InvoiceLine } from '@/store/api/invoiceLinesApi';
import { Client } from '@/store/api/clientsApi';

interface InvoiceDocumentProps {
    invoice: Invoice
    invoiceLines: InvoiceLine[]
    client: Client
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontWeight: 400,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    clientInfo: {
        marginBottom: 20,
    },
    invoiceNumberSection: {
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'Helvetica-Bold',
        fontStyle: 'bold',
        fontWeight: 600,
        //fontSize: 24,
        marginBottom: 30,
    },
    bold: {
        fontWeight: 600,
    },
    sectionHeader: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    invoiceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    lineItemsTable: {
        width: '100%',
        borderTop: '1 solid black',
        borderBottom: '1 solid black',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 2,
    },
    footer: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 30,
        right: 30,
        borderTop: '1 solid black',
        paddingTop: 10,
    }
});

const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ invoice, invoiceLines, client }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Hanows OÜ</Text>
                <View style={styles.headerSection}>
                    <View style={styles.clientInfo}>
                        <Text>Client: </Text>
                        <Text style={styles.bold}>{client?.name}</Text>
                        <Text></Text>
                        {/* ... other client details */}
                    </View>
                    <View style={styles.invoiceNumberSection}>
                        <Text>Invoice No.: {invoice.invoice_number}</Text>
                        <Text>Date: {invoice.issue_date}</Text>
                        {/* ... other invoice details */}
                    </View>
                </View>

                {/* ... line items table ... */}
                <View style={styles.lineItemsTable}>
                    <View style={styles.tableRow}>
                        <Text>Description</Text>
                        <Text>Price</Text>
                        {/* ... other headers */}
                    </View>
                    {invoiceLines.map((line, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text>{line.description}</Text>
                            <Text>{line.unit_price}</Text>
                            {/* ... other line item details */}
                        </View>
                    ))}
                </View>

                {/* ... totals section ... */}

                {/* Footer with additional info */}
                <View style={styles.footer}>
                    <Text>Bank Details: </Text>
                    <Text>Email: </Text>
                    {/* ... other footer details */}
                </View>
            </Page>
        </Document>
    )
}

export default InvoiceDocument
