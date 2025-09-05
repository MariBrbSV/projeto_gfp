import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaCog, FaBookOpen } from "react-icons/fa";

export default function Dashboard() {
  const botoes = [
    { id: "home", label: "Início", icon: <FaHome size={18} />, link: "/home" },
    { id: "perfil", label: "Perfil", icon: <FaUserAlt size={18} />, link: "/perfil" },
    { id: "config", label: "Configurações", icon: <FaCog size={18} />, link: "/config" },
    { id: "guia", label: "Guias", icon: <FaBookOpen size={18} />, link: "/guia" },
  ];

  return (
    <div className="ml-5 flex gap-8 min-h-screen pixel-font">
      <div className="w-full">
        {/* Header com GIF + Título */}
        <div className="flex items-center gap-6 mt-4">
          <div className="w-28 h-28 flex items-center justify-center">
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUydTQ5bnVvcDk4bzBudXo3dTN4b292dzE0bTUxMjI2anRpaWVzbGlhZyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/5xRW2cUKfcyQg/source.gif"
              alt="Banner GFP"
              className="pixel-border"
            />
          </div>

          <div>
            <p className="text-5xl font-bold text-[#E8E6E1]">Dashboard</p>
            <p className="text-lg italic text-[#C19C77]">por Mariana Borba</p>
          </div>
        </div>

        {/* Frase motivacional */}
        <div>
          <p className="text-2xl italic rounded-4xl mt-5 pixel-border text-[#F5F0E6]">
            "Pequenas escolhas diárias, grandes conquistas futuras: Controle hoje
            para conquistar o amanhã"
          </p>
        </div>

        <div> 
          <img src="https://i.pinimg.com/originals/dc/9e/64/dc9e64b79c0bb67485b73bb829998f18.gif" />
        </div>

        
      </div>
    </div>
  );
}
