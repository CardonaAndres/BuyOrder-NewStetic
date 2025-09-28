import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, Tag, Eye } from "lucide-react";
import type { CommentResponse } from "@/npo/assets/ts/types";
import { NpoItemModal } from "./NpoItemModal";

interface MessageCardProps {
  message: CommentResponse;
  index: number;
}

export const MessageCard = ({ message, index }: MessageCardProps) => {
  const [modalItem, setModalItem] = useState(false);
  const handleModalItem = () => setModalItem(!modalItem);

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

  const dateInfo = formatDate(message.fecha);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="p-6 hover:bg-gradient-to-r hover:from-teal-25 hover:to-transparent transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 p-2.5 rounded-xl bg-teal-50 border border-teal-200">
          <Tag className="w-5 h-5 text-teal-600" />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-slate-900 text-lg">
                {message.tipoMensaje}
              </h3>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Item: {message.item_id}
              </span>
            </div>
            
            {/* Date and time */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{dateInfo.date}</span>
              </div>
            </div>
          </div>

          {/* Message type description */}
          <p className="text-sm text-slate-600 mb-3">
            {message.descripcionTipoMensaje}
          </p>
          
          {/* Comment content */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-3">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-slate-800 leading-relaxed">
                {message.comentario}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end">
            <motion.button
              onClick={handleModalItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
              <span>Ver item</span>
            </motion.button>
          </div>
        </div>
      </div>

      <NpoItemModal 
        open={modalItem} 
        onClose={handleModalItem} 
        itemID={message.item_id} 
      />
    </motion.div>
  );
};