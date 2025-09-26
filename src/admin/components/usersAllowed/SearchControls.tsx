import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { UserFormModal } from "./UserFormModal";

interface Props {
    searchValue: string;
    filterStatus: string
    setSearchValue: (value: string) => void;
    setFilterStatus: (value: 'all' | 'Activo' | 'Inactivo') => void;
}

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

export const SearchControls = ({ 
    searchValue, 
    filterStatus, 
    setSearchValue, 
    setFilterStatus 
} : Props) => {

  const [modal, setModal] = useState(false);  
  const handleModal = () => setModal(!modal);

  return (
      <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
      >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Barra de búsqueda */}
              <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                      type="text"
                      placeholder="Buscar usuarios..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
              </div>

              <div className="flex items-center gap-4">
                  {/* Filtro de estado */}
                  <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as 'all' | 'Activo' | 'Inactivo')}
                      className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                      <option value="all">Todos</option>
                      <option value="Activo">Activos</option>
                      <option value="Inactivo">Inactivos</option>
                  </select>

                  {/* Botón agregar */}
                  <button onClick={handleModal} className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200">
                      <Plus className="w-4 h-4" />
                      <span>Agregar usuario</span>
                  </button>
              </div>
          </div>

          <UserFormModal open={modal} onClose={handleModal} />
      </motion.div>
  )
}
