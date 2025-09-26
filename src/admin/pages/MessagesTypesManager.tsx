import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useManagerTypeMessages } from "../hooks/useManagerTypeMessages";
import { MessageCard } from "../components/messages/MessageCard";
import { MessageSquare, Plus } from "lucide-react";
import { Header } from "../components/messages/Header";

export const MessagesTypesManager = () => {
  const { messages, loading, getMessagesTypes } = useManagerTypeMessages();

  useEffect(() => {
    getMessagesTypes();
  }, []);

  if (loading) return <LoadingScreen />;

  const activeMessages = messages?.filter(msg => msg.estado === 'Activo') || [];
  const inactiveMessages = messages?.filter(msg => msg.estado === 'Inactivo') || [];

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

  return (
    <>
      <Navbar />
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen relative overflow-hidden mt-15"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-teal-300/10 via-teal-200/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-yellow-300/10 via-yellow-200/5 to-transparent rounded-full blur-3xl" />
          
          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 90, 180],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-32 right-24 w-8 h-8 bg-gradient-to-br from-teal-400/20 to-yellow-400/20 rounded-lg backdrop-blur-2xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <Header 
            activeMessages={activeMessages} 
            inactiveMessages={inactiveMessages} 
          />

          {/* Content */}
          {!messages || messages.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <MessageSquare className="w-12 h-12 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">
                No hay tipos de mensajes configurados
              </h3>
              <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed mb-8">
                Crea el primer tipo de mensaje que los proveedores podrán usar para comentar sus órdenes de compra.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 inline-block mr-2" />
                Crear Primer Mensaje
              </motion.button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Active Messages */}
              {activeMessages.length > 0 && (
                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <h2 className="text-xl font-bold text-slate-800">
                        Mensajes Activos ({activeMessages.length})
                      </h2>
                    </div>
                    <p className="text-sm text-slate-600">
                      Mensajes disponibles para que los proveedores seleccionen al comentar sus órdenes
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeMessages.map((message) => (
                      <MessageCard key={message.mensaje_id} message={message} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Inactive Messages */}
              {inactiveMessages.length > 0 && (
                <motion.div variants={itemVariants}>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                      <h2 className="text-xl font-bold text-slate-800">
                        Mensajes Inactivos ({inactiveMessages.length})
                      </h2>
                    </div>
                    <p className="text-sm text-slate-600">
                      Mensajes desactivados, no visibles para los proveedores
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inactiveMessages.map((message) => (
                      <MessageCard key={message.mensaje_id} message={message}  />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Summary Footer */}
          {messages && messages.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-sm border border-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-600">
                    <span className="font-semibold text-teal-700">
                      {messages.length}
                    </span> tipo{messages.length !== 1 ? 's' : ''} de mensaje{messages.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-px h-4 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm text-slate-500">
                    {activeMessages.length} disponible{activeMessages.length !== 1 ? 's' : ''} para proveedores
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.main>
    </>
  );
};