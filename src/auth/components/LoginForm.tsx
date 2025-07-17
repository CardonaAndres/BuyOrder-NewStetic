import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle, X } from 'lucide-react';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose } : LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, formState: { errors, isValid }, watch, handleSubmit } = useForm<LoginFormData>({
    mode: 'onChange'
  });

  const onSubmited = handleSubmit(async (_: LoginFormData) => {
    setIsSubmitting(true);
 
    setIsSubmitting(false);
  });

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

  const watchedFields = watch();

  return (
    <div className="relative overflow-hidden flex items-center justify-center p-4 border-0">
      <motion.div variants={containerVariants} initial="hidden" animate="visible"
        className="relative z-10 w-full max-w-2xl" >
        <motion.div variants={itemVariants}  className="rounded-3xl shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">

          <div className="p-8 pb-4">
            <X className='text-gray-600' onClick={onClose} />
            <div className="flex items-center justify-center mb-6">
              <motion.div 
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="/imgs/logos/LOGO_NS_SINFONDO.png" 
                    alt="New Stetic Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 drop-shadow-lg mb-2">
                Iniciar Sesión
              </h1>
              <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-900 drop-shadow-lg">
                BuyOrder System
              </p>
            </div>
          </div>

          <form className="px-8 pb-8" onSubmit={onSubmited}>
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`w-5 h-5 ${errors.username ? 'text-red-500' : watchedFields.username ? 'text-teal-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    {...register('username', { 
                      required: 'El usuario es requerido',
                      // minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                    })}
                    type="text"
                    placeholder="Ingresa tu usuario"
                    className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                      errors.username 
                        ? 'border-red-300 focus:border-red-500' 
                        : watchedFields.username 
                        ? 'border-teal-300 focus:border-teal-500' 
                        : 'border-gray-200 focus:border-teal-400'
                    }`}
                  />
                  {errors.username && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-3 top-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </motion.div>
                  )}
                </div>
                {errors.username && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.username.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 ${errors.password ? 'text-red-500' : watchedFields.password ? 'text-teal-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    {...register('password', { 
                      required: 'La contraseña es requerida',
                      // minLength: { value: 4, message: 'Mínimo 6 caracteres' }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingresa tu contraseña"
                    className={`w-full pl-10 pr-12 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500' 
                        : watchedFields.password 
                        ? 'border-teal-300 focus:border-teal-500' 
                        : 'border-gray-200 focus:border-teal-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-teal-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-12 top-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </motion.div>
                  )}
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  whileHover={{ scale: isValid ? 1.02 : 1 }}
                  whileTap={{ scale: isValid ? 0.98 : 1 }}
                  className={`w-full relative px-6 py-4 font-semibold rounded-xl shadow-xl transition-all duration-200 overflow-hidden group ${
                    isValid && !isSubmitting
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-2xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Iniciar Sesión
                      </>
                    )}
                  </span>
                  {isValid && !isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </motion.div>
            </div>
          </form>

        </motion.div>
      </motion.div>
    </div>
  );
}