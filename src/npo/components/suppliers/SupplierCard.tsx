import { motion } from "framer-motion";
import type { SupplierType } from "@/npo/assets/ts/types";
import { Building2, Eye, Mail, ChevronRight } from "lucide-react";

interface Props {
  supplier: SupplierType;
  index: number;
}

export const SupplierCard = ({ supplier, index }: Props) => {
  const handleViewDetails = () => {
    // TODO: Implementar navegación a detalles
    console.log('Ver detalles del proveedor:', supplier);
  };

  const handleViewEmails = () => {
    // TODO: Implementar modal de emails
    console.log('Ver emails del proveedor:', supplier);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-teal-200/50 transition-all duration-300 group overflow-hidden my-3"
    >
      <div className="flex items-center justify-between p-6">
        {/* Información principal - Lado izquierdo */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Avatar del proveedor */}
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          
          {/* Información del proveedor */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {supplier.RazonSocial || "Proveedor sin nombre"}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              {supplier.emails && supplier.emails.length > 0 && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-600" />
                  <span className="text-sm text-gray-600">
                    {supplier.emails.length} contacto{supplier.emails.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Acciones - Lado derecho */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {supplier.emails && supplier.emails.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewEmails}
              className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm hover:shadow-md"
              title="Ver emails"
            >
              <Mail className="w-5 h-5" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="p-2.5 text-teal-600 hover:bg-teal-50 rounded-xl transition-all shadow-sm hover:shadow-md"
            title="Ver detalles"
          >
            <Eye className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
            title="Ver más opciones"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Sección de emails en la parte inferior */}
      {supplier.emails && supplier.emails.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-gray-100 px-6 py-4"
        >
          <div className="flex items-center justify-between mb-1">
            {supplier.emails.length > 3 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewEmails}
                className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                Ver todos
              </motion.button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {supplier.emails.slice(0, 3).map((email, emailIndex) => (
              <motion.div
                key={emailIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: emailIndex * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-teal-50 hover:to-blue-50 rounded-xl transition-all group/email border border-gray-200/50"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-800">
                  {email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="opacity-0 group-hover/email:opacity-100 p-1 text-gray-400 hover:text-teal-600 transition-all ml-auto"
                  title="Enviar email"
                >
                  <Mail className="w-3 h-3" />
                </motion.button>
              </motion.div>
            ))}
            
            {supplier.emails.length > 3 && (
              <div className="flex items-center px-3 py-2 bg-teal-100 text-teal-700 rounded-xl">
                <span className="text-sm font-medium">
                  +{supplier.emails.length - 3} más
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Indicador de hover sutil */}
      <div className="h-1 bg-gradient-to-r from-teal-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </motion.div>
  );
};