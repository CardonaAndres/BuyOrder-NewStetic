import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '@/auth/contexts/AuthContext';

export const Navbar = () => {
  const {user, logout, isAuth} = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Detectar scroll para cambiar apariencia
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse para efectos parallax
  useEffect(() => {
    const handleMouseMove = (e : { clientX: number, clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigationItems = [
    { name: 'Seguimiento - OCN', icon: Home, href: '/', active: true },
  ];

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
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
      {/* Elemento decorativo flotante */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          className="absolute top-20 right-10 w-8 h-8"
        >
          <Sparkles className="w-full h-full text-teal-400/10" />
        </motion.div>
      </div>

      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo y Brand */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src='/imgs/logos/LOGO_NS_SINFONDO.png' alt="New Stetic" className="w-full h-full" />
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 drop-shadow-lg">
                  New Stetic
                </h1>
                <p className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-900 drop-shadow-lg">
                  BuyOrder System
                </p>
              </div>
            </motion.div>

            {/* Navegación Desktop */}
            <motion.div 
              variants={itemVariants}
              className="hidden md:flex items-center space-x-1"
            >
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 group ${
                    item.active 
                      ? 'bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 shadow-md border border-teal-200' 
                      : 'hover:bg-white/60 text-gray-700 hover:text-teal-600'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${item.active ? 'text-teal-600' : 'group-hover:text-teal-500'}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                            
                  {item.active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-teal-500/10 rounded-xl border border-teal-300/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </motion.div>

            {/* Acciones del usuario */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              {/* Badge de estado */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-teal-200"
              >
                {isAuth ? 
                  <>
                    <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-800">Conectado</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  </> :
                  <>
                    <Zap className="w-3 h-3 text-red-500 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-800">
                      Inicia sesión nuevamente
                    </span>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  </>
                }
                
              </motion.div>

              {/* Notificaciones */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 hover:bg-white/90 transition-all duration-200 group"
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </motion.button>

              {/* Perfil de usuario */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl shadow-md border border-teal-200 hover:from-teal-100 hover:to-teal-200 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-teal-700">
                    {user?.displayName}
                  </span>
                </motion.button>

                {/* Menú de perfil */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 py-2"
                  >
                    <div className="border-t border-gray-200 my-1" />
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Botón menú móvil */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active 
                      ? 'bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 border border-teal-200' 
                      : 'hover:bg-white/60 text-gray-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? 'text-teal-600' : ''}`} />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Overlay para cerrar menús */}
      {(showProfileMenu || isOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowProfileMenu(false);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};