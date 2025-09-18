import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navbar } from "@/app/components/Navbar"
import { useNpoHook } from "../hooks/useNpoHook"
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { motion, AnimatePresence } from 'framer-motion';
import { NpoCard } from "../components/npos/NpoCard";
import { EmpityCard } from "../components/npos/EmpityCard";
import { FileText, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from "../components/npos/Header";
import type { NpoFiltersType, Time } from "../assets/ts/types";

export const NpoPage = () => {
  const { 
    loading, 
    getAllNpos, 
    getNposBySearch, 
    npos, 
    meta, 
    clearFiltersAndReload,
    changePageWithFilters 
  } = useNpoHook();

  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<NpoFiltersType | null>(null);
  const [filters, setFilters] = useState<NpoFiltersType>({
    page: 1,
    limit: 15,
    value: '',
    orderDate: '',
    orderDateType: 'after',
    arrivalDate: '',
    arrivalDateType: 'after'
  });

  const [limit, setLimit] = useState(() => {
    const saved = sessionStorage.getItem('limit_page_npo');
    return saved ? parseInt(saved, 10) : 10;
  });

  const validateFilters = (): boolean => {
    const hasValue = filters.value && filters.value.trim() !== '';
    const hasOrderDate = filters.orderDate && filters.orderDateType;
    const hasArrivalDate = filters.arrivalDate && filters.arrivalDateType;

    if (!hasValue && !hasOrderDate && !hasArrivalDate) {
      toast.error('Debe especificar al menos un filtro de búsqueda');
      return false;
    }

    return true;
  };

  const handleSearch = async () => {
    if (!validateFilters()) return;

    const searchFilters = {
      ...filters,
      page: 1 
    };

    setCurrentFilters(searchFilters);
    await getNposBySearch(searchFilters);
  };

  const handleClearFilters = async () => {
    const clearedFilters = {
      page: 1,
      limit: 15,
      value: '',
      orderDate: '',
      orderDateType: 'after' as Time,
      arrivalDate: '',
      arrivalDateType: 'after' as Time
    };
    
    setFilters(clearedFilters);
    setCurrentFilters(null);
    await clearFiltersAndReload();
    toast.success('Filtros limpiados correctamente');
  };

  const handlePageChange = async (newPage: number) => {
    if (currentFilters) {
      await changePageWithFilters(newPage, currentFilters);
      setCurrentFilters({...currentFilters, page: newPage});
    } else {
      await changePageWithFilters(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
  };

  const handleRefresh = async () => {
    currentFilters 
    ? await getNposBySearch(currentFilters) 
    : await getAllNpos(meta?.page || 1, limit);

    toast.success('Datos actualizados');
  };

  const safeNpos = npos || [];
  const safeMeta = meta || { page: 1, limit: 15, total: 0, totalPages: 1 };

  useEffect(() => { sessionStorage.setItem('limit_page_npo', limit.toString()); }, [limit]); 

  useEffect(() => {
    getAllNpos(1, limit);
  }, []);

  if (loading && safeNpos.length === 0) return <LoadingScreen />;
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50/15 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <Header 
            limit={limit}
            filters={filters}
            showFilters={showFilters}
            currentFilters={currentFilters}
            loading={loading}
            handleRefresh={handleRefresh}
            setShowFilters={setShowFilters}
            setFilters={setFilters}
            handleSearch={handleSearch}
            handleClearFilters={handleClearFilters}
            handleLimitChange={handleLimitChange}
          />

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 mb-8"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Órdenes</p>
                  <p className="text-2xl font-bold text-gray-800">{safeMeta.total}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lista de órdenes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Órdenes de Compra</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Mostrando {safeNpos.length} de {safeMeta.total} órdenes
                  </p>
                </div>
                {loading && (
                  <div className="flex items-center gap-2 text-teal-600">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Cargando...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-200/50">
              <AnimatePresence>
                {safeNpos.map((npo, index) => (
                  <NpoCard key={index} npo={npo} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {/* Estado vacío */}
            {safeNpos.length === 0 && !loading && (
              <EmpityCard currentFilters={currentFilters} handleClearFilters={handleClearFilters} />
            )}
          </motion.div>

          {/* Paginación */}
          {safeMeta.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={safeMeta.page <= 1 || loading}
                onClick={() => handlePageChange(safeMeta.page - 1)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </motion.button>
              
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 text-sm text-gray-600">
                  Página {safeMeta.page} de {safeMeta.totalPages}
                </span>
                <span className="text-xs text-gray-400">
                  ({safeMeta.total} total)
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={safeMeta.page >= safeMeta.totalPages || loading}
                onClick={() => handlePageChange(safeMeta.page + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}