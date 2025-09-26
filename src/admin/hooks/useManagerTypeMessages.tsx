import { useState } from "react";
import { toast } from "react-toastify";
import type { MessageTypeDTO, MessageTypeResponse } from "../assets/ts/types";
import { MessageManagerAPI } from "../API/messagesManager";

export const useManagerTypeMessages = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<MessageTypeResponse[] | []>([]);

    const getMessagesTypes = async () => {
        try {
            setLoading(true);

            const res = await MessageManagerAPI.getMessagesTypes();
            if(!res.success) throw new Error(res.message);

            setMessages(res.data.messages);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const createOrUpdateMessageType = async (
        isEditMode: boolean, 
        messageInfo: MessageTypeDTO,
        onClose: () => void
    ) => {
        try {
            setLoading(true);

            const { messageID, ...messageInfoWithoutId } = messageInfo;

            const res = isEditMode 
            ? await MessageManagerAPI.update(messageID, messageInfoWithoutId)
            : await MessageManagerAPI.create(messageInfoWithoutId);

            if(!res.success) throw new Error(res.message);

            onClose();
            toast.success(res.data.message, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err: any){
            onClose();
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        messages,
        getMessagesTypes,
        createOrUpdateMessageType
    }
}
