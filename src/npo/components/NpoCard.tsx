import { motion } from 'framer-motion';
import { Calendar, Package, Building2, Mail, Eye } from 'lucide-react';
import type { NpoOrder } from "../assets/ts/types"
import { useState } from 'react';
import { OrderItemsModal } from './OrderItemsModal';
import { useNpoHook } from '../hooks/useNpoHook';

interface Props {
    npo: NpoOrder;
    index: number
}

export const NpoCard = ({ npo, index }: Props) => {
  const { getStatusColor, getStatusText } = useNpoHook();
  const [modalItems, setModalItems] = useState(false);
  const handleModalItem = () => setModalItems(!modalItems)

  return (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="p-6 hover:bg-gray-50/50 transition-all group"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Info principal */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-gray-800">#{npo.consec_docto}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(npo.estado)}`}>
                        {getStatusText(npo.estado)}
                    </span>
                    </div>
                    <p className="text-sm text-gray-600">Código: {npo.CodigoProveedor?.trim() || 'N/A'}</p>
                </div>

                {/* Proveedor */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Proveedor</span>
                    </div>
                    <p className="text-sm text-gray-800 font-medium line-clamp-2">{npo.RazonSocial || 'N/A'}</p>
                </div>

                {/* Fechas */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Fechas</span>
                    </div>
                    <p className="text-xs text-gray-600">Orden: {npo.Fecha || 'N/A'}</p>
                    <p className="text-xs text-gray-600">Entrega: {npo.FechaEntrega || 'N/A'}</p>
                </div>

                {/* Cantidades */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Cantidades</span>
                    </div>
                    <p className="text-xs text-gray-600">{npo.TotalItems || 0} items</p>
                    <p className="text-xs text-gray-600">{(npo.TotalCantidad || 0).toLocaleString()} unidades</p>
                </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 transition-opacity">
                    <motion.button
                        onClick={handleModalItem}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                        title="Ver detalles"
                    >
                        <Eye className="w-6 h-6" />
                    </motion.button>
                
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Ver emails"
                    >
                        <Mail className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>

            {/* Emails */}
            {npo.emails && npo.emails.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Contactos ({npo.emails.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {npo.emails.slice(0, 3).map((email, emailIndex) => (
                    <span
                        key={emailIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                        {email}
                    </span>
                    ))}
                    {(npo.emails.length > 3) && (
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                        +{npo.emails.length - 3} más
                    </span>
                    )}
                </div>
                </div>
            )}

            <OrderItemsModal open={modalItems} onClose={handleModalItem} order={npo} />
    </motion.div>
  )
}