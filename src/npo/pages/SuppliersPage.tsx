import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/app/components/Navbar'
import { toast } from 'react-toastify';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { Header } from '../components/suppliers/Header';
import { useSuppliersHook } from '../hooks/useSuppliersHook';
import { SupplierCard } from '../components/suppliers/SupplierCard';
import { ChevronLeft, ChevronRight, RefreshCw, Users2 } from 'lucide-react';

export const SuppliersPage = () => {
  const { loading, getAllSuppliers, meta, getSuppliersBySearch, suppliers } = useSuppliersHook();
  const safeMeta = meta || { page: 1, limit: 20, total: 0, totalPages: 1 };
  const safeSuppliers = suppliers || [];

  const [ searchTerm, setSearchTerm ] = useState(() => {
    const saved = sessionStorage.getItem('supplier_searchTerm');
    return saved || '';
  });

  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('supplier_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const saved = sessionStorage.getItem('limit_page_suppliers');
    return saved ? parseInt(saved, 10) : 10;
  });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value && page !== 1) setPage(1);
  };

  const handleSearch = () => {
    if(searchTerm.trim()){
      setPage(1);
      getSuppliersBySearch(1, limit, searchTerm);
    }
  }
  
  const handleRefresh = async () => {
    window.location.reload();
    toast.success('Datos actualizados');
  };

  useEffect(() => { sessionStorage.setItem('supplier_page', page.toString()); }, [page]);
  useEffect(() => { sessionStorage.setItem('supplier_searchTerm', searchTerm); }, [searchTerm]);
  useEffect(() => { sessionStorage.setItem('limit_page_suppliers', limit.toString()); }, [limit]); 

  useEffect(() => {
    searchTerm.trim() 
     ? getSuppliersBySearch(page, limit, searchTerm)
     :  getAllSuppliers(page, limit);
  }, [page, limit]);

  if (loading) return <LoadingScreen />;
  
  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50/15 pt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Header
            loading={loading}
            handleRefresh={handleRefresh}
            handleSearchChange={handleSearchChange}
            handleSearch={handleSearch}
            handleLimitChange={handleLimitChange}
            limit={limit}
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
                  <p className="text-gray-600 text-sm font-medium">
                    Proveedores con OC pendientes
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{safeMeta.total}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                  <Users2 className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
          </motion.div>

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
                    Mostrando {safeSuppliers.length} de {safeMeta.total} órdenes
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
                {safeSuppliers.map((supplier, index) => (
                  <SupplierCard key={index} supplier={supplier} index={index} />
                ))}
              </AnimatePresence>
            </div>

          </motion.div>

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
                onClick={() => setPage(safeMeta.page - 1)}
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
                onClick={() => setPage(safeMeta.page + 1)}
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