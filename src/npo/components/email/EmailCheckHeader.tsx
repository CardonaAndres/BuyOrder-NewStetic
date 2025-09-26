import { Mail } from "lucide-react";
import { LimitSelector } from "./LimitSelector";

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