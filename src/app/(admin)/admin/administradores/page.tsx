"use client"
import React, { useState } from "react";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string; 
  createdAt: string;
}

export const Page = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: "Alice Silva", email: "alice@blog.com", role: "Super Admin", createdAt: "2026-01-10" },
    { id: 2, name: "Bruno Costa", email: "bruno@blog.com", role: "Editor", createdAt: "2026-01-15" },
    { id: 3, name: "Carla Souza", email: "carla@blog.com", role: "Editor", createdAt: "2026-01-20" },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover este administrador?")) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  return (
    <main className="p-8 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Administradores</h1>
        <p className="text-gray-600">Gerencie os administradores do painel</p>
      </header>

      <div className=" shadow rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Função</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado em</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4">{admin.name}</td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">{admin.role}</td>
                <td className="px-6 py-4">{admin.createdAt}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Nenhum administrador encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Page;