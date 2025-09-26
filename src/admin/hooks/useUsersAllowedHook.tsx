import { useState } from 'react';
import { toast } from 'react-toastify';
import { UsersAllowedAPI } from '../API/usersAllowed';
import type { UserAllowedResponse, UserAllowedDTO } from '../assets/ts/types';

export const useUsersAllowedHook = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserAllowedResponse[] | []>([]);

    const getUsersAllowed = async () => {
        try {
            setLoading(true);

            const res = await UsersAllowedAPI.getUsersAllowed();
            if(!res.success) throw new Error(res.message);

            setUsers(res.data.users);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const giveOrUpdateAccess = async (
        isEditMode: boolean, 
        userInfo: UserAllowedDTO, 
        onClose: () => void
    ) => {
        try {
            setLoading(true);

            const { userID, ...userInfoWithoutId } = userInfo;

            const res = isEditMode 
            ? await UsersAllowedAPI.updateAccess(userID, userInfoWithoutId)
            : await UsersAllowedAPI.giveAccess(userInfoWithoutId);

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

        } catch (err: any) {
            onClose();
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        users,
        getUsersAllowed,
        giveOrUpdateAccess,  
    }
}
