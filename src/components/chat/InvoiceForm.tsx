import { Box, Fab, Stack, Typography } from '@mui/material'
import React, { memo, useEffect } from 'react'
import InvoiceLineForm from './InvoiceLineForm'
import AddIcon from '@mui/icons-material/Add'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { addLine, resetMessage, getLines } from '@/store/slices/messageSlice'
import { useCreateInvoiceMutation } from '@/store/api/invoicesApi'
import { InvoiceLine, useCreateInvoiceLineMutation } from '@/store/api/invoiceLinesApi'
import { getInvoiceNumber } from '@/store/slices/accountSlice'
import { useGeneratePdfMutation } from '@/store/api/edgeApi'
import { useBumpMutation, useGetClientQuery } from '@/store/api/clientsApi'

interface InvoiceFormProps {
    clientId: number
    onHeightChange: (height: number) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = memo(function InvoiceForm({ clientId, onHeightChange }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const lines = useSelector((state: RootState) => getLines(state, clientId));
    const invoiceNumber = useSelector(getInvoiceNumber);
    const dispatch = useDispatch<AppDispatch>();

    const { data: client } = useGetClientQuery(String(clientId));

    const [createInvoice, { isLoading: creatingInvoice }] = useCreateInvoiceMutation();
    const [createInvoiceLine, { isLoading: creatingInvoiceLine }] = useCreateInvoiceLineMutation();
    const [generatePdf, { isLoading: generatingPdf }] = useGeneratePdfMutation();
    const [bumpClient, { isLoading: isBumpingClient }] = useBumpMutation();

    const handleNewLine = () => {
        dispatch(addLine({ clientId, data: { lineText: '', quantity: 0, unitPrice: 0, vat: 0 } }));
    }

    const handlePreview = async () => {
        if (!client) {
            return;
        }

        const savedInvoice = await createInvoice({
            client_id: clientId,
            invoice_number: invoiceNumber,
            issue_date: new Date().toISOString(),
            due_date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
            status: 'draft',
            total_amount: Object.values(lines).reduce((acc, line) => {
                return acc + (line.quantity * line.unitPrice + line.quantity * line.unitPrice * line.vat / 100);
            }, 0)
        });

        if (!('data' in savedInvoice)) {
            return;
        }

        const invoiceId = savedInvoice.data.id;
        const invoiceLines: InvoiceLine[] = [];

        await Promise.all(Object.values(lines).map(async (line) => {
            const savedLine = await createInvoiceLine({
                invoice_id: invoiceId,
                description: line.lineText,
                quantity: line.quantity,
                unit_price: line.unitPrice,
                vat: line.vat
            });

            if ('data' in savedLine) {
                invoiceLines.push(savedLine.data);
            }
        }));
        
        generatePdf({ invoice: savedInvoice.data, invoiceLines, client });
        dispatch(resetMessage(clientId));
        handleNewLine();
        bumpClient(client);
    }

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            if (!ref.current) {
                return;
            }

            const height = ref.current!.getBoundingClientRect().height;
            onHeightChange(height);
        });
        resizeObserver.observe(ref.current);

        return () => resizeObserver.disconnect();
    }, [lines, onHeightChange]);

    useEffect(() => {
        if (Object.keys(lines).length === 0) {
            handleNewLine();
        }

        // Only need to run this effect once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            position="sticky"
            top="calc(100vh - 40px)"
            left={0}
            right={0}
            boxShadow={2}
            p={2}
            ref={ref}
        >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={2}>
                        {Object.keys(lines).map(lineId => (
                            <InvoiceLineForm
                                key={lineId}
                                clientId={clientId}
                                lineId={+lineId} />
                        ))}
                    </Stack>
                    <Fab
                        size="small"
                        color="primary"
                        sx={{ marginBottom: 0 }}
                        onClick={handleNewLine}
                    >
                        <AddIcon />
                    </Fab>
                </Stack>
                <Box>
                    <Fab
                        color="primary"
                        variant="extended"
                        onClick={handlePreview}
                        disabled={creatingInvoice || creatingInvoiceLine || generatingPdf || isBumpingClient}
                    >
                        <Typography variant="button">Preview</Typography>
                        <KeyboardDoubleArrowUpIcon />
                    </Fab>
                </Box>
            </Stack>
        </Box>
    )
})

export default InvoiceForm