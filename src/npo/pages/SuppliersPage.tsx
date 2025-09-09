import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/app/components/Navbar'
import { toast } from 'react-toastify';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { Header } from '../components/suppliers/Header';
import { useSuppliersHook } from '../hooks/useSuppliersHook';
import { Users2 } from 'lucide-react';

export const SuppliersPage = () => {
  const { loading, getAllSuppliers, meta } = useSuppliersHook();
  const [searchTerm, setSearchTerm] = useState(() => {
    const saved = sessionStorage.getItem('supplier_searchTerm');
    return saved || '';
  });

  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('supplier_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value && page !== 1) setPage(1);
  };

  const handleSearch = () => {
    console.log("Busqueda busqueda busqueda")
  }

  const safeMeta = meta || { page: 1, limit: 15, total: 0, totalPages: 1 };
  
  const handleRefresh = async () => {
    window.location.reload();
    toast.success('Datos actualizados');
  };

  useEffect(() => { sessionStorage.setItem('supplier_page', page.toString()); }, [page]);
  useEffect(() => { sessionStorage.setItem('supplier_searchTerm', searchTerm); }, [searchTerm]);
  
  useEffect(() => {

    searchTerm.trim() 
    ? "" 
    : getAllSuppliers(page);

  }, [page]);

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

        </div>
      </main>
    </>
  )
}

