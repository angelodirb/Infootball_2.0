'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Aquí iría la lógica de recuperación de contraseña con tu backend
    console.log('Password reset request for:', email);
    
    // Simulamos una llamada a la API
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center px-4">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(34,197,94,0.05),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.05),transparent)]"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            InFootball
          </h1>
          <p className="text-gray-400 text-sm mt-2">Recupera tu acceso</p>
        </Link>

        {/* Card del formulario */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-2xl p-8 border border-gray-800">
          
          {!isEmailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-4 shadow-lg">
                  <Mail size={32} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-bold mb-2">¿Olvidaste tu contraseña?</h2>
                <p className="text-gray-400">No te preocupes, te ayudaremos a recuperarla</p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={20} className="text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Te enviaremos un enlace para restablecer tu contraseña
                  </p>
                </div>

                {/* Botón de submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-green-500/50 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar enlace de recuperación'
                  )}
                </button>
              </form>

              {/* Link para volver */}
              <div className="mt-6 text-center">
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span>Volver a iniciar sesión</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Mensaje de éxito */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg shadow-green-500/50">
                  <CheckCircle size={40} className="text-black" />
                </div>
                <h2 className="text-3xl font-bold mb-2">¡Correo enviado!</h2>
                <p className="text-gray-400 mb-6">
                  Hemos enviado un enlace de recuperación a:
                </p>
                <p className="text-green-400 font-semibold text-lg mb-8">{email}</p>
                
                <div className="bg-gray-800/50 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-300">
                    Revisa tu bandeja de entrada y sigue las instrucciones del correo. 
                    Si no lo ves, revisa tu carpeta de spam.
                  </p>
                </div>

                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  Volver a iniciar sesión
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Información adicional */}
        {!isEmailSent && (
          <div className="mt-8 bg-gray-800/30 rounded-xl p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-green-400">💡</span>
              Consejos de seguridad
            </h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Usa una contraseña única para InFootball</li>
              <li>• Combina letras, números y símbolos</li>
              <li>• Mínimo 8 caracteres de longitud</li>
              <li>• No compartas tu contraseña con nadie</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}