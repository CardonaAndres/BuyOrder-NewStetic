import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useParams } from "react-router-dom";
import { OrderItemCard } from './OrderItemCard';
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useSupplierOrdersHook } from "@/npo/hooks/useSupplierOrdersHook";
import { 
  Package2,
  DollarSign,
  Calculator,
  Search,
  ArrowLeft,
  ShoppingCart,
  Filter,
  BarChart3
} from 'lucide-react';

interface OrderItemsProps {
  orderNumber?: string;
  supplierName?: string;
  onClose?: () => void;
}

export const OrderItems = ({ orderNumber, supplierName, onClose }: OrderItemsProps) => {
  const { token } = useParams<{ token: string }>();
  const [searchValue, setSearchValue] = useState("");
  const { findNpoItems, npoItems: items, loading, getTypeMessages, messages } = useSupplierOrdersHook();

  const filteredItems = items.filter(item =>
    item.item.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.Referencia.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.Descripcion.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalAmount = filteredItems.reduce((sum, item) => sum + item.TotalLinea, 0);
  const totalUnits = filteredItems.reduce((sum, item) => sum + item.Cantidad, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    getTypeMessages(token);
    findNpoItems(String(orderNumber), token);
  }, []);

  if(loading) return <LoadingScreen />

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    initial: { y: 30, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/40 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-teal-300/10 via-teal-200/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-yellow-300/10 via-yellow-200/5 to-transparent rounded-full blur-3xl" />
        
        {/* Floating decorative elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-br from-teal-400/15 to-yellow-400/15 rounded-2xl backdrop-blur-3xl"
        />
        
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            rotate: [0, -45, -90]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-16 w-8 h-8 bg-gradient-to-tr from-yellow-300/20 to-teal-300/20 rounded-full backdrop-blur-2xl"
        />
      </div>

      <div className="relative z-10 mx-auto px-6 py-8">
        {/* Header horizontal similar a AdminPage */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Back button integrado */}
                {onClose && (
                  <motion.button
                    onClick={onClose}
                    whileHover={{ x: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                  </motion.button>
                )}
                
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                    Items de la Orden {orderNumber && `#${orderNumber}`}
                  </h1>
                  <p className="text-slate-600 font-medium">
                    {supplierName || "Detalles de productos y cantidades"}
                  </p>
                </div>
              </div>

              {/* Stats resumidas */}
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-teal-700">{filteredItems.length}</div>
                  <div className="text-xs text-slate-500">Items</div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-700">{formatCurrency(totalAmount).replace('COP', '').trim()}</div>
                  <div className="text-xs text-slate-500">Valor Total</div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-700">{totalUnits.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Unidades</div>
                </div>
              </div>
            </div>
            <div className="mt-6 h-1 bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-50"></div>
          </div>
        </motion.div>

        {/* Stats cards estilo AdminPage */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:hidden"
        >
          {/* Items totales */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{filteredItems.length}</div>
                <div className="text-sm text-slate-600 font-medium">Items Totales</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Package2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Valor total */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalAmount).replace('COP', '').trim()}</div>
                <div className="text-sm text-slate-600 font-medium">Valor Total</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Unidades totales */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{totalUnits.toLocaleString()}</div>
                <div className="text-sm text-slate-600 font-medium">Unidades</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Calculator className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search bar compacta */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="max-w-xl mx-auto">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar items..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-transparent border-0 rounded-xl focus:outline-none text-slate-700 placeholder:text-slate-400 text-sm"
                  />
                </div>
                
                <button className="p-2.5 hover:bg-teal-50 text-teal-600 hover:text-teal-700 rounded-lg transition-all duration-200">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Search results counter */}
            {searchValue && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-3"
              >
                <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-xs font-medium border border-teal-100">
                  <BarChart3 className="w-3 h-3" />
                  {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Items Grid estilo AdminPage */}
        <motion.div variants={itemVariants}>
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-32 h-32 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <Package2 className="w-16 h-16 text-teal-400" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-slate-700 mb-4">
                {searchValue ? "Sin resultados" : "No hay items disponibles"}
              </h3>
              <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                {searchValue 
                  ? "No encontramos items que coincidan con tu búsqueda. Intenta con otros términos."
                  : "No hay items disponibles para esta orden en este momento."
                }
              </p>
              
              {searchValue && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchValue("")}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Limpiar búsqueda
                </motion.button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.rowid_item}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <OrderItemCard 
                    item={item} 
                    index={index}
                    messages={messages}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer info similar a AdminPage */}
        {filteredItems.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-sm border border-white/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-sm text-slate-600">
                  Mostrando <span className="font-semibold text-teal-700">{filteredItems.length}</span> item{filteredItems.length !== 1 ? 's' : ''}
                </span>
              </div>
              {searchValue && (
                <>
                  <div className="w-px h-4 bg-slate-300" />
                  <span className="text-sm text-slate-500">
                    de <span className="font-semibold">{items.length}</span> totales
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};