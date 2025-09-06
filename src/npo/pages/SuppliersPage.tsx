import { Navbar } from '@/app/components/Navbar'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { Header } from '../components/suppliers/Header';
import type { BasicFiltersType } from '../assets/ts/types'
import { useSuppliersHook } from '../hooks/useSuppliersHook';

export const SuppliersPage = () => {
  const { loading, getAllSuppliers, meta } = useSuppliersHook();
  
  const [currentFilters, setCurrentFilters] = useState<BasicFiltersType | null>(null);
  const [filters, setFilters] = useState<BasicFiltersType>({
    page: 1,
    limit: 15,
    value: '',
  });
  
    const validateFilters = (): boolean => {
      if (!filters.value || (filters.value && filters.value.trim() === '')) {
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
    console.log('Funcion de busqueda')
    // funcion de busqueda
  };
  
  const handleRefresh = async () => {
    currentFilters ? console.log('Funcion de busqueda') : await getAllSuppliers(meta?.page || 1, meta?.limit || 15);
    toast.success('Datos actualizados');
  };
  

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50/15 pt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Header
            filters={filters}
            loading={loading}
            handleRefresh={handleRefresh}
            handleSearch={handleSearch}
            setFilters={setFilters}
          />

        </div>
      </main>
    </>
  )
}

