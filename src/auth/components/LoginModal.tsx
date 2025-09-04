import { Modal, Box } from '@mui/material';
import { LoginForm } from './LoginForm';

type Props = {
    onClose : () => void,
    open : boolean,
}

const modalStyles = {
    position: 'absolute' as const,
    top: { xs: '50%', sm: '50%', md: '45%' } as const,
    left: '50%' as const,
    transform: 'translate(-50%, -50%)' as const,
    width: { xs: 'auto', sm: 'auto', md: '50%' } as const,
    maxHeight: '90vh' as const, 
    overflowY: 'auto' as const,
};

export const LoginModal = ({ open, onClose } : Props) => {
  
  if(!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <LoginForm onClose={onClose} />
        </Box>
    </Modal>
  )
}

