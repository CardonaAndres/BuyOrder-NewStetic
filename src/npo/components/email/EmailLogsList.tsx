import { Mail } from "lucide-react";
import type { EmailLogType } from "@/npo/assets/ts/types";
import { EmailLogCard } from "./EmailLogCard";

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