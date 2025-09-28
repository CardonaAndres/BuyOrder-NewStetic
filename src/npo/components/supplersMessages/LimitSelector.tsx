import { motion } from "framer-motion";
import { Settings, ChevronDown } from "lucide-react";

interface LimitSelectorProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
  showSelector: boolean;
  onToggleSelector: () => void;
  totalRecords: number;
}

export const LimitSelector = ({ 
  limit, 
  onLimitChange, 
  showSelector, 
  onToggleSelector,
  totalRecords 
}: LimitSelectorProps) => {
  const limitOptions = [10, 15, 25, 50, 100];

  // Ocultar si no hay más de 15 registros
  if (totalRecords <= 15) return null;
  
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