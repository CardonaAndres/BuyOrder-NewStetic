import { motion } from "framer-motion";
import { Search, Filter, RefreshCw, ChevronDown } from 'lucide-react';

interface Props {
    loading: boolean;
    handleRefresh: () => void;
    handleSearchChange: (value: string) => void;
    handleSearch: () => void;
    limit: number;
    handleLimitChange: (newLimit: number) => void;
}

const limitOptions = [10, 20, 50, 100];

export const Header = ({ 
    loading, 
    handleRefresh, 
    handleSearchChange, 
    handleSearch, 
    limit, 
    handleLimitChange 
} : Props) => {

  const defaultValue = sessionStorage.getItem('supplier_searchTerm') || '';

  return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700">
                    Nuestros proveedores
                </h1>
                </div>
                
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRefresh}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="font-medium">Actualizar</span>
                    </motion.button>
                </div>
            </div>

            {/* Panel de filtros */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-teal-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Búsqueda y Filtros</h2>
                    </div>
                    
                    {/* Selector de límite */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-medium">Mostrar:</span>
                        <div className="relative">
                            <select
                                value={limit}
                                onChange={(e) => handleLimitChange(Number(e.target.value))}
                                className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer hover:bg-gray-50"
                            >
                                {limitOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option} resultados
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Búsqueda rápida */}
                <div className="flex gap-3 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Buscar por proveedor o código..."
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter') handleSearch() }}
                        defaultValue={defaultValue}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        onClick={handleSearch}
                        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-medium shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                        'Buscar'
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
  )
}