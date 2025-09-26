import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useUsersAllowedHook } from "../hooks/useUsersAllowedHook";
import { SearchControls } from "../components/usersAllowed/SearchControls";
import { UserAllowedCard } from "../components/usersAllowed/UserAllowedCard";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield,
} from "lucide-react";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
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

export const UserAdminPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { loading, getUsersAllowed, users } = useUsersAllowedHook();
  const [filterStatus, setFilterStatus] = useState<'all' | 'Activo' | 'Inactivo'>('all');

  useEffect(() => {
    getUsersAllowed();
  }, []);

  if (loading) return <LoadingScreen />;

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                         user.num_documento.includes(searchValue);
    
    const matchesFilter = filterStatus === 'all' || user.estado === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Estadísticas
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.estado === 'Activo').length;
  const inactiveUsers = users.filter(user => user.estado === 'Inactivo').length;

  return (
    <>
      <Navbar />
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen mt-12"
      >
        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Header principal */}
          <motion.div 
            variants={itemVariants}
            className="mb-10"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Gestión de Usuarios
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Administra los usuarios con acceso al sistema
                  </p>
                </div>
              </div>
              <div className="mt-6 h-1 bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-50"></div>
            </div>
          </motion.div>

          {/* Estadísticas */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                  <p className="text-gray-600">Total usuarios</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
                  <p className="text-gray-600">Usuarios activos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <UserX className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{inactiveUsers}</p>
                  <p className="text-gray-600">Usuarios inactivos</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controles de búsqueda */}
          <SearchControls 
            searchValue={searchValue}
            filterStatus={filterStatus}
            setSearchValue={setSearchValue}
            setFilterStatus={setFilterStatus}
          />

          {/* Lista de usuarios */}
          <motion.div variants={itemVariants}>
            {filteredUsers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No se encontraron usuarios
                </h3>
                <p className="text-gray-500">
                  {searchValue ? "Intenta ajustar tu búsqueda" : "No hay usuarios registrados"}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header de la tabla */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                    <div className="col-span-3">Usuario</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Documento</div>
                    <div className="col-span-2">Estado</div>
                    <div className="col-span-2 text-right">Acciones</div>
                  </div>
                </div>

                {/* Filas de usuarios */}
                <div className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => (
                    <UserAllowedCard key={user.usuario_id} user={user} index={index} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};