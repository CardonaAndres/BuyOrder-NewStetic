import { useState } from "react";
import { motion } from "framer-motion";
import type { OrderItemType } from "@/npo/assets/ts/types";
import { 
  Package2,
  Hash,
  FileText,
  DollarSign,
  Calculator,
  Warehouse,
  ChevronDown,
  ChevronUp
} from 'lucide-react';


export const OrderItemCard = ({ item, index }: { item: OrderItemType; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header compacto */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Package2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white truncate max-w-[200px]">
                {item.item}
              </h3>
              <p className="text-teal-100 text-sm">
                Ref: {item.Referencia}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-lg">
              {formatCurrency(item.TotalLinea)}
            </p>
            <p className="text-teal-100 text-xs">
              Total línea
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4">
        {/* Descripción */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Descripción
            </span>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">
            {item.Descripcion}
          </p>
        </div>

        {/* Grid de información principal */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-3 h-3 text-yellow-600" />
              <span className="text-xs font-medium text-gray-600">Cantidad</span>
            </div>
            <p className="text-lg font-bold text-gray-800">
              {item.Cantidad.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3 h-3 text-green-600" />
              <span className="text-xs font-medium text-gray-600">Precio Unit.</span>
            </div>
            <p className="text-lg font-bold text-gray-800">
              {formatCurrency(item.PrecioUnitario)}
            </p>
          </div>
        </div>

        {/* Información adicional expandible */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Warehouse className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Bodega
                  </span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {item.CodigoBodega}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Row ID
                  </span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {item.rowid_item}
                </p>
              </div>

              {item.CriterioMayor && (
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Criterio Mayor
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    {item.CriterioMayor}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Botón expandir/contraer */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Ver menos</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Ver más detalles</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
