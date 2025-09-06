import { Link } from "react-router-dom";
import { router } from "@/app/configs/config";
import { AnimatePresence, motion } from "framer-motion";
import type { NpoFiltersType, Time } from "../../assets/ts/types";
import { 
  Search, 
  Filter, 
  Calendar,
  Clock,
  ChevronDown,
  X,
  RefreshCw,
  AlertCircle,
  Users2,
} from 'lucide-react';

interface Props {
    currentFilters: NpoFiltersType | null;
    loading: boolean;
    showFilters: boolean;
    filters: NpoFiltersType;
    handleRefresh: () => void;
    setShowFilters: (showFilters: boolean) => void;
    setFilters: (filters: NpoFiltersType) => void;
    handleSearch: () => void;
    handleClearFilters: () => void;
}

export const Header = ({ 
    currentFilters, 
    loading, 
    handleRefresh, 
    setShowFilters,
    showFilters,
    filters,
    setFilters,
    handleSearch,
    handleClearFilters
} : Props) => {
  return (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
        >
        <div className="flex items-center justify-between mb-6">
            <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700">
                Órdenes de Compra Nacionales
            </h1>
            <p className="text-gray-600 mt-2">
                Gestión y seguimiento de órdenes pendientes
                {currentFilters && (
                <span className="inline-flex items-center gap-1 ml-3 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    <Filter className="w-3 h-3" />
                    Filtros aplicados
                </span>
                )}
            </p>
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
                <Link to={router.suppliers} className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500/90 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-300/50 hover:shadow-xl transition-all disabled:opacity-50"
                >
                    <Users2 className={`w-4 h-4`} />
                    <span className="font-medium">Proveedores</span>
                </Link>
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
                <h2 className="text-lg font-semibold text-gray-800">Filtros de Búsqueda</h2>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-1.5 text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
            >
                <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                >
                <ChevronDown className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">
                {showFilters ? 'Ocultar' : 'Mostrar'} filtros
                </span>
            </motion.button>
            </div>

            {/* Búsqueda rápida */}
            <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                type="text"
                placeholder="Buscar por proveedor o código..."
                value={filters.value}
                onChange={(e) => setFilters({...filters, value: e.target.value})}
                onKeyDown={(e) => {if (e.key === 'Enter') handleSearch() }}
                className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-medium shadow-lg transition-all disabled:opacity-50"
            >
                {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                'Buscar'
                )}
            </motion.button>
            </div>

            {/* Filtros avanzados */}
            <AnimatePresence>
            {showFilters && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200/50"
                >
                {/* Filtro de fecha de orden */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha de Orden
                    </label>
                    <input
                    type="date"
                    value={filters.orderDate}
                    onChange={(e) => setFilters({...filters, orderDate: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo Fecha Orden</label>
                    <select
                    value={filters.orderDateType}
                    onChange={(e) => setFilters({...filters, orderDateType: e.target.value as Time})}
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                    <option value="after">Después de</option>
                    <option value="before">Antes de</option>
                    </select>
                </div>

                {/* Filtro de fecha de entrega */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Fecha de Entrega
                    </label>
                    <input
                    type="date"
                    value={filters.arrivalDate}
                    onChange={(e) => setFilters({...filters, arrivalDate: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo Fecha Entrega</label>
                    <select
                    value={filters.arrivalDateType}
                    onChange={(e) => setFilters({...filters, arrivalDateType: e.target.value as Time})}
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                    <option value="after">Después de</option>
                    <option value="before">Antes de</option>
                    </select>
                </div>

                {/* Acciones de filtros */}
                <div className="md:col-span-2 lg:col-span-4 flex gap-3 pt-4 border-t border-gray-200/15">
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                    >
                    <X className="w-4 h-4" />
                    <span>Limpiar filtros</span>
                    </motion.button>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>Las fechas requieren especificar el tipo (antes/después)</span>
                    </div>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
        </motion.div>
  )
}
