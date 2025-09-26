
// components/EmailCheck/EmailLogCard.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { useEmailCheckHook } from "../hooks/useEmailCheckHook";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { Pagination } from "../components/email/Pagination";
import { EmailCheckHeader } from "../components/email/EmailCheckHeader";
import { EmailLogsList } from "../components/email/EmailLogsList";

export const EmailCheck = () => {
  const { loading, logs, getEmailLogs, meta } = useEmailCheckHook();
  
  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem('emailCheck_page');
    return savedPage ? parseInt(savedPage) : 1;
  });
  
  const [limit, setLimit] = useState(() => {
    const savedLimit = sessionStorage.getItem('emailCheck_limit');
    return savedLimit ? parseInt(savedLimit) : 15;
  });

  const [showLimitSelector, setShowLimitSelector] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowLimitSelector(false);
    if (showLimitSelector) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLimitSelector]);

  useEffect(() => {
    sessionStorage.setItem('emailCheck_page', page.toString());
    sessionStorage.setItem('emailCheck_limit', limit.toString());
    getEmailLogs(page, limit);
  }, [page, limit]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setShowLimitSelector(false);
  };

  if (loading) return <LoadingScreen />;

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
          <motion.div variants={itemVariants} className="mb-8">
            <EmailCheckHeader
              totalLogs={meta?.totalLogs || 0}
              totalPages={meta?.totalPages || 0}
              limit={limit}
              onLimitChange={handleLimitChange}
              showLimitSelector={showLimitSelector}
              onToggleLimitSelector={() => setShowLimitSelector(!showLimitSelector)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EmailLogsList logs={logs || []} />
          </motion.div>

          <Pagination
            currentPage={page}
            totalPages={meta?.totalPages || 0}
            onPageChange={setPage}
          />
        </div>
      </motion.main>
    </>
  );
};