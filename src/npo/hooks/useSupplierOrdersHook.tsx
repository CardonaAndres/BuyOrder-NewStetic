import { useState } from "react";
import { toast } from "react-toastify";
import { SupplierOrders } from "../APIs/supplierOrders";
import type { MessageTypeResponse } from "@/admin/assets/ts/types";
import type { CommentResponse, NpoOrder, OrderItemType, SendCommentDTO } from "../assets/ts/types";

export const useSupplierOrdersHook = () => {
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [npos, setNpos] = useState<NpoOrder[] | []>([]);
    const [npoItems, setNpoItems] = useState<OrderItemType[] | []>([]);
    const [comments, setComments] = useState<CommentResponse[] | []>([]);
    const [messages, setMessages] = useState<MessageTypeResponse[] | []>([]);

    const validateToken = async (token?: string) => {
        try {
            setLoading(true);

            const res = await SupplierOrders.validateToken(token);
            if(!res.success) throw new Error(res.message)

            setIsValid(true);
        } catch (err: any) {
            setIsValid(false); 
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const pendingSupplerOrders = async (token?: string) => {
        try {
            setLoading(true);

            const res = await SupplierOrders.pendingSupplerOrders(token);
            if(!res.success) throw new Error(res.message)

            setNpos(res.data.npos)

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const findNpoItems = async (id: string, token?: string) => {
        try {
            setLoading(true);

            const res = await SupplierOrders.findNpoItems(id, token);
            if(!res.success) throw new Error(res.message)

            setNpoItems(res.data.items)

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const getTypeMessages = async(token?: string) => {
        try {
            setLoading(true);

            const res = await SupplierOrders.getTypeMessages(token);
            if(!res.success) throw new Error(res.message)

            setMessages(res.data.messages);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const getOrderItemsComments = async (itemID: string, token?: string) => {
        try {
            setLoading(true);
            const res = await SupplierOrders.getOrderItemsComments(itemID, token);

            if(!res.success) throw new Error(res.message);

            setComments(res.data.comments);
        } catch(err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const sendComment = async(commentInfo: SendCommentDTO, token?: string) => {
        try {
            setLoading(true);
            const res = await SupplierOrders.sendComment(commentInfo, token);
            if(!res.success) throw new Error(res.data.message);

            toast.success(res.data.message, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        npos,
        loading,
        isValid,
        validateToken,
        pendingSupplerOrders,
        findNpoItems,
        npoItems,
        getTypeMessages,
        messages,
        sendComment,
        getOrderItemsComments,
        comments
    }
}
