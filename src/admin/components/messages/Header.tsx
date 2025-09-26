import { motion } from "framer-motion";
import { MessageSquare, Plus } from "lucide-react";
import type { MessageTypeResponse } from "@/admin/assets/ts/types";
import { useState } from "react";
import { MessageTypeFormModal } from "./MessageTypeFormModal";

interface Props {
    activeMessages: MessageTypeResponse[];
    inactiveMessages: MessageTypeResponse[];
}

const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    }
};

export const Header = ({ activeMessages, inactiveMessages }: Props) => {
    const [modalForm, setModalForm] = useState(false);
    const handleModalForm = () => setModalForm(!modalForm)

    return (
    <motion.div
        variants={itemVariants}
        className="mb-8"
    >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                            Gestión de Tipos de Mensajes
                        </h1>
                        <p className="text-slate-600 font-medium">
                            Configura los mensajes que verán los proveedores al comentar sus órdenes
                        </p>
                    </div>
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-xl font-bold text-teal-700">
                                {activeMessages.length}
                            </div>
                            <div className="text-xs text-slate-500">Activos</div>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-slate-600">
                                {inactiveMessages.length}
                            </div>
                            <div className="text-xs text-slate-500">Inactivos</div>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleModalForm}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Mensaje
                    </motion.button>
                </div>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-50"></div>
        </div>

        <MessageTypeFormModal open={modalForm} onClose={handleModalForm} />
    </motion.div>
    )
}
