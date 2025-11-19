"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateRegister, validateEditUser } from "@/utils/validators";
import { getUsers, editUser, addUser, deleteUser } from "@/services/getUsers";

import Image from "next/image";
import "./page.css"


export default function Register() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

const handleRegister = async () => {
  try {
    // Validate the new user data
    const validationError = validateRegister(email, nome, senha);
    if (validationError) {
      alert(validationError);
      return; // Stop execution if validation fails
    }

    const body = {
      email,
      nome,
      senha,
    };

    const response = await addUser(body);

    if (response) {
      alert("Usuário criado com sucesso!");
    }
  } catch (error: any) {
    alert("Erro ao adicionar usuário: " + error.message);
  }
};


    const handleVoltar = () => {
        router.push('/pageLogin');
    }

    return (
        <div className="registerBody">

        <Image
          className="logo"
          src="/logo.png"
          alt="RingStrike logo"
          width={400}
          height={0}
          priority
            />
        <h1>Registrar</h1>

            <input type="text" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input type="text" placeholder="Nome" 
                value={nome} onChange={(e) => setNome(e.target.value)}
            />
            <input type="password" placeholder="Password"
                value={senha} onChange={(e) => setSenha(e.target.value)}
            />
            <input type="password" placeholder="Confirm Password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
                className="register"
                onClick={handleRegister}
                >Registrar
            </button>
            <button
                className="voltar"
                onClick={handleVoltar}
                >Voltar
            </button>



        </div>
    ) 
}