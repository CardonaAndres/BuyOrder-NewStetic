import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface EmptyStateProps {
  hasSearchTerm: boolean;
  onClearSearch?: () => void;
}

export const EmptyState = ({ hasSearchTerm, onClearSearch }: EmptyStateProps) => {
  return (
    <div className="text-center py-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-32 h-32 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
      >
        <MessageCircle className="w-16 h-16 text-teal-400" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-slate-700 mb-4">
        {hasSearchTerm ? "Sin resultados" : "No hay mensajes disponibles"}
      </h3>
      <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
        {hasSearchTerm 
          ? "No se encontraron mensajes que coincidan con tu búsqueda."
          : "No hay comentarios de proveedores para mostrar en este momento."
        }
      </p>
      
      {hasSearchTerm && onClearSearch && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearSearch}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Limpiar búsqueda
        </motion.button>
      )}
    </div>
  );
};