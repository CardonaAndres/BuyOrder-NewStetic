import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useParams } from "react-router-dom";
import { OrderItemCard } from './OrderItemCard';
import { useSupplierOrdersHook } from "@/npo/hooks/useSupplierOrdersHook";
import { 
  Package2,
  DollarSign,
  Calculator,
  Search,
  ArrowLeft,
  Sparkles,
  Filter
} from 'lucide-react';
import { LoadingScreen } from "@/app/components/LoadingScreen";

interface OrderItemsProps {
  orderNumber?: string;
  supplierName?: string;
  onClose?: () => void;
}

export const OrderItems = ({ orderNumber, supplierName, onClose }: OrderItemsProps) => {
  const { token } = useParams<{ token: string }>();
  const [searchValue, setSearchValue] = useState("");
  const { findNpoItems, npoItems: items, loading } = useSupplierOrdersHook();

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

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    initial: { y: 40, opacity: 0, scale: 0.9 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const statVariants = {
    initial: { x: -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  };

  const headerVariants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.2
      }
    }
  };

  useEffect(() => {
    findNpoItems(String(orderNumber), token)
  }, []);

  if(loading) return <LoadingScreen />

  return (
    <motion.main
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/40 relative overflow-hidden rounded-2xl"
    >
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradientes principales */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-teal-300/20 via-cyan-200/15 to-transparent rounded-full blur-3xl"
        />
        
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-yellow-200/15 via-orange-100/10 to-transparent rounded-full blur-3xl"
        />

        {/* Elementos decorativos adicionales */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-teal-400/60 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-500/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 right-0 w-px h-40 bg-gradient-to-b from-teal-200/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-40 h-px bg-gradient-to-r from-yellow-200/30 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Header mejorado */}
        <motion.div 
          variants={headerVariants}
          className="mb-12"
        >
          {/* Botón de regreso mejorado */}
          {onClose && (
            <motion.button
              onClick={onClose}
              whileHover={{ x: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 text-gray-700 hover:text-teal-600 hover:bg-white/90"
            >
              <motion.div
                whileHover={{ x: -3 }}
                className="w-5 h-5"
              >
                <ArrowLeft className="w-full h-full" />
              </motion.div>
              <span className="font-medium">Volver a órdenes</span>
            </motion.button>
          )}

          {/* Título principal con efectos */}
          <div className="text-center relative">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            >
              <Sparkles className="w-8 h-8 text-teal-400/60" />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 mb-4 tracking-tight"
            >
              Items de la Orden
            </motion.h1>
            
            {orderNumber && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 mb-3 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-lg"
              >
                <span className="text-lg font-bold">#{orderNumber}</span>
              </motion.div>
            )}
            
            {supplierName && (
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl font-semibold text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-2 inline-block shadow-sm"
              >
                {supplierName}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Stats mejoradas */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Items totales */}
            <motion.div 
              variants={statVariants}
              whileHover="hover"
              className="group relative bg-gradient-to-br from-white via-white to-teal-50/50 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between">
                <div>
                  <motion.p 
                    className="text-3xl md:text-4xl font-black text-gray-800 mb-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    {filteredItems.length.toLocaleString()}
                  </motion.p>
                  <p className="text-gray-600 font-semibold">Items totales</p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25"
                >
                  <Package2 className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Valor total */}
            <motion.div 
              variants={statVariants}
              whileHover="hover"
              className="group relative bg-gradient-to-br from-white via-white to-green-50/50 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between">
                <div>
                  <motion.p 
                    className="text-2xl md:text-3xl font-black text-gray-800 mb-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    {formatCurrency(totalAmount).replace('COP', '').trim()}
                  </motion.p>
                  <p className="text-gray-600 font-semibold">Valor total</p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25"
                >
                  <DollarSign className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Unidades totales */}
            <motion.div 
              variants={statVariants}
              whileHover="hover"
              className="group relative bg-gradient-to-br from-white via-white to-yellow-50/50 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between">
                <div>
                  <motion.p 
                    className="text-3xl md:text-4xl font-black text-gray-800 mb-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    {totalUnits.toLocaleString()}
                  </motion.p>
                  <p className="text-gray-600 font-semibold">Unidades</p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25"
                >
                  <Calculator className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Barra de búsqueda mejorada */}
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nombre, referencia o descripción..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-16 pr-16 py-5 text-lg bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl shadow-gray-900/10 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500/50 focus:bg-white/90 transition-all duration-500 placeholder-gray-400"
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    className="w-6 h-6 text-gray-400 cursor-pointer hover:text-teal-500 transition-colors duration-300"
                  >
                    <Filter />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Indicador de resultados */}
              {searchValue && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 px-4 py-2 bg-teal-500 text-white text-sm rounded-2xl shadow-lg"
                >
                  {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Lista de items mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center py-20"
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
              >
                <Package2 className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">
                No se encontraron items
              </h3>
              <p className="text-gray-500 text-lg">
                {searchValue ? "Intenta ajustar tu búsqueda" : "No hay items disponibles"}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.rowid_item}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <OrderItemCard 
                    item={item} 
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
};