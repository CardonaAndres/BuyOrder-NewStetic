import { Modal, Box, Backdrop } from '@mui/material';
import { modalStyles } from '@/app/assets/ts/styles';
import { MessageTypeForm } from './MessageTypeForm';
import type { MessageTypeResponse, MessageTypeDTO } from "@/admin/assets/ts/types";

interface Props {
    open: boolean;
    onClose: () => void;
    messageInfo?: MessageTypeResponse
}

export const MessageTypeFormModal = ({ open, onClose, messageInfo }: Props) => {
    const handleClose = (_: unknown, reason?: string) => {
        if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) 
            return;

        onClose();
    };

    if(!open) return null;

    const initialData: MessageTypeDTO = {
        messageID: messageInfo?.mensaje_id || null,
        name: messageInfo?.nombre || "",
        description: messageInfo?.descripcion || 'Sin descripción',
        state: messageInfo?.estado || 'Activo'
    }

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Box sx={modalStyles} onClick={(e) => e.stopPropagation()} >
                <MessageTypeForm onClose={onClose} initialData={initialData} />
            </Box>
        </Modal>
    )
}
