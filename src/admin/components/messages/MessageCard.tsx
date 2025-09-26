import { motion } from 'framer-motion';
import { MessageSquare, Edit3,  Eye, EyeOff } from "lucide-react";
import type { MessageTypeResponse } from '@/admin/assets/ts/types';

interface Props {
    message: MessageTypeResponse;
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

export const MessageCard = ({ message }: Props) => {
    const isActive = message.estado === 'Activo';
    
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ 
          y: -3, 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className="group cursor-pointer"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-white/80">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isActive 
                  ? 'bg-teal-50 border border-teal-200' 
                  : 'bg-slate-50 border border-slate-200'
              }`}>
                <MessageSquare className={`w-6 h-6 ${
                  isActive ? 'text-teal-600' : 'text-slate-500'
                }`} />
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-800">
                  {message.nombre}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    isActive 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}>
                    {isActive ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Activo
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Inactivo
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                className="p-2 hover:bg-teal-50 text-teal-600 hover:text-teal-700 rounded-lg transition-all duration-200"
                title="Editar mensaje"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {message.descripcion}
            </p>
            
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                ID: {message.mensaje_id}
              </span>
              
              <div className="text-xs text-slate-400">
                Disponible para proveedores
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>
    );
  };
