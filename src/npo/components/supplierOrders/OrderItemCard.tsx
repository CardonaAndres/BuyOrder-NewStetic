import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import type { OrderItemType, SendCommentDTO } from "@/npo/assets/ts/types";
import type { MessageTypeResponse } from "@/admin/assets/ts/types";
import { useSupplierOrdersHook } from "@/npo/hooks/useSupplierOrdersHook";
import { 
  Package2,
  Hash,
  FileText,
  DollarSign,
  Calculator,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Send,
  Tag
} from 'lucide-react';
import { ItemCommentsModal } from "./ItemCommentsModal";

interface Props {
  item: OrderItemType;
  messages: MessageTypeResponse[];
}

export const OrderItemCard = ({ item, messages }: Props) => {
  const { token } = useParams<{ token: string }>();
  const [itemsModal, setItemsModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendComment } = useSupplierOrdersHook();
  const { 
    register, 
    handleSubmit, 
    reset, 
    watch,
    formState: { errors, isValid }
  } = useForm<SendCommentDTO>({
    defaultValues: {
      itemID: item.rowid_item.toString(),
      commentText: "",
      messageID: 0
    }
  });

  const selectedMessageID = watch("messageID");
  const commentText = watch("commentText");

  // Filtrar solo mensajes activos
  const activeMessages = messages.filter(msg => msg.estado === 'Activo');

  const onSubmitted = handleSubmit(async (commentInfo) => {
      setIsSubmitting(true);

      await sendComment(commentInfo, token);

      reset();
      setShowCommentForm(false);
      setIsSubmitting(false);
  });

  const handleItemsModal = () => setItemsModal(!itemsModal);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl hover:bg-white/90"
    >
      {/* Header compacto */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Package2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white truncate max-w-[200px]">
                {item.item}
              </h3>
              <p className="text-teal-100 text-sm">
                Ref: <span className="font-medium">{item.Referencia}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-xl">
              {formatCurrency(item.TotalLinea)}
            </p>
            <p className="text-teal-100 text-xs uppercase tracking-wide">
              Total
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-5">
        {/* Descripción */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Descripción
            </span>
          </div>
          <p className="text-slate-800 text-sm leading-relaxed bg-slate-50 rounded-lg p-3">
            {item.Descripcion}
          </p>
        </div>

        {/* Grid de información principal */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-4 border border-yellow-200/50">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-semibold text-yellow-800 uppercase tracking-wide">Cantidad</span>
            </div>
            <p className="text-xl font-bold text-yellow-900">
              {item.Cantidad.toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-green-800 uppercase tracking-wide">Precio Unit.</span>
            </div>
            <p className="text-xl font-bold text-green-900">
              {formatCurrency(item.PrecioUnitario)}
            </p>
          </div>
        </div>

        {/* Información adicional expandible */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.CriterioMayor && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Criterio Mayor
                    </span>
                  </div>
                  <p className="text-slate-800 font-semibold">
                    {item.CriterioMayor}
                  </p>
                </div>
              )}

              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Row ID
                  </span>
                </div>
                <p className="text-slate-800 font-mono font-bold">
                  {item.rowid_item}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Formulario de comentarios */}
        <motion.div
          initial={false}
          animate={{ height: showCommentForm ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-slate-200">
            <form onSubmit={onSubmitted} className="space-y-4">
              {/* Selector de tipo de mensaje */}
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-700">Tipo de mensaje</span>
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("messageID", { 
                    required: "Selecciona un tipo de mensaje",
                    validate: value => value > 0 || "Selecciona un tipo de mensaje válido"
                  })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200 text-slate-700"
                >
                  <option value={0}>Seleccionar tipo de mensaje...</option>
                  {activeMessages.map((message) => (
                    <option key={message.mensaje_id} value={message.mensaje_id}>
                      {message.nombre}
                    </option>
                  ))}
                </select>
                {errors.messageID && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.messageID.message}
                  </p>
                )}
                
                {/* Descripción del mensaje seleccionado */}
                {selectedMessageID > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-teal-50 rounded-lg border border-teal-200"
                  >
                    <p className="text-teal-800 text-xs">
                      <span className="font-semibold">Descripción:</span>{' '}
                      {activeMessages.find(msg => msg.mensaje_id === Number(selectedMessageID))?.descripcion}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Campo de comentario */}
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-700">Comentario</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("commentText", { 
                    required: "El comentario es obligatorio",
                    minLength: { value: 10, message: "Mínimo 10 caracteres" },
                    maxLength: { value: 500, message: "Máximo 500 caracteres" }
                  })}
                  placeholder="Escribe tu comentario aquí..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200 text-slate-700 resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.commentText && (
                    <p className="text-red-600 text-xs flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.commentText.message}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 ml-auto">
                    {commentText?.length || 0}/500
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowCommentForm(false);
                    reset();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  whileHover={{ scale: isValid && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: isValid && !isSubmitting ? 0.98 : 1 }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Botones de acción principales */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all duration-200"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>Ver menos</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>Ver detalles</span>
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleItemsModal }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-xl transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            <span>Ver comentarios</span>
          </motion.button>
        </div>

        {/* Botón comentar separado si hay mensajes activos */}
        {activeMessages.length > 0 && (
          <motion.button
            onClick={() => setShowCommentForm(!showCommentForm)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-all duration-200 ${
              showCommentForm 
                ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                : 'bg-teal-100 hover:bg-teal-200 text-teal-700'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{showCommentForm ? 'Cerrar formulario' : 'Agregar comentario'}</span>
          </motion.button>
        )}
      </div>

        <ItemCommentsModal 
          open={itemsModal} 
          itemID={item.rowid_item.toString()} 
          onClose={handleItemsModal} 
        />
    </motion.div>
  );
};