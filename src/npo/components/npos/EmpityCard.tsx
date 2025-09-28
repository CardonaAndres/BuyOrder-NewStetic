import { Package } from "lucide-react";
import { motion } from "framer-motion";
import type { NpoFiltersType } from "../../assets/ts/types";

interface Props {
    currentFilters: NpoFiltersType | null,
    handleClearFilters: () => void
}

export const EmpityCard = ({ currentFilters, handleClearFilters } : Props) => {
  return (
    <div className="p-12 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No hay órdenes</h3>
            <p className="text-gray-500">
                {currentFilters 
                    ? 'No se encontraron órdenes con los filtros aplicados.' 
                    : 'No hay órdenes de compra disponibles.'
                }
            </p>
            {currentFilters && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearFilters}
                    className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-all"
                >
                    Limpiar filtros
                </motion.button>
            )}
    </div>
  )
}
