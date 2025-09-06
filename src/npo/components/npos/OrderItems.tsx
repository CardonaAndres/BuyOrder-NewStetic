import { useEffect } from "react";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { motion, AnimatePresence } from 'framer-motion';
import { useNpoHook } from "../../hooks/useNpoHook";
import type { NpoOrder, OrderItemType } from "../../assets/ts/types";
import { 
  X, 
  Package, 
  DollarSign, 
  Hash, 
  FileText, 
  Building2,
  Calendar,
  Mail,
  ShoppingCart,
  Warehouse,
  Tag,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';

interface Props {
  order: NpoOrder;
  onClose: () => void;
}

export const OrderItems = ({ onClose, order }: Props) => {
  const { loading, getOrderItems, items, getStatusColor, getStatusText } = useNpoHook();

  useEffect(() => {
    getOrderItems(String(order.consec_docto), onClose);
  }, []);

  const safeItems = (items as OrderItemType[]) || [];
  const totalValue = safeItems.reduce((sum, item) => sum + item.TotalLinea, 0);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl border border-white w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">Orden #{order.consec_docto}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.estado)} bg-white`}>
                    {getStatusText(order.estado)}
                  </span>
                </div>
                <p className="text-teal-100">
                  {order.RazonSocial} • {safeItems.length} items
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Información de la orden */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-medium">Proveedor</p>
                  <p className="text-sm font-bold text-blue-800">{order.CodigoProveedor}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium">Fecha Orden</p>
                  <p className="text-sm font-bold text-green-800">{order.Fecha}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-600 font-medium">Total Items</p>
                  <p className="text-sm font-bold text-purple-800">{safeItems.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-orange-600 font-medium">Valor Total</p>
                  <p className="text-sm font-bold text-orange-800">${totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de items */}
        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-800">Items de la Orden</h2>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                {safeItems.length} productos
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {safeItems.map((item, index) => (
                  <motion.div
                    key={item.rowid_item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      {/* Info principal del producto */}
                      <div className="lg:col-span-5">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-gray-800">{item.item}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                {item.Referencia}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-2">
                              {item.Descripcion}
                            </p>
                            <div className="flex items-center gap-2">
                              <Warehouse className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-600">Bodega: {item.CodigoBodega}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cantidad */}
                      <div className="lg:col-span-2">
                        <div className="bg-blue-50 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Hash className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-600">Cantidad</span>
                          </div>
                          <p className="text-lg font-bold text-blue-800">
                            {item.Cantidad.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Precio unitario */}
                      <div className="lg:col-span-2">
                        <div className="bg-green-50 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Tag className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">Precio Unit.</span>
                          </div>
                          <p className="text-lg font-bold text-green-800">
                            ${item.PrecioUnitario.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Total línea */}
                      <div className="lg:col-span-3">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                            <span className="text-xs font-medium text-orange-600">Total Línea</span>
                          </div>
                          <p className="text-xl font-bold text-orange-800">
                            ${item.TotalLinea.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>Criterio: {item.CriterioMayor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Entrega: {item.FechaEntrega}</span>
                        </div>
                      </div>

                      {/* Emails del item si existen */}
                      {item.emails && item.emails.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-medium text-gray-600">Contactos ({item.emails.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.emails.slice(0, 2).map((email, emailIndex) => (
                              <span
                                key={emailIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                              >
                                {email}
                              </span>
                            ))}
                            {item.emails.length > 2 && (
                              <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-lg">
                                +{item.emails.length - 2} más
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Estado vacío */}
            {safeItems.length === 0 && !loading && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No hay items</h3>
                <p className="text-gray-500">Esta orden no tiene items asociados.</p>
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
};