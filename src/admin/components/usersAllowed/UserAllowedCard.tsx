import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";
import type { UserAllowedResponse } from "@/admin/assets/ts/types";
import { UserFormModal } from "./UserFormModal";

interface Props {
    user: UserAllowedResponse;
    index: number;
}

const cardVariants = {
  initial: { y: 30, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20
    }
  }
};

export const UserAllowedCard = ({ user, index }: Props) => {
    const [modal, setModal] = useState(false);  
    const handleModal = () => setModal(!modal);

    return (
        <motion.div
            variants={cardVariants}
            custom={index}
            className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
        >
            <div className="grid grid-cols-12 gap-4 items-center">
                {/* Usuario */}
                <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {user.username.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{user.username}</p>
                        <p className="text-sm text-gray-500">ID: #{user.usuario_id}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="col-span-3">
                    <p className="text-gray-700 truncate">{user.email}</p>
                </div>

                {/* Documento */}
                <div className="col-span-2">
                    <p className="text-gray-700">{user.num_documento}</p>
                </div>

                {/* Estado */}
                <div className="col-span-2">
                    {user.estado === 'Activo' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            Disponible
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            Inactivo
                        </span>
                    )}
                </div>

                {/* Acciones */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                    <button onClick={handleModal} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                        <Edit3 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <UserFormModal onClose={handleModal} open={modal} userInfo={user} />
        </motion.div>
    )
}
