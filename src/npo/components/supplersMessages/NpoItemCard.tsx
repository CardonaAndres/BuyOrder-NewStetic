import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useNpoHook } from "@/npo/hooks/useNpoHook";
import type { OrderItemType } from "@/npo/assets/ts/types";
import { 
  X, 
  Package, 
  Building2, 
  Calendar, 
  DollarSign, 
  Calculator,
  FileText,
  Hash,
  Mail,
  MapPin
} from "lucide-react";

interface Props {
  itemID: string;
  onClose: () => void;
}

export const NpoItemCard = ({ itemID, onClose }: Props) => {
  const [item, setItem] = useState<OrderItemType>();  
  const { loading, getOrderItem } = useNpoHook();

  useEffect(() => {
    getOrderItem(itemID)
      .then(itemRes => setItem(itemRes))
      .catch(() => onClose());
  }, [itemID]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) return <LoadingScreen />

  if (!item) {
    return (
      <div className="flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 text-center max-w-md"
        >
          <h3 className="text-xl font-bold text-slate-700 mb-2">Item no encontrado</h3>
          <p className="text-slate-500 mb-4">No se pudo cargar la información del item.</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium"
          >
            Cerrar
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {item.item}
                </h2>
                <p className="text-teal-100 text-sm">
                  Referencia: <span className="font-medium">{item.Referencia}</span>
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6">
          
          {/* Descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-900">Descripción</h3>
            </div>
            <p className="text-slate-800 leading-relaxed">{item.Descripcion}</p>
          </motion.div>

          {/* Grid de información principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Cantidad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-5 border border-yellow-200/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Cantidad</h4>
              </div>
              <p className="text-2xl font-bold text-yellow-900">
                {item.Cantidad.toLocaleString()}
              </p>
            </motion.div>

            {/* Precio Unitario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-200/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Precio Unitario</h4>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(item.PrecioUnitario)}
              </p>
            </motion.div>

            {/* Total Línea */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border border-purple-200/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">Total Línea</h4>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(item.TotalLinea)}
              </p>
            </motion.div>
          </div>

          {/* Información de la orden */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900">Información de la Orden</h3>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Consecutivo Documento
                </label>
                <p className="text-slate-800 font-medium">{item.consec_docto}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Tipo Documento
                </label>
                <p className="text-slate-800 font-medium">{item.id_tipo_docto}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Row ID Item
                </label>
                <p className="text-slate-800 font-mono font-medium">{item.rowid_item}</p>
              </div>
              {item.CriterioMayor && (
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Criterio Mayor
                  </label>
                  <p className="text-slate-800 font-medium">{item.CriterioMayor}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Fechas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900">Fechas</h3>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Fecha de Orden
                </label>
                <p className="text-blue-900 font-medium text-lg">{item.Fecha}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <label className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                  Fecha de Entrega
                </label>
                <p className="text-orange-900 font-medium text-lg">{item.FechaEntrega}</p>
              </div>
            </div>
          </motion.div>

          {/* Información del Proveedor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900">Proveedor</h3>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Razón Social
                </label>
                <p className="text-slate-800 font-semibold text-lg">{item.RazonSocial}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Código Proveedor
                </label>
                <p className="text-slate-800 font-mono font-medium">{item.CodigoProveedor}</p>
              </div>
              
              {/* Emails */}
              {item.emails && item.emails.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Emails de Contacto
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.emails.map((email, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200"
                      >
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Información de Bodega */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900">Bodega</h3>
              </div>
            </div>
            <div className="p-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Código Bodega
              </label>
              <p className="text-slate-800 font-mono font-medium text-lg">{item.CodigoBodega}</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-teal-25 via-white to-teal-25 px-6 py-4 border-t border-slate-200/30">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-600 font-medium">
                Item #{item.rowid_item} - {item.item}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};