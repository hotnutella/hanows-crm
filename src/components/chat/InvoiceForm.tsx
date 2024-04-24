import { Box, Fab, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InvoiceLineForm from './InvoiceLineForm'
import AddIcon from '@mui/icons-material/Add'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { resetMessage } from '@/store/slices/messageSlice'

interface InvoiceFormProps {
    clientId: number
    onHeightChange: (height: number) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ clientId, onHeightChange }) => {
    const [lineIds, setLineIds] = useState<number[]>([0]);
    const dispatch = useDispatch<AppDispatch>();

    const handleNewLine = () => {
        setLineIds(prev => [...prev, prev.length]);
    }

    const handlePreview = () => {
        setLineIds([0]);
        dispatch(resetMessage(clientId));
    }

    const formRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!formRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            if (!formRef.current) {
                return;
            }

            const height = formRef.current!.getBoundingClientRect().height;
            onHeightChange(height);
        });
        resizeObserver.observe(formRef.current);

        return () => resizeObserver.disconnect();

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
            ref={formRef}
        >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={2}>
                        {lineIds.map((lineId) => (
                            <InvoiceLineForm
                                key={lineId}
                                clientId={clientId}
                                lineId={lineId} />
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
}

export default InvoiceForm