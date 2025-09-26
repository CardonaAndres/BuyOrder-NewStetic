import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import type { MessageTypeDTO } from "@/admin/assets/ts/types";
import { useManagerTypeMessages } from "@/admin/hooks/useManagerTypeMessages";
import { X, MessageSquare, Save, Loader2, ToggleLeft, ToggleRight } from "lucide-react";

interface Props {
    onClose: () => void;
    initialData: MessageTypeDTO;
}

export const MessageTypeForm = ({ onClose, initialData }: Props) => {
    const isEditMode = initialData.messageID !== null;
    const { loading, createOrUpdateMessageType } = useManagerTypeMessages();
    const [localState, setLocalState] = useState(initialData.state);
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors, isSubmitting } 
    } = useForm<MessageTypeDTO>({
        defaultValues: {
            ...initialData,
            state: localState
        }
    });

    const watchName = watch("name");
    const watchDescription = watch("description");

    const onSubmited = handleSubmit(async (messageInfo) => {
        const dataToSubmit = {
            ...messageInfo,
            state: localState
        };
        createOrUpdateMessageType(isEditMode, dataToSubmit, onClose);
    });

    const toggleState = () => setLocalState(prev => prev === 'Activo' ? 'Inactivo' : 'Activo');
    
    return (
        <div className="z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
            >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-teal-50 via-white to-yellow-50 p-6 border-b border-teal-100/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {isEditMode ? 'Editar' : 'Crear'} Tipo de Mensaje
                                </h2>
                                <p className="text-slate-600 text-sm">
                                    {isEditMode 
                                        ? 'Modifica la información del tipo de mensaje' 
                                        : 'Crea un nuevo tipo de mensaje para los proveedores'
                                    }
                                </p>
                            </div>
                        </div>
                        
                        <button
                            onClick={onClose}
                            disabled={isSubmitting || loading}
                            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl border border-slate-200 hover:border-red-200 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                            aria-label="Cerrar formulario"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-yellow-300 to-teal-400"></div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmited} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                            Nombre del Mensaje <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "El nombre no puede exceder 50 caracteres"
                                }
                            })}
                            type="text"
                            placeholder="Ej: Producto no disponible"
                            className={`w-full px-4 py-3 bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
                                errors.name
                                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                                    : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500 hover:border-slate-300'
                            }`}
                            disabled={isSubmitting || loading}
                        />
                        {errors.name && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-600 font-medium"
                            >
                                {errors.name.message}
                            </motion.p>
                        )}
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Será visible en el selector para proveedores</span>
                            <span>{watchName?.length || 0}/50</span>
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                            Descripción <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("description", {
                                required: "La descripción es obligatoria",
                                minLength: {
                                    value: 10,
                                    message: "La descripción debe tener al menos 10 caracteres"
                                },
                                maxLength: {
                                    value: 200,
                                    message: "La descripción no puede exceder 200 caracteres"
                                }
                            })}
                            rows={4}
                            placeholder="Describe cuándo y cómo debe usarse este tipo de mensaje..."
                            className={`w-full px-4 py-3 bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                                errors.description
                                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                                    : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500 hover:border-slate-300'
                            }`}
                            disabled={isSubmitting || loading}
                        />
                        {errors.description && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-600 font-medium"
                            >
                                {errors.description.message}
                            </motion.p>
                        )}
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Ayuda a los proveedores a entender cuándo usar este mensaje</span>
                            <span>{watchDescription?.length || 0}/200</span>
                        </div>
                    </div>

                    {/* State Toggle */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">
                            Estado del Mensaje
                        </label>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                    localState === 'Activo' 
                                        ? 'bg-green-400 animate-pulse' 
                                        : 'bg-slate-400'
                                }`} />
                                <div>
                                    <span className="font-medium text-slate-800">
                                        {localState === 'Activo' ? 'Activo' : 'Inactivo'}
                                    </span>
                                    <p className="text-sm text-slate-600">
                                        {localState === 'Activo' 
                                            ? 'Visible para todos los proveedores' 
                                            : 'Oculto para los proveedores'
                                        }
                                    </p>
                                </div>
                            </div>
                            
                            <button
                                type="button"
                                onClick={toggleState}
                                disabled={isSubmitting || loading}
                                className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 ${
                                    localState === 'Activo'
                                        ? 'text-green-600 hover:bg-green-50'
                                        : 'text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {localState === 'Activo' ? (
                                    <ToggleRight className="w-6 h-6" />
                                ) : (
                                    <ToggleLeft className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting || loading}
                            className="px-6 py-3 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        
                        <motion.button
                            type="submit"
                            disabled={isSubmitting || loading}
                            whileHover={(!isSubmitting && !loading) ? { scale: 1.02 } : {}}
                            whileTap={(!isSubmitting && !loading) ? { scale: 0.98 } : {}}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {(isSubmitting || loading) ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {isEditMode ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    {isEditMode ? 'Actualizar' : 'Crear'} Mensaje
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>

                {/* Preview Section */}
                {(watchName || watchDescription) && (
                    <div className="mx-6 mb-6 p-4 bg-gradient-to-r from-teal-50 to-yellow-50 rounded-xl border border-teal-100">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-400 rounded-full" />
                            Vista previa para proveedores
                        </h4>
                        <div className="bg-white rounded-lg p-3 border border-white/50">
                            <div className="font-medium text-slate-800 text-sm">
                                {watchName || 'Nombre del mensaje...'}
                            </div>
                            <div className="text-xs text-slate-600 mt-1">
                                {watchDescription || 'Descripción del mensaje...'}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};