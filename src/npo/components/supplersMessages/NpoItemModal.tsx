import { modalStyles } from '@/app/assets/ts/styles';
import { Modal, Box, Backdrop  } from '@mui/material';
import { NpoItemCard } from './NpoItemCard';

interface Props {
    open: boolean;
    itemID: string | number;
    onClose: () => void;
}

export const NpoItemModal = ({ open, onClose, itemID } : Props) => {
    const handleClose = (_: unknown, reason: string) => {
        if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) return;
        onClose();
    };
    
    if(!open) return null;

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Box sx={modalStyles} onClick={(e) => e.stopPropagation()} >
                <NpoItemCard onClose={onClose} itemID={itemID.toString()} />
            </Box>
        </Modal>
    )

}
