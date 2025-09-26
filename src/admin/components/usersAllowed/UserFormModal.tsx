import { Modal, Box, Backdrop } from '@mui/material';
import { modalStyles } from '@/app/assets/ts/styles';
import type { UserAllowedDTO, UserAllowedResponse } from "@/admin/assets/ts/types";
import { UserForm } from './UserForm';

interface Props {
    open: boolean;
    onClose: () => void;
    userInfo?: UserAllowedResponse
}

export const UserFormModal = ({ open, onClose, userInfo }: Props) => {
    const handleClose = (_: unknown, reason?: string) => {
        if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) 
            return;

        onClose();
    };

    if(!open) return null;

    const initialData: UserAllowedDTO = {
        userID: userInfo?.usuario_id || null,
        username: userInfo?.username || "",
        email: userInfo?.email || "",
        numDoc: userInfo?.num_documento || "",
        state: userInfo?.estado || "Activo"
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
                <UserForm 
                    initialData={initialData} 
                    onClose={onClose}
                />
            </Box>
        </Modal>
    )
}
