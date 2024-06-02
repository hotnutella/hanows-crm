import { Box, Fab, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { memo, useEffect } from 'react'
import InvoiceLineForm from './InvoiceLineForm'
import PostAddIcon from '@mui/icons-material/PostAdd'
import SaveIcon from '@mui/icons-material/Save'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { addLine, resetMessage, getLines, addToGeneratingInvoicesList, removeFromGeneratingInvoicesList, getEditingInvoiceId } from '@/store/slices/messageSlice'
import { Invoice, useCreateInvoiceMutation, useLazyGetInvoiceQuery, useUpdateInvoiceMutation } from '@/store/api/invoicesApi'
import { InvoiceLine, useCreateInvoiceLineMutation, useUpdateInvoiceLineMutation } from '@/store/api/invoiceLinesApi'
import { getAccountData, getInvoiceNumber } from '@/store/slices/accountSlice'
import { useGeneratePdfMutation } from '@/store/api/edgeApi'
import { useBumpMutation, useGetClientQuery, useLazyGetClientQuery } from '@/store/api/clientsApi'
import { Add } from '@mui/icons-material'
import { getAccessToken } from '@/store/slices/accountSlice'
import { Bank, useLazyGetBanksQuery } from '@/store/api/banksApi'

interface InvoiceFormProps {
    clientId: number
    onHeightChange: (height: number) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = memo(function InvoiceForm({ clientId, onHeightChange }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const lines = useSelector((state: RootState) => getLines(state, clientId));
    const editingInvoiceId = useSelector((state: RootState) => getEditingInvoiceId(state, clientId));
    const invoiceNumber = useSelector(getInvoiceNumber);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const accessToken = useSelector(getAccessToken) || '';
    const accountData = useSelector(getAccountData)!;

    const { data: client } = useGetClientQuery({ data: String(clientId), accessToken });

    const [createInvoice, { isLoading: creatingInvoice }] = useCreateInvoiceMutation();
    const [updateInvoice, { isLoading: updatingInvoice }] = useUpdateInvoiceMutation();
    const [createInvoiceLine, { isLoading: creatingInvoiceLine }] = useCreateInvoiceLineMutation();
    const [updateInvoiceLine, { isLoading: updatingInvoiceLine }] = useUpdateInvoiceLineMutation();
    const [generatePdf, { isLoading: generatingPdf }] = useGeneratePdfMutation();
    const [bumpClient, { isLoading: isBumpingClient }] = useBumpMutation();
    const [getBanks] = useLazyGetBanksQuery();
    const [getExistingInvoice] = useLazyGetInvoiceQuery();

    const handleNewLine = () => {
        dispatch(addLine({ clientId, data: { lineText: '', quantity: 0, unitPrice: 0, vat: 0 } }));
    }

    const sumLines = (filteredLines: typeof lines) => {
        return Object.values(filteredLines).reduce((acc, line) => {
            return acc + (line.quantity * line.unitPrice + line.quantity * line.unitPrice * line.vat / 100);
        }, 0);
    }

    const saveInvoice = async (filteredLines: typeof lines) => {
        if (editingInvoiceId) {
            const existingInvoice = await getExistingInvoice({ data: editingInvoiceId, accessToken });
            const data = {
                ...existingInvoice.data,
                total_amount: sumLines(filteredLines)
            } as Invoice;
            return await updateInvoice({ data, accessToken });
        }

        const data = {
            client_id: clientId,
            invoice_number: invoiceNumber,
            issue_date: new Date().toISOString(),
            due_date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
            status: 'draft',
            total_amount: sumLines(filteredLines)
        }

        return await createInvoice({ data, accessToken });
    }

    const handleSave = async () => {
        if (!client) {
            return;
        }

        const filteredLines = Object.values(lines).filter(line => line.lineText.trim() !== '');
        if (filteredLines.length === 0) {
            return;
        }

        const savedInvoice = await saveInvoice(filteredLines);
        if (!('data' in savedInvoice) || !savedInvoice.data?.id) {
            return;
        }

        const invoiceId = savedInvoice.data.id;
        const invoiceLines: InvoiceLine[] = [];

        await Promise.all(Object.values(filteredLines).map(async (line) => {
            if (editingInvoiceId && line.id) {
                const data = {
                    id: line.id,
                    invoice_id: invoiceId,
                    quantity: line.quantity,
                    unit_price: line.unitPrice,
                    vat: line.vat,
                    description: line.lineText
                }
                const updatedLine = await updateInvoiceLine({ data, accessToken });

                if ('data' in updatedLine) {
                    invoiceLines.push(updatedLine.data);
                }

                return;
            }
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

        const { data: banks } = await getBanks(accessToken);
        const bank = banks?.find(bank => bank.id === accountData.bank_id) || {} as Bank;
        await generatePdf({
            data: { accountData, invoice: savedInvoice.data, invoiceLines, client, bank },
            accessToken
        });
        dispatch(removeFromGeneratingInvoicesList(invoiceId));

        await bumpClient({ data: client, accessToken });
        dispatch(resetMessage(clientId));
        handleNewLine();
        
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
                    onClick={handleSave}
                    disabled={creatingInvoice || creatingInvoiceLine || generatingPdf || isBumpingClient}
                >
                    <PostAddIcon sx={{ mr: 1 }} />
                    <Typography variant="button">Create Draft</Typography>
                </Fab>
            </Tooltip>
        </Box>
    );

    const saveButton = (
        <Box>
            <Tooltip title="Save invoice" placement="top">
                <Fab
                    color="primary"
                    variant="extended"
                    size={isXs ? 'small' : 'large'}
                    onClick={handleSave}
                    disabled={updatingInvoice || updatingInvoiceLine || generatingPdf || isBumpingClient}
                >
                    <SaveIcon sx={{ mr: 1 }} />
                    <Typography variant="button">Save</Typography>
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
                    {editingInvoiceId ? saveButton : previewButton}
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
                        {editingInvoiceId ? saveButton : previewButton}
                    </Stack>
                )}
            </Stack>
        </Box>
    )
})

export default InvoiceForm