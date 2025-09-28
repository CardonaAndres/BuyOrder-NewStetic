import { motion } from "framer-motion";
import { Search, Filter, Package } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchResultCount?: number;
  isSearching?: boolean;
}

export const SearchBar = ({ searchTerm, onSearchChange, searchResultCount, isSearching }: SearchBarProps) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-2">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
              isSearching ? 'text-yellow-500 animate-pulse' : 'text-teal-500'
            }`} />
            <input
              type="text"
              placeholder="Buscar comentarios..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-transparent border-0 rounded-xl focus:outline-none text-slate-700 placeholder:text-slate-400 text-sm"
            />
          </div>
          
          <button className="p-2.5 hover:bg-teal-50 text-teal-600 hover:text-teal-700 rounded-lg transition-all duration-200">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Search results counter */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3"
        >
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            isSearching 
              ? 'bg-yellow-50 text-yellow-700 border-yellow-100' 
              : 'bg-teal-50 text-teal-700 border-teal-100'
          }`}>
            <Package className="w-3 h-3" />
            {isSearching ? 'Buscando...' : `${searchResultCount || 0} resultado${(searchResultCount || 0) !== 1 ? 's' : ''} para "${searchTerm}"`}
          </span>
        </motion.div>
      )}
    </div>
  );
};