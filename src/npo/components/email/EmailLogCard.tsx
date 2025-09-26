import type { EmailLogType } from "@/npo/assets/ts/types";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface EmailLogCardProps {
  log: EmailLogType;
  index: number;
}

const getStatusInfo = (estado: 'SUCCESS' | 'ERROR') => {
    switch (estado) {
        case 'SUCCESS':
            return {
                icon: CheckCircle,
                color: 'text-green-600',
                bg: 'bg-green-50',
                border: 'border-green-200',
                label: 'Enviado exitosamente'
            };
            
        case 'ERROR':
            return {
                icon: XCircle,
                color: 'text-red-600',
                bg: 'bg-red-50',
                border: 'border-red-200',
                label: 'Error en envío'
            };

        default:
            return {
                icon: XCircle,
                color: 'text-slate-600',
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                label: 'Estado desconocido'
            };
    }
};

export const EmailLogCard = ({ log, index }: EmailLogCardProps) => {


  const statusInfo = getStatusInfo(log.estado);
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="p-6 hover:bg-gradient-to-r hover:from-teal-25 hover:to-transparent transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className={`flex-shrink-0 p-2.5 rounded-xl ${statusInfo.bg} ${statusInfo.border} border`}>
          <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header with status and badge */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-slate-900 text-lg">
                {statusInfo.label}
              </h3>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border} border`}>
                {log.estado}
              </span>
            </div>
            
            {/* Date and time - raw from DB */}
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-medium text-slate-900">{log.fecha}</div>
            </div>
          </div>
          
          {/* Error message if exists */}
          {log.error_mensaje && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800 mb-1">Mensaje de error</p>
                  <p className="text-sm text-red-700 leading-relaxed">
                    {log.error_mensaje}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer with metadata */}
          <div className="flex items-center text-xs text-slate-500">
            <span className="font-medium">ID:</span>
            <span className="ml-1 px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">
              {log.email_log_id}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
