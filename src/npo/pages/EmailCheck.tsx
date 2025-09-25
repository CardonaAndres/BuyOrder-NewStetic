
// components/EmailCheck/EmailLogCard.tsx
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface EmailLogCardProps {
  log: EmailLogType;
  index: number;
}

export const EmailLogCard = ({ log, index }: EmailLogCardProps) => {
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

// components/EmailCheck/EmailLogsList.tsx
import { Mail } from "lucide-react";

interface EmailLogsListProps {
  logs: EmailLogType[];
}

export const EmailLogsList = ({ logs }: EmailLogsListProps) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-teal-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          No hay logs disponibles
        </h3>
        <p className="text-slate-500">
          No se encontraron registros de envío de correos electrónicos.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
      <div className="divide-y divide-slate-100">
        {logs.map((log, index) => (
          <EmailLogCard key={log.email_log_id} log={log} index={index} />
        ))}
      </div>
    </div>
  );
};

// components/EmailCheck/LimitSelector.tsx
import { Settings, ChevronDown } from "lucide-react";

interface LimitSelectorProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
  showSelector: boolean;
  onToggleSelector: () => void;
  totalLogs: number;
}

export const LimitSelector = ({ 
  limit, 
  onLimitChange, 
  showSelector, 
  onToggleSelector,
  totalLogs 
}: LimitSelectorProps) => {
  const limitOptions = [10, 15, 25, 50, 100];

  // Ocultar si no hay más de 15 logs
  if (totalLogs <= 15) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={onToggleSelector}
        className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-slate-700 rounded-xl border border-slate-200 hover:border-teal-300 transition-all duration-200 text-sm font-medium"
      >
        <Settings className="w-4 h-4" />
        {limit} por página
        <ChevronDown className={`w-4 h-4 transition-transform ${showSelector ? 'rotate-180' : ''}`} />
      </button>

      {showSelector && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-20 min-w-[140px]"
        >
          {limitOptions.map((option) => (
            <button
              key={option}
              onClick={() => onLimitChange(option)}
              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-teal-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                limit === option ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-700'
              }`}
            >
              {option} por página
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

// components/EmailCheck/EmailCheckHeader.tsx
interface EmailCheckHeaderProps {
  totalLogs: number;
  totalPages: number;
  limit: number;
  onLimitChange: (newLimit: number) => void;
  showLimitSelector: boolean;
  onToggleLimitSelector: () => void;
}

export const EmailCheckHeader = ({
  totalLogs,
  totalPages,
  limit,
  onLimitChange,
  showLimitSelector,
  onToggleLimitSelector
}: EmailCheckHeaderProps) => {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
              Logs de Correos Electrónicos
            </h1>
            <p className="text-slate-600 font-medium text-sm">
              Monitoreo de envíos de correos electrónicos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-teal-700">{totalLogs}</div>
              <div className="text-xs text-slate-500">Total Logs</div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-700">{totalPages}</div>
              <div className="text-xs text-slate-500">Páginas</div>
            </div>
          </div>

          <LimitSelector
            limit={limit}
            onLimitChange={onLimitChange}
            showSelector={showLimitSelector}
            onToggleSelector={onToggleLimitSelector}
            totalLogs={totalLogs}
          />
        </div>
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-40"></div>
    </div>
  );
};

// components/EmailCheck/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex items-center justify-center gap-2"
    >
      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xl rounded-xl shadow-lg border border-white/50 p-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 text-teal-600" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-teal-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-teal-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 text-teal-600" />
        </button>
      </div>

      <div className="ml-4 text-sm text-slate-600">
        Página {currentPage} de {totalPages}
      </div>
    </motion.div>
  );
};

// Main component: EmailCheck.tsx
import { useEffect, useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { useEmailCheckHook } from "../hooks/useEmailCheckHook";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import type { EmailLogType } from "../assets/ts/types";

export const EmailCheck = () => {
  const { loading, logs, getEmailLogs, meta } = useEmailCheckHook();
  
  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem('emailCheck_page');
    return savedPage ? parseInt(savedPage) : 1;
  });
  
  const [limit, setLimit] = useState(() => {
    const savedLimit = sessionStorage.getItem('emailCheck_limit');
    return savedLimit ? parseInt(savedLimit) : 15;
  });

  const [showLimitSelector, setShowLimitSelector] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowLimitSelector(false);
    if (showLimitSelector) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLimitSelector]);

  useEffect(() => {
    sessionStorage.setItem('emailCheck_page', page.toString());
    sessionStorage.setItem('emailCheck_limit', limit.toString());
    getEmailLogs(page, limit);
  }, [page, limit]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setShowLimitSelector(false);
  };

  if (loading) return <LoadingScreen />;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
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

  return (
    <>
      <Navbar />
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/40 relative overflow-hidden mt-12"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-teal-300/10 via-teal-200/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-yellow-300/10 via-yellow-200/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <motion.div variants={itemVariants} className="mb-8">
            <EmailCheckHeader
              totalLogs={meta?.totalLogs || 0}
              totalPages={meta?.totalPages || 0}
              limit={limit}
              onLimitChange={handleLimitChange}
              showLimitSelector={showLimitSelector}
              onToggleLimitSelector={() => setShowLimitSelector(!showLimitSelector)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EmailLogsList logs={logs || []} />
          </motion.div>

          <Pagination
            currentPage={page}
            totalPages={meta?.totalPages || 0}
            onPageChange={setPage}
          />
        </div>
      </motion.main>
    </>
  );
};