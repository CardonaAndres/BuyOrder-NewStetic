import { Modal, Box, Backdrop  } from '@mui/material';
import { modalStyles } from '@/app/assets/ts/styles';
import { OrderItems } from './OrderItems';

interface Props {
    open: boolean;
    orderNumber: string | number;
    onClose: () => void;
}

export const OrderItemsModal = ({ open, onClose, orderNumber } : Props) => {
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
            <OrderItems  
              orderNumber={orderNumber.toString()}
              onClose={onClose}
            />
        </Box>
    </Modal>
    )
}
