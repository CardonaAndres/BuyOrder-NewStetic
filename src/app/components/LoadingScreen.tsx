import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  Sparkles,
  Zap,
  Activity,
  CheckCircle
} from 'lucide-react';

export const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    "Inicializando sistema...",
    "Cargando configuración...",
    "Conectando con servidor...",
    "Verificando credenciales...",
    "Preparando interfaz...",
    "¡Listo!"
  ];

  // Simulación de progreso de carga
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Actualizar paso actual basado en progreso
  useEffect(() => {
    const step = Math.floor((loadingProgress / 100) * (loadingSteps.length - 1));
    setCurrentStep(step);
  }, [loadingProgress]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 bg-gradient-to-br from-white via-gray-50 to-teal-50/30 flex items-center justify-center overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Partículas flotantes */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-20 w-12 h-12"
          >
            <Sparkles className="w-full h-full text-teal-400/30" />
          </motion.div>
          
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [360, 180, 0],
              scale: [1, 0.7, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-60 left-16 w-8 h-8"
          >
            <div className="w-full h-full bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-full blur-xl" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-32 right-32 w-6 h-6"
          >
            <Zap className="w-full h-full text-yellow-400/25" />
          </motion.div>

          {/* Gradientes decorativos */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-red-200/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          
          {/* Logo animado */}
          <motion.div 
            variants={logoVariants}
            className="relative mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              {/* Efecto glow */}
              <motion.div
                variants={glowVariants}
                animate="animate"
                className="absolute inset-0 bg-teal-400/40 rounded-full blur-2xl"
              />
              
              {/* Anillos giratorios */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-teal-300/50 rounded-full border-dashed"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-red-300/50 rounded-full"
              />

              {/* Logo principal */}
              <div className="absolute inset-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center border border-gray-200/50">
                <img 
                  src='/imgs/logos/LOGO_NS_SINFONDO.png' 
                  alt="New Stetic" 
                  className="w-8 h-8"
                />
              </div>
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            variants={itemVariants}
            className="mb-2"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 drop-shadow-lg">
              New Stetic
            </h1>
            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-900 font-medium mt-1">
              BuyOrder System
            </p>
          </motion.div>

          {/* Paso actual */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                {isComplete ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Activity className="w-5 h-5 text-teal-500" />
                )}
              </motion.div>
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-700 font-medium"
              >
                {loadingSteps[currentStep]}
              </motion.span>
            </div>
          </motion.div>

          {/* Barra de progreso */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <div className="relative">
              {/* Contenedor de la barra */}
              <div className="w-full h-3 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-200/30">
                {/* Barra de progreso */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full relative overflow-hidden"
                >
                  {/* Efecto brillante */}
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                </motion.div>
              </div>
              
              {/* Porcentaje */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-gray-200/50">
                  <span className="text-sm font-bold text-teal-600">
                    {Math.round(loadingProgress)}%
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Indicadores de conexión */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
              />
              <span className="text-xs font-semibold text-gray-700">
                Sistema
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <Zap className="w-3 h-3 text-yellow-500" />
              </motion.div>
              <span className="text-xs font-semibold text-gray-700">
                Cargando
              </span>
            </div>
          </motion.div>

          {/* Mensaje de carga completada */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-2xl border border-green-200/50 shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </motion.div>
                  <span className="text-green-700 font-semibold">
                    ¡Sistema listo! Redirigiendo...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulsos decorativos en las esquinas */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-xl"
        />
        
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-red-400/10 to-transparent rounded-full blur-xl"
        />
      </motion.div>
    </AnimatePresence>
  );
};