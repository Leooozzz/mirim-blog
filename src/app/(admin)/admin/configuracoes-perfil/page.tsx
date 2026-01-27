"use client"

import React, { useState } from "react";

export const Page = () => {
  const [name, setName] = useState("Alice Silva");
  const [email, setEmail] = useState("alice@blog.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("A nova senha e a confirmação não coincidem!");
      return;
    }

    // Aqui você chamaria a API para atualizar o perfil
    console.log({ name, email, currentPassword, newPassword });
    alert("Perfil atualizado com sucesso!");
    
    // Limpar campos de senha
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Configurações do Perfil</h1>
        <p className="text-gray-600">Atualize suas informações pessoais e senha</p>
      </header>

      <form onSubmit={handleSave} className="bg-white p-6 rounded shadow max-w-2xl">
        {/* Nome */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <hr className="my-6" />

        {/* Senha atual */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Senha Atual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Digite sua senha atual"
            required
          />
        </div>

        {/* Nova senha */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nova Senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Digite a nova senha"
          />
        </div>

        {/* Confirmar nova senha */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Confirme a nova senha"
          />
        </div>

        {/* Botão de salvar */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Salvar Alterações
        </button>
      </form>
    </main>
  );
};

export default Page;