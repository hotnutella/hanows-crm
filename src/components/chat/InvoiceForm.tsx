import { Box, Fab, Stack, Typography } from '@mui/material'
import React, { memo, use, useEffect } from 'react'
import InvoiceLineForm from './InvoiceLineForm'
import AddIcon from '@mui/icons-material/Add'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { addLine, resetMessage, getLines } from '@/store/slices/messageSlice'

interface InvoiceFormProps {
    clientId: number
    onHeightChange: (height: number) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = memo(function InvoiceForm({ clientId, onHeightChange }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const lines = useSelector((state: RootState) => getLines(state, clientId));
    const dispatch = useDispatch<AppDispatch>();

    const handleNewLine = () => {
        dispatch(addLine({ clientId, data: { lineText: '', quantity: 0, vat: 0 } }));
    }

    const handlePreview = () => {
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
                    <Fab color="primary" variant="extended" onClick={handlePreview}>
                        <Typography variant="button">Preview</Typography>
                        <KeyboardDoubleArrowUpIcon />
                    </Fab>
                </Box>
            </Stack>
        </Box>
    )
})

export default InvoiceForm