import { motion } from "framer-motion";
import { useNpoHook } from "@/npo/hooks/useNpoHook";
import type { NpoOrder } from "@/npo/assets/ts/types";
import { Package, Calendar, Building2, Mail, Eye } from 'lucide-react';
import { useState } from "react";
import { OrderItemsModal } from "./OrderItemsModal";

interface Props {
  order: NpoOrder;
}

export const OrderCard = ({ order }: Props) => {
  const [modal, setModal] = useState(false);
  const { getStatusText, getStatusColor } = useNpoHook();

  const handleModal = () => setModal(!modal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Orden #{order.consec_docto}
              </h3>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border bg-white ${getStatusColor(order.estado)}`}>
            {getStatusText(order.estado)}
          </div>
        </div>
      </div>

      {/* Contenido de la card */}
      <div className="p-6">
        {/* Información del proveedor */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-gray-700">Proveedor - {order.CodigoProveedor}</span>
          </div>
          <p className="text-gray-800 font-semibold text-base leading-tight">
            {order.RazonSocial}
          </p>
        </div>

        {/* Grid de información ordenada */}
        <div className="space-y-4 mb-6">
          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-yellow-600 mt-1" />
              <div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Fecha de Orden
                </span>
                <p className="text-gray-800 font-semibold text-sm">
                  {order.Fecha}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-teal-600 mt-1" />
              <div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Fecha de Entrega
                </span>
                <p className="text-gray-800 font-semibold text-sm">
                  {order.FechaEntrega}
                </p>
              </div>
            </div>
          </div>

          {/* Cantidades */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-gray-700">Items</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">
                {order.TotalItems}
              </p>
              <p className="text-xs text-gray-500">
                {order.TotalCantidad} unidades
              </p>
            </div>
          </div>
        </div>

        {/* Emails de contacto */}
        {order.emails && order.emails.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Correos de Contacto
              </span>
            </div>
            <div className="space-y-2">
              {order.emails.slice(0, 3).map((email, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 bg-teal-50 text-teal-700 rounded-md text-sm font-medium border border-teal-200 break-all"
                >
                  {email}
                </div>
              ))}
              {order.emails.length > 3 && (
                <div className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md text-sm font-medium border border-gray-200 flex items-center justify-between">
                  <span>+{order.emails.length - 3} correos más</span>
                  <Eye className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botón de ver detalles */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button onClick={handleModal} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105">
            <Eye className="w-4 h-4" />
            <span>Ver Detalles</span>
          </button>
        </div>
      </div>

      <OrderItemsModal 
       onClose={handleModal} 
       open={modal} 
       orderNumber={order.consec_docto} 
      />  

    </motion.div>
  );
};