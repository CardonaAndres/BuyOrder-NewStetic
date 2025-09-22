import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSupplierOrdersHook } from "../hooks/useSupplierOrdersHook";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import type { NpoOrder } from '../assets/ts/types';
import { 
  Search,
  Package,
  Calendar,
  Building2,
  Mail,
  Sparkles,
  Zap,
  Eye
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';

// Componente separado para la card de orden
const OrderCard = ({ order }: { order: NpoOrder }) => {
  const getStatusText = (status: number) => {
    switch (status) {
      case 1: return "Pendiente";
      case 2: return "En Proceso";
      default: return "Desconocido";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1: return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case 2: return "text-teal-700 bg-teal-100 border-teal-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

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
              <p className="text-teal-100 text-sm">
                {order.CodigoProveedor}
              </p>
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
            <span className="text-sm font-medium text-gray-700">Proveedor</span>
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
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105">
            <Eye className="w-4 h-4" />
            <span>Ver Detalles</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

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