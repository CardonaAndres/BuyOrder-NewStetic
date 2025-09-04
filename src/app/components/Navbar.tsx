import { useState } from 'react';
import { useAuth } from '@/auth/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavHook } from '../hooks/useNavHook';
import { Bell, User, LogOut, Menu, X, Sparkles, Zap, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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

const glowVariants = {
  initial: { opacity: 0, scale: 0.2 },
  animate: { 
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export const Navbar = () => {
  const { user, logout, isAuth } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, _] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const { isScrolled, mousePosition, navigationItems, profileMenuItems } = useNavHook({ 
    path: useLocation().pathname 
  });

  return (
    <>
      {/* Elementos decorativos flotantes mejorados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          className="absolute top-20 right-10 w-8 h-8"
        >
          <Sparkles className="w-full h-full text-teal-400/20" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          className="absolute top-40 left-20 w-6 h-6"
        >
          <div className="w-full h-full bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-full blur-xl" />
        </motion.div>
      </div>

      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/30' 
            : 'bg-white/70 backdrop-blur-lg'
        }`}
      >
        {/* Gradiente decorativo superior */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo y Brand mejorado */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {/* Glow effect */}
                  <motion.div
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-teal-400/30 rounded-full blur-xl"
                  />
                  <img src='/imgs/logos/LOGO_NS_SINFONDO.png' alt="New Stetic" className="w-10 h-10 relative z-10" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                />
              </motion.div>
              <div className="hidden sm:block">
                <motion.h1 
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 drop-shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  New Stetic
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-900 drop-shadow-lg font-medium"
                >
                  BuyOrder System
                </motion.p>
              </div>
            </motion.div>

            {/* Navegación Desktop mejorada */}
            <motion.div 
              variants={itemVariants}
              className="hidden md:flex items-center space-x-2"
            >
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2.5 group ${
                    item.active 
                      ? 'bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50 text-teal-700 shadow-lg shadow-teal-200/50 border border-teal-200/50' 
                      : 'hover:bg-white/80 text-gray-600 hover:text-teal-600 hover:shadow-md'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: hoveredItem === index ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className={`w-4 h-4 ${item.active ? 'text-teal-600' : 'group-hover:text-teal-500'}`} />
                  </motion.div>
                  <span className="text-sm font-medium">{item.name}</span>
                  
                  {item.active && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-teal-500/10 rounded-xl border border-teal-300/30"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </>
                  )}
                </motion.a>
              ))}
            </motion.div>

            {/* Acciones del usuario mejoradas */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              {/* Badge de estado mejorado */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50"
              >
                {isAuth ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4 text-yellow-500" />
                    </motion.div>
                    <span className="text-xs font-semibold text-gray-800">Conectado</span>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                    />
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Zap className="w-4 h-4 text-red-500" />
                    </motion.div>
                    <span className="text-xs font-semibold text-gray-800">
                      Inicia sesión nuevamente
                    </span>
                    <motion.div 
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                    />
                  </>
                )}
              </motion.div>

              {/* Notificaciones mejoradas */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
                {notifications > 0 && (
                  <>
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-red-500/50"
                    >
                      {notifications}
                    </motion.span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75" />
                  </>
                )}
              </motion.button>

              {/* Perfil de usuario mejorado */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 p-2 pr-3 bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50 rounded-2xl shadow-lg border border-teal-200/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <motion.div 
                    className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-inner"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="hidden sm:block text-sm font-semibold text-teal-700">
                    {user?.displayName || 'Usuario'}
                  </span>
                  <motion.div
                    animate={{ rotate: showProfileMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-teal-600" />
                  </motion.div>
                </motion.button>

                {/* Menú de perfil mejorado */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {user?.mail}</p>
                      </div>
                      
                      <div className="py-2">
                        {profileMenuItems.map((item, index) => (
                          <motion.button
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={item.action}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left group"
                          >
                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
                            <span className="group-hover:text-teal-600 transition-colors">{item.name}</span>
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2 pb-2">
                        <motion.button 
                          whileHover={{ x: 5 }}
                          onClick={logout} 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all w-full text-left group"
                        >
                          <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                          <span className="font-medium">Cerrar Sesión</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón menú móvil mejorado */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <X className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-600" />
                  )}
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Menú móvil mejorado */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      item.active 
                        ? 'bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50 text-teal-700 border border-teal-200/50 shadow-md' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: item.active ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className={`w-5 h-5 ${item.active ? 'text-teal-600' : ''}`} />
                    </motion.div>
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
                
                <div className="border-t border-gray-200/50 pt-3 mt-3">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition-all w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay para cerrar menús con blur */}
      <AnimatePresence>
        {(showProfileMenu || isOpen) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" 
            onClick={() => {
              setShowProfileMenu(false);
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};