import { motion, AnimatePresence } from 'framer-motion';
import { useSuppliersHook } from '@/npo/hooks/useSuppliersHook';
import { useEffect } from 'react';
import { RefreshCw, X, Package, ShoppingCart } from 'lucide-react';
import { NpoCard } from '../npos/NpoCard';

interface Props {
    onClose: () => void;
    supplier: string;
}

export const SupplierOrders = ({ onClose, supplier }: Props) => {
  const { loading, getSupplierOrders, supplierOrders } = useSuppliersHook();

  useEffect(() => {
    getSupplierOrders(supplier);
  }, []);

  return (
    <div className="flex items-center justify-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-100/50 overflow-hidden"
      >
        {/* Header with gradient and close button */}
        <div className="relative bg-gradient-to-r from-teal-50 via-white to-yellow-50 p-6 border-b border-teal-100/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                  Órdenes de Compra
                </h2>
                <p className="text-slate-600 text-sm mt-1 flex items-center gap-2">
                  <Package className="w-4 h-4 text-teal-500" />
                  Proveedor: <span className="font-medium text-teal-700">{supplier}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {loading && (
                <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-2 rounded-lg border border-teal-100">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Cargando...</span>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 bg-white hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl border border-slate-200 hover:border-red-200 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-yellow-300 to-teal-400"></div>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            /* Loading Section */
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="relative">
                {/* Animated background circles */}
                <div className="absolute inset-0 w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-yellow-400 rounded-full animate-pulse opacity-20"></div>
                  <div className="absolute inset-2 bg-gradient-to-r from-yellow-300 to-teal-300 rounded-full animate-pulse opacity-30 animation-delay-100"></div>
                </div>
                
                {/* Main loading icon */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-10 h-10 text-teal-500 animate-spin" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Cargando órdenes...</h3>
              <p className="text-slate-500 text-center mb-6">
                Obteniendo las órdenes de compra del proveedor <span className="font-medium text-teal-600">{supplier}</span>
              </p>
              
              {/* Loading skeleton cards */}
              <div className="w-full max-w-2xl space-y-3">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item * 0.1 }}
                    className="bg-gradient-to-r from-white to-teal-50/30 rounded-xl border border-teal-100/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-200/50 to-yellow-200/50 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-teal-200/60 to-transparent rounded animate-pulse"></div>
                        <div className="h-3 bg-gradient-to-r from-yellow-200/40 to-transparent rounded animate-pulse w-2/3"></div>
                      </div>
                      <div className="w-20 h-8 bg-gradient-to-r from-teal-100/60 to-yellow-100/60 rounded animate-pulse"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : supplierOrders.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-4">
                <Package className="w-10 h-10 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No hay órdenes disponibles</h3>
              <p className="text-slate-500 text-center">
                No se encontraron órdenes de compra para este proveedor.
              </p>
            </div>
          ) : (
            /* Orders List */
            <div className="divide-y divide-slate-100/80">
              <AnimatePresence>
                {supplierOrders.map((npo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-teal-25 hover:to-yellow-25 transition-all duration-200"
                  >
                    <NpoCard npo={npo} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer with order count */}
        {supplierOrders.length > 0 && (
          <div className="bg-gradient-to-r from-teal-25 via-white to-yellow-25 px-6 py-4 border-t border-teal-100/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                Total de órdenes: <span className="font-semibold text-teal-700">{supplierOrders.length}</span>
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};