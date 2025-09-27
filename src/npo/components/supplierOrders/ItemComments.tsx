import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useSupplierOrdersHook } from "@/npo/hooks/useSupplierOrdersHook";
import { X, MessageCircle, Calendar, Tag, FileText } from "lucide-react";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05
    }
  }
};

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

interface Props {
  itemID: string | number;
  onClose: () => void;
}

export const ItemComments = ({ onClose, itemID }: Props) => {
  const { token } = useParams<{ token: string }>();
  const { loading, getOrderItemsComments, comments } = useSupplierOrdersHook();

  useEffect(() => {
    getOrderItemsComments(itemID.toString(), token);
  }, [token]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        date: date.toLocaleDateString('es-ES', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        time: date.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
    } catch {
      return { date: dateString, time: '' };
    }
  };

  if (loading) return <LoadingScreen />

  return (
    <div className="flex items-center justify-center rounded-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden p-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-50 via-white to-teal-50 p-6 border-b border-slate-200/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                  Comentarios del Item
                </h2>
                <p className="text-slate-600 text-sm">
                  Item ID: <span className="font-mono font-semibold">{itemID}</span>
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 bg-white hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl border border-slate-200 hover:border-red-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] p-6">
          {!comments || comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Sin comentarios
              </h3>
              <p className="text-slate-500">
                Este item aún no tiene comentarios registrados.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              {comments.map((comment) => {
                const dateInfo = formatDate(comment.fecha);
                
                return (
                  <motion.div
                    key={comment.item_comentario_id}
                    variants={itemVariants}
                    className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 p-5 hover:bg-white/80 transition-all duration-200"
                  >
                    {/* Header del comentario */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                          <Tag className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">
                            {comment.tipoMensaje}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {comment.descripcionTipoMensaje}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs font-medium">{dateInfo.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido del comentario */}
                    <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-800 text-sm leading-relaxed">
                          {comment.comentario}
                        </p>
                      </div>
                    </div>

                    {/* Footer con IDs */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span>
                        Comentario ID: <span className="font-mono">{comment.item_comentario_id}</span>
                      </span>
                      <span>•</span>
                      <span>
                        Mensaje ID: <span className="font-mono">{comment.mensaje_id}</span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        {comments && comments.length > 0 && (
          <div className="bg-gradient-to-r from-teal-25 via-white to-teal-25 px-6 py-4 border-t border-slate-200/30">
            <div className="flex items-center justify-center text-sm">
              <span className="text-slate-600">
                Total: <span className="font-semibold text-teal-700">{comments.length}</span> comentario{comments.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};