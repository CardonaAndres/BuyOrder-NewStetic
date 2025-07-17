import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LoginModal } from '@/auth/components/LoginModal';
import { 
  Package, 
  Building2, 
  TrendingUp, 
  Bell, 
  Shield, 
  Sparkles, 
  Star, 
  Zap, 
  ArrowRight, 
  Calendar 
} from 'lucide-react';

export const Hero = () => {
  const [ modalLogin, setModalLogin ] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dayWeek = new Intl.DateTimeFormat('es-ES', { weekday: 'long' })
    .format(new Date()).replace(/^\w/, (c) => c.toUpperCase());

  const handleLoginModal = () => setModalLogin(!modalLogin);

  // Imágenes de fondo del carrusel
  const backgroundImages = [
    "/imgs/background/Background_Fondo_NS.webp",
    "/imgs/background/Background_Fondo_NS2.webp",
    "/imgs/background/Background_Fondo_NS3.webp",
    "/imgs/background/Background_Fondo_NS4.webp",
  ];

  // Cambiar imagen cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: { clientX : number, clientY : number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: currentImageIndex === index ? 0.8 : 0,
              scale: currentImageIndex === index ? 1 : 1.1
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: 360,
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
          className="absolute top-1/4 right-1/4 w-32 h-32"
        >
          <Package className="w-full h-full text-yellow-400/20" />
        </motion.div>

        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 w-20 h-20"
        >
          <Sparkles className="w-full h-full text-red-400/20" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-10"
        >
          <Star className="w-12 h-12 text-teal-400/30" />
        </motion.div>
      </div>

      {/* Card Principal Full Screen */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-8xl h-[calc(100vh-2rem)] min-h-[600px]"
      >
        <motion.div variants={itemVariants} className="relative rounded-3xl shadow-2xl overflow-hidden border border-white/20 h-full"
        >
          {/* Decoración superior animada */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-red-500 to-yellow-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Header interno de la card */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img src='/imgs/logos/LOGO_NS_SINFONDO.png' />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 drop-shadow-lg">New Stetic</h1>
                <p className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-900 drop-shadow-lg">BuyOrder System</p>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="grid lg:grid-cols-5 gap-8 p-10 pt-24 h-full">
            {/* Sección Izquierda - Información Principal */}
            <div className="lg:col-span-3 space-y-6 flex flex-col justify-center">
              {/* Badge animado */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-teal-200 w-fit"
              >
                <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-800">BuyOrder Funcionando</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </motion.div>

              {/* Título Principal */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold flex gap-5">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-lg">
                    BuyOrder
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 drop-shadow-lg text-2xl lg:text-3xl mt-2">
                    New Stetic
                  </span>
                </h1>
                
                <motion.p 
                  className="text-xl text-gray-700 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Sistema integral de gestión de órdenes de compra diseñado específicamente para 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 drop-shadow-lg font-semibold"> New Stetic</span>, 
                  optimizando procesos y mejorando la eficiencia operativa.
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
                variants={containerVariants}
              >
                {[
                  { 
                    icon: Bell, 
                    title: "Recordatorios", 
                    desc: "Martes y Jueves",
                    color: "from-teal-500 to-teal-600",
                    bgColor: "bg-teal-50",
                    iconColor: "text-teal-600"
                  },
                  { 
                    icon: Shield, 
                    title: "Seguimiento", 
                    desc: "Tiempo Real",
                    color: "from-yellow-500 to-yellow-600",
                    bgColor: "bg-yellow-50",
                    iconColor: "text-yellow-600"
                  },
                  { 
                    icon: TrendingUp, 
                    title: "Reportes", 
                    desc: "Análisis Inteligente",
                    color: "from-red-500 to-red-600",
                    bgColor: "bg-red-50",
                    iconColor: "text-red-600"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                    
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sección Derecha - Info Destacada */}
            <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
              {/* Card de Estado */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-50 to-teal-100/50 backdrop-blur-sm rounded-2xl p-6 border border-teal-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">New Stetic</h3>
                    <p className="text-sm text-teal-600">70+ años de experiencia</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">
                  Más de 70 años de experiencia, especializada en productos odontológicos, ahora optimizando sus procesos de compra con BuyOrder.
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>Antioquia, Colombia</span>
                  </div>
                </div>
              </motion.div>

              {/* Mensaje del día */}
              <motion.div
                variants={itemVariants}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-br from-red-50 to-yellow-50 backdrop-blur-sm rounded-2xl p-5 border border-red-200"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Hoy es {dayWeek}
                    </p>
                    <p className="text-xs text-gray-600">
                      Aprovechemos cada minuto
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.button onClick={handleLoginModal}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Iniciar Sesión
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Footer de la card */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 px-10 py-4 bg-white/50 backdrop-blur-sm border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center justify-center text-xs text-teal-400">
              <span>BuyOrder © 2025 - New Stetic</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <LoginModal onClose={handleLoginModal} open={modalLogin} />
    </div>
  );
}