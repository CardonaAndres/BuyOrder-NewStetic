import { modalStyles } from '@/app/assets/ts/styles';
import { Modal, Box, Backdrop  } from '@mui/material';
import { SupplierOrders } from './SupplierOrders';

interface Props {
    open: boolean;
    supplier: string;
    onClose: () => void;
}

export const SupplerOrdersModal = ({ open, onClose, supplier } : Props) => {
  const handleClose = (_: any, reason: string) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) return;
    onClose();
  };
    
  if(!open) return null

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}
    >
        <Box sx={modalStyles} onClick={(e) => e.stopPropagation()} >
            <SupplierOrders onClose={onClose} supplier={supplier} />
        </Box>
    </Modal>
  )
}
