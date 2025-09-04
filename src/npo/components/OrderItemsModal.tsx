import { Modal, Box, Backdrop  } from '@mui/material';
import type { NpoOrder } from "../assets/ts/types";
import { OrderItems } from './OrderItems';
import { modalStyles } from '@/app/assets/ts/styles';

interface Props {
    open: boolean;
    onClose: () => void;
    order: NpoOrder
}

export const OrderItemsModal = ({ open, onClose, order } : Props) => {

    const handleClose = (_: any, reason: string) => {
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
                <OrderItems onClose={onClose} order={order} />
            </Box>
        </Modal>
    )
}
