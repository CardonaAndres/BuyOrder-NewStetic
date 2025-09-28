import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { useSuppliersMessagesHook } from "../hooks/useSuppliersMessagesHook";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { MessageCircle } from "lucide-react";
import { LimitSelector } from "../components/supplersMessages/LimitSelector";
import { SearchBar } from "../components/supplersMessages/SearchBar";
import { EmptyState } from "../components/supplersMessages/EmptyState";
import { MessageCard } from "../components/supplersMessages/MessageCard";
import { Pagination } from "../components/supplersMessages/Pagination";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05
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

export const SuppliersMessages = () => {
  const { loading, getSuppliersMessages, meta, supplierMessages } = useSuppliersMessagesHook();

  const [searchTerm, setSearchTerm] = useState(() => {
    const saved = sessionStorage.getItem('suppliersMessages_searchTerm');
    return saved || '';
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('suppliersMessages_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const saved = sessionStorage.getItem('limit_page_suppliersMessages');
    return saved ? parseInt(saved, 10) : 10;
  });

  const [showLimitSelector, setShowLimitSelector] = useState(false);

  // Debounce aumentado a 1 segundo
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 1000); // 1 segundo de debounce

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => { 
    sessionStorage.setItem('suppliersMessages_page', page.toString()); 
  }, [page]);

  useEffect(() => { 
    sessionStorage.setItem('suppliersMessages_searchTerm', searchTerm); 
  }, [searchTerm]);

  useEffect(() => { 
    sessionStorage.setItem('limit_page_suppliersMessages', limit.toString()); 
  }, [limit]);

  // Solo hacer la consulta si no estamos en búsqueda activa
  useEffect(() => {
    if (!isSearching) {
      getSuppliersMessages(page, limit, debouncedSearchTerm);
    }
  }, [page, limit, debouncedSearchTerm, isSearching]);

  // Reset página cuando cambia el término de búsqueda
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm && searchTerm !== '') setPage(1);
  }, [debouncedSearchTerm, searchTerm]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setShowLimitSelector(false);
    if (showLimitSelector) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLimitSelector]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setShowLimitSelector(false);
  };

  // Mostrar loading solo en carga inicial, no durante búsquedas
  if (loading && !searchTerm && !debouncedSearchTerm) return <LoadingScreen />

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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header horizontal */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                      Mensajes de Proveedores
                    </h1>
                    <p className="text-slate-600 font-medium text-sm">
                      Comentarios y observaciones en items de órdenes de compra
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal-700">{meta?.total || 0}</div>
                      <div className="text-xs text-slate-500">Total</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-700">{meta?.totalPages || 0}</div>
                      <div className="text-xs text-slate-500">Páginas</div>
                    </div>
                  </div>

                  <LimitSelector
                    limit={limit}
                    onLimitChange={handleLimitChange}
                    showSelector={showLimitSelector}
                    onToggleSelector={() => setShowLimitSelector(!showLimitSelector)}
                    totalRecords={meta?.total || 0}
                  />
                </div>
              </div>
              <div className="mt-4 h-px bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 rounded-full opacity-40"></div>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchResultCount={meta?.total}
              isSearching={isSearching}
            />
          </motion.div>

          {/* Messages list */}
          <motion.div variants={itemVariants}>
            {!supplierMessages || supplierMessages.length === 0 ? (
              <EmptyState
                hasSearchTerm={!!searchTerm}
                onClearSearch={() => setSearchTerm("")}
              />
            ) : (
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {supplierMessages.map((message, index) => (
                    <MessageCard
                      key={message.item_comentario_id}
                      message={message}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <Pagination
            currentPage={page}
            totalPages={meta?.totalPages || 0}
            onPageChange={setPage}
          />

          {/* Footer stats */}
          {supplierMessages && supplierMessages.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-sm border border-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-600">
                    Mostrando <span className="font-semibold text-teal-700">{supplierMessages.length}</span> mensaje{supplierMessages.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {searchTerm && (
                  <>
                    <div className="w-px h-4 bg-slate-300" />
                    <span className="text-sm text-slate-500">
                      de <span className="font-semibold">{meta?.total || 0}</span> totales
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.main>
    </>
  );
};