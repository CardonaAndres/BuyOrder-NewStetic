import { useForm } from "react-hook-form";
import type { MessageTypeDTO } from "@/admin/assets/ts/types";
import { useManagerTypeMessages } from "@/admin/hooks/useManagerTypeMessages";

interface Props {
    onClose: () => void;
    initialData: MessageTypeDTO
}

export const MessageTypeForm = ({ onClose, initialData } : Props) => {
    const isEditMode = initialData.messageID !== null;
    const { loading, createOrUpdateMessageType } = useManagerTypeMessages();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MessageTypeDTO>({
        defaultValues: {
            ...initialData
        }
    });

    const onSubmited = handleSubmit(async messageInfo => {
        createOrUpdateMessageType(isEditMode, messageInfo, onClose);
    })

    return (
        <div></div>
    )
}
