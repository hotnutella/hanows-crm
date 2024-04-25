import { InvoiceLine } from '@/store/api/invoiceLinesApi'
import { Invoice } from '@/store/api/invoicesApi'
import React from 'react'
import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer'

interface InvoiceDocumentProps {
    invoice: Invoice
    invoiceLines: InvoiceLine[]
}

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ invoice, invoiceLines }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Invoice {invoice.invoice_number}</Text>
                </View>
            </Page>
        </Document>
    )
}

export default InvoiceDocument