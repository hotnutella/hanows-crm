import { Box, Fab, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { memo, useEffect } from 'react'
import InvoiceLineForm from './InvoiceLineForm'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { addLine, resetMessage, getLines, addToGeneratingInvoicesList, removeFromGeneratingInvoicesList } from '@/store/slices/messageSlice'
import { useCreateInvoiceMutation } from '@/store/api/invoicesApi'
import { InvoiceLine, useCreateInvoiceLineMutation } from '@/store/api/invoiceLinesApi'
import { getAccountData, getInvoiceNumber, getUserId } from '@/store/slices/accountSlice'
import { useGeneratePdfMutation } from '@/store/api/edgeApi'
import { useBumpMutation, useGetClientQuery } from '@/store/api/clientsApi'
import { Add } from '@mui/icons-material'
import { getAccessToken } from '@/store/slices/accountSlice'

interface InvoiceFormProps {
    clientId: number
    onHeightChange: (height: number) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = memo(function InvoiceForm({ clientId, onHeightChange }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const lines = useSelector((state: RootState) => getLines(state, clientId));
    const invoiceNumber = useSelector(getInvoiceNumber);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const accessToken = useSelector(getAccessToken) || '';
    const accountData = useSelector(getAccountData)!;

    const { data: client } = useGetClientQuery({ data: String(clientId), accessToken });

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

        const filteredLines = Object.values(lines).filter(line => line.lineText.trim() !== '');
        if (filteredLines.length === 0) {
            return;
        }

        const data = {
            client_id: clientId,
            invoice_number: invoiceNumber,
            issue_date: new Date().toISOString(),
            due_date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
            status: 'draft',
            total_amount: Object.values(filteredLines).reduce((acc, line) => {
                return acc + (line.quantity * line.unitPrice + line.quantity * line.unitPrice * line.vat / 100);
            }, 0)
        }

        const savedInvoice = await createInvoice({ data, accessToken });

        if (!('data' in savedInvoice)) {
            return;
        }

        const invoiceId = savedInvoice.data.id;
        const invoiceLines: InvoiceLine[] = [];

        await Promise.all(Object.values(filteredLines).map(async (line) => {
            const data = {
                invoice_id: invoiceId,
                description: line.lineText,
                quantity: line.quantity,
                unit_price: line.unitPrice,
                vat: line.vat
            }
            const savedLine = await createInvoiceLine({ data, accessToken });

            if ('data' in savedLine) {
                invoiceLines.push(savedLine.data);
            }
        }));

        dispatch(addToGeneratingInvoicesList(invoiceId));
        await generatePdf({
            data: { accountData, invoice: savedInvoice.data, invoiceLines, client },
            accessToken
        });
        dispatch(removeFromGeneratingInvoicesList(invoiceId));

        dispatch(resetMessage(clientId));
        handleNewLine();
        bumpClient({ data: client, accessToken });
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

    const previewButton = (
        <Box>
            <Tooltip title="Create invoice draft" placement="top">
                <Fab
                    color="primary"
                    variant="extended"
                    size={isXs ? 'small' : 'large'}
                    onClick={handlePreview}
                    disabled={creatingInvoice || creatingInvoiceLine || generatingPdf || isBumpingClient}
                >
                    <PostAddIcon sx={{ mr: 1 }} />
                    <Typography variant="button">Create Draft</Typography>
                </Fab>
            </Tooltip>
        </Box>
    );

    const newLineButton = (
        <Tooltip title="Add line" placement="top">
            <Fab
                color="primary"
                variant="extended"
                size={isXs ? 'small' : 'large'}
                onClick={handleNewLine}
            >
                <Add sx={{ mr: 1 }} />
                <Typography variant="button">Add Line</Typography>
            </Fab>
        </Tooltip>
    );

    return (
        <Box
            position="sticky"
            top="calc(100vh - 40px)"
            left={0}
            right={0}
            boxShadow={2}
            zIndex={99}
            p={2}
            ref={ref}
        >
            {isXs && (
                <Stack mt="-40px" direction="row" justifyContent="center" gap={1}>
                    {newLineButton}
                    {previewButton}
                </Stack>
            )}
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" spacing={isXs ? 2 : 1}>
                    {Object.keys(lines).map(lineId => (
                        <InvoiceLineForm
                            key={lineId}
                            clientId={clientId}
                            lineId={+lineId} />
                    ))}
                </Stack>
                {!isXs && (
                    <Stack direction="row" gap={2}>
                        {newLineButton}
                        {previewButton}
                    </Stack>
                )}
            </Stack>
        </Box>
    )
})

export default InvoiceForm