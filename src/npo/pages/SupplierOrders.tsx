import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSupplierOrdersHook } from "../hooks/useSupplierOrdersHook";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import type { NpoOrder } from '../assets/ts/types';
import { OrderCard } from '../components/supplierOrders/OrderCard';
import { Search, Package, Sparkles, Filter } from 'lucide-react';

export const SupplierOrders = () => {
  const { token } = useParams<{ token: string }>();
  const { pendingSupplerOrders, loading, npos } = useSupplierOrdersHook();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    pendingSupplerOrders(token);
  }, [token]);

  const filteredOrders = useMemo(() => {
    if (!searchValue || !npos) return npos || [];
    
    return npos.filter((order: NpoOrder) =>
      order.RazonSocial.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.CodigoProveedor.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.consec_docto.toString().includes(searchValue)
    );
  }, [npos, searchValue]);

  if (loading) return <LoadingScreen />

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
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

  return (
    <>
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/40 relative overflow-hidden"
      >
        {/* Enhanced background with floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary floating shapes */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-16 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-yellow-400/20 rounded-2xl backdrop-blur-3xl"
          />
          
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -20, 0],
              rotate: [0, -90, -180]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-10 w-12 h-12 bg-gradient-to-tr from-yellow-300/25 to-teal-300/25 rounded-full backdrop-blur-2xl"
          />

          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [0, 45, 90]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-32 right-1/4 w-8 h-8 bg-gradient-to-r from-teal-500/30 to-yellow-500/30 rounded-lg backdrop-blur-xl"
          />

          {/* Large background gradients */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-teal-300/15 via-teal-200/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-yellow-300/15 via-yellow-200/10 to-transparent rounded-full blur-3xl" />
          
          {/* Sparkle effects */}
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 left-1/3"
          >
            <Sparkles className="w-6 h-6 text-yellow-400/40" />
          </motion.div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          
          {/* Horizontal Header Layout */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center justify-between">
                {/* Left side - Logo and Title */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-32 flex items-center justify-center">
                      <img 
                        src='/imgs/logos/LOGO_NS_COMPLETO_2.png' 
                        alt='LOGO NS' className="w-full h-auto" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                      Órdenes de Compra
                    </h1>
                    <p className="text-slate-600 font-medium">
                      Sistema de gestión de órdenes pendientes
                    </p>
                  </div>
                </div>

                {/* Right side - Stats and Actions */}
                <div className="flex items-center gap-8">
                  {/* Quick Stats */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-700">{filteredOrders?.length || 0}</div>
                      <div className="text-sm text-slate-500 font-medium">Órdenes</div>
                    </div>
                    
                    <div className="w-px h-12 bg-slate-200"></div>
                    
                  </div>

                </div>
              </div>
              
              {/* Bottom accent line */}
              <div className="mt-6 h-1 bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-60"></div>
            </div>
          </motion.div>

          {/* Enhanced Search and Filters */}
          <motion.div 
            variants={itemVariants}
            className="mb-10"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar por razón social, código o número de orden..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-0 rounded-xl focus:outline-none text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-3 hover:bg-teal-50 text-teal-600 hover:text-teal-700 rounded-xl transition-all duration-200 group">
                      <Filter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Search results counter */}
              {searchValue && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4"
                >
                  <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium border border-teal-100">
                    <Package className="w-4 h-4" />
                    {filteredOrders?.length || 0} resultado{(filteredOrders?.length || 0) !== 1 ? 's' : ''} encontrado{(filteredOrders?.length || 0) !== 1 ? 's' : ''}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Enhanced Orders list */}
          <motion.div variants={itemVariants}>
            {!filteredOrders || filteredOrders.length === 0 ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-32 h-32 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
                >
                  <Package className="w-16 h-16 text-teal-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-slate-700 mb-4">
                  {searchValue ? "Sin resultados" : "No hay órdenes disponibles"}
                </h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                  {searchValue 
                    ? "No encontramos órdenes que coincidan con tu búsqueda. Intenta con otros términos."
                    : "En este momento no hay órdenes de compra pendientes para mostrar."
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
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.consec_docto}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <OrderCard order={order} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats footer */}
          {filteredOrders && filteredOrders.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-lg border border-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-yellow-400 rounded-full animate-pulse" />
                  <span className="text-slate-600 font-medium">
                    Mostrando <span className="font-bold text-teal-700">{filteredOrders.length}</span> órden{filteredOrders.length !== 1 ? 'es' : ''}
                  </span>
                </div>
                {searchValue && (
                  <>
                    <div className="w-px h-6 bg-slate-300" />
                    <span className="text-slate-500 text-sm">
                      de <span className="font-semibold">{npos?.length || 0}</span> totales
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.main>
    </>
  );
};