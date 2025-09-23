import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSupplierOrdersHook } from "../hooks/useSupplierOrdersHook";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import type { NpoOrder } from '../assets/ts/types';
import { Navbar } from '../components/common/Navbar';
import { OrderCard } from '../components/supplierOrders/OrderCard';
import { Search, Package, Sparkles, Zap } from 'lucide-react';

// Componente principal
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
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <>
        <Navbar />
        <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50/30 relative overflow-hidden"
        >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
            animate={{
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1]
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute top-20 right-20 w-12 h-12"
            >
            <Sparkles className="w-full h-full text-teal-400/30" />
            </motion.div>
            
            <motion.div
            animate={{
                y: [0, 30, 0],
                rotate: [360, 180, 0],
                scale: [1, 0.7, 1]
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute top-60 left-16 w-8 h-8"
            >
            <div className="w-full h-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-xl" />
            </motion.div>

            <motion.div
            animate={{
                y: [0, -20, 0],
                x: [0, 20, 0],
                rotate: [0, 90, 180]
            }}
            transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute bottom-32 right-32 w-6 h-6"
            >
            <Zap className="w-full h-full text-yellow-400/25" />
            </motion.div>

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-yellow-200/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            {/* Header */}
            <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
            >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 mb-2">
                Órdenes de Compra
            </h1>
            <p className="text-gray-600 font-medium">
                Sistema de gestión de órdenes pendientes
            </p>
            </motion.div>

            {/* Search */}
            <motion.div 
            variants={itemVariants}
            className="mb-8"
            >
            <div className="max-w-md mx-auto">
                <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar órdenes..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300"
                />
                </div>
            </div>
            </motion.div>

            {/* Orders list */}
            <motion.div variants={itemVariants}>
            {!filteredOrders || filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No se encontraron órdenes
                </h3>
                <p className="text-gray-500">
                    {searchValue ? "Intenta ajustar tu búsqueda" : "No hay órdenes disponibles"}
                </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredOrders.map((order) => (
                    <OrderCard key={order.consec_docto} order={order} />
                ))}
                </div>
            )}
            </motion.div>
        </div>
        </motion.main>
    </>
  );
};