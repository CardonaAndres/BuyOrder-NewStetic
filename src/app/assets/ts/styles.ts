export const modalStyles = {
    position: 'absolute' as const,
    top: { xs: '50%', sm: '50%', md: '45%' } as const,
    left: '50%' as const,
    transform: 'translate(-50%, -50%)' as const,
    width: { xs: 'auto', sm: 'auto', md: '50%' } as const,
    // bgcolor: 'background.paper' as const,
    maxHeight: '90vh' as const, 
    overflowY: 'auto' as const,
};