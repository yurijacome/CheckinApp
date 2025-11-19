'use client';
import { useTheme } from "@/context/ThemeContext";
import {Sun, Moon} from 'lucide-react'

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title="Mudar tema"
      style={{
        position: "fixed",
        bottom: 4 ,
        right: 20,
        borderRadius: 8,
        border: "none",
        background: "var(--main-color2)",
        cursor: "pointer",
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {theme === "light" ? <Moon size={100} color="red"/> : <Sun  size={100} color="red"/>}
    </button>
  );
}
