import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { useNavigate } from "react-router-dom";
import type { AdminOption } from "../assets/ts/types";
import { Users, Shield, Mail, MessageCircle } from "lucide-react";
import { router } from "@/app/configs/config";

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

const cardVariants = {
  initial: { y: 30, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20
    }
  }
};

export const AdminPage = () => {
  const navigate = useNavigate();

  const adminOptions: AdminOption[] = [
    {
      id: "user-management",
      title: "Gestión de Usuarios",
      description: "Administrar usuarios y permisos de acceso al sistema",
      icon: Users,
      route: router.adminUserPage,
      color: {
        primary: "text-teal-600",
        secondary: "text-teal-500",
        bg: "bg-teal-50",
        border: "border-teal-200"
      },
      isActive: true
    },
    {
      id: "email-logs",
      title: "Logs de Correos",
      description: "Monitoreo y gestión de envíos de correos electrónicos",
      icon: Mail,
      route: router.emailChek,
      color: {
        primary: "text-orange-600",
        secondary: "text-orange-500",
        bg: "bg-orange-50",
        border: "border-orange-200"
      },
      isActive: true
    },
    {
      id: "types-messages",
      title: "Catálogo de Mensajes",
      description: "Administra los tipos de mensajes que estarán disponibles para los proveedores en el sistema.",
      icon: MessageCircle,
      route: router.adminMessagesManager,
      color: {
        primary: "text-red-600",
        secondary: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-200"
      },
      isActive: true
    },
  ];

  const handleOptionClick = (option: AdminOption) => {
    if (option.isActive) navigate(option.route);
  };

  return (
    <>
      <Navbar />
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/40 relative overflow-hidden mt-12"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-teal-300/10 via-teal-200/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-yellow-300/10 via-yellow-200/5 to-transparent rounded-full blur-3xl" />
          
          {/* Floating decorative elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-br from-teal-400/15 to-yellow-400/15 rounded-2xl backdrop-blur-3xl"
          />
          
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -15, 0],
              rotate: [0, -45, -90]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-16 w-8 h-8 bg-gradient-to-tr from-yellow-300/20 to-teal-300/20 rounded-full backdrop-blur-2xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="mb-10"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                    Panel de Administración
                  </h1>
                  <p className="text-slate-600 font-medium">
                    Gestiona y configura todas las opciones del sistema
                  </p>
                </div>
              </div>
              <div className="mt-6 h-1 bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-50"></div>
            </div>
          </motion.div>

          {/* Admin Options Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {adminOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.id}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(option)}
                  className={`relative group cursor-pointer ${
                    !option.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-white/80">
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 rounded-full ${
                        option.isActive 
                          ? 'bg-green-400 animate-pulse' 
                          : 'bg-slate-300'
                      }`} />
                    </div>

                    {/* Icon container */}
                    <div className={`w-16 h-16 rounded-2xl ${option.color.bg} ${option.color.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`w-8 h-8 ${option.color.primary}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-800">
                        {option.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {option.description}
                      </p>
                      
                      {/* Action indicator */}
                      <div className="pt-2">
                        {option.isActive ? (
                          <div className="flex items-center gap-2 text-xs font-medium text-teal-600">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                            Disponible
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            Próximamente
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </motion.main>
    </>
  );
};