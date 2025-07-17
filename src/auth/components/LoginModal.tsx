import { modalStyles } from '@/app/assets/ts/styles';
import { Modal, Box } from '@mui/material';
import { LoginForm } from './LoginForm';

type Props = {
    onClose : () => void,
    open : boolean,
}

export const LoginModal = ({ open, onClose } : Props) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <LoginForm onClose={onClose} />
        </Box>
    </Modal>
  )
}

