import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type { UserAllowedDTO } from "@/admin/assets/ts/types";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useUsersAllowedHook } from "@/admin/hooks/useUsersAllowedHook";
import { X, Save, User, Mail, IdCard, Shield, UserCheck } from "lucide-react";

interface Props {
    onClose: () => void;
    initialData: UserAllowedDTO;
}

const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut" as const
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};

const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut" as const
        }
    }
};

export const UserForm = ({ onClose, initialData }: Props) => {
    const isEditMode = initialData.userID !== null;
    const { loading, giveOrUpdateAccess } = useUsersAllowedHook();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserAllowedDTO>({
        defaultValues: {
            ...initialData
        }
    });

    const onSubmited = handleSubmit(async userInfo => {
        giveOrUpdateAccess(isEditMode, userInfo, onClose);
    })

    if (loading) return <LoadingScreen />

    return (
        <div className="flex items-center justify-center z-50">
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                                {isEditMode ? (
                                    <UserCheck className="w-6 h-6 text-white" />
                                ) : (
                                    <User className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'}
                                </h2>
                                <p className="text-gray-600">
                                    {isEditMode ? 'Modifica los datos del usuario' : 'Agrega un nuevo usuario al sistema'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
                    <form onSubmit={onSubmited} className="space-y-6">
                        <motion.div variants={itemVariants}>
                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                                    Nombre de Usuario
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Ingresa el nombre de usuario"
                                        {...register("username", {
                                            required: "El nombre de usuario es requerido",
                                            minLength: {
                                                value: 3,
                                                message: "Debe tener al menos 3 caracteres"
                                            }
                                        })}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${errors.username
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-sm text-red-600">{errors.username.message}</p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="usuario@ejemplo.com"
                                        {...register("email", {
                                            required: "El correo electrónico es requerido",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Ingresa un correo válido"
                                            }
                                        })}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${errors.email
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            {/* Document Number Field */}
                            <div className="space-y-2">
                                <label htmlFor="numDoc" className="block text-sm font-semibold text-gray-700">
                                    Número de Documento
                                </label>
                                <div className="relative">
                                    <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="numDoc"
                                        type="text"
                                        placeholder="Ingresa el número de documento"
                                        {...register("numDoc", {
                                            required: "El número de documento es requerido",
                                            minLength: {
                                                value: 6,
                                                message: "Debe tener al menos 6 dígitos"
                                            }
                                        })}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${errors.numDoc
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    />
                                </div>
                                {errors.numDoc && (
                                    <p className="text-sm text-red-600">{errors.numDoc.message}</p>
                                )}
                            </div>
                        </motion.div>

                        {isEditMode && (
                            <motion.div variants={itemVariants}>
                                {/* State Field */}
                                <div className="space-y-2">
                                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700">
                                        Estado del Usuario
                                    </label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select
                                            id="state"
                                            {...register("state", {
                                                required: "El estado es requerido"
                                            })}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 appearance-none bg-white ${errors.state
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <option value="">Selecciona un estado</option>
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo</option>
                                        </select>
                                        {/* Custom dropdown arrow */}
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.state && (
                                        <p className="text-sm text-red-600">{errors.state.message}</p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                    </form>
                </div>

                {/* Footer with Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onSubmited}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Guardando...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>{isEditMode ? 'Actualizar' : 'Crear'} Usuario</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};