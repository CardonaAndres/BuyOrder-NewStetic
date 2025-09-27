import { AlertTriangle, } from "lucide-react";

export const AccessDeniedScreen = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-900 via-teal-700 to-teal-600 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Card container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          {/* Icon container */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center">
              <img src="/imgs/logos/LOGO_NS_SINFONDO.png" alt="LogoDeNS" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-teal-900 mb-3">
            Acceso Denegado
          </h1>

          {/* Subtitle */}
          <p className="text-teal-700 text-lg mb-6 leading-relaxed">
            No tienes permisos para acceder a este contenido
          </p>

          {/* Description */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-teal-800 text-sm">
              Tu token de acceso no es válido o ha expirado. Por favor, verifica tus credenciales o contacta al administrador.
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-white/70 text-center text-sm mt-6">
          Si crees que esto es un error, contacta al soporte técnico
        </p>
      </div>
    </div>
  );
};
