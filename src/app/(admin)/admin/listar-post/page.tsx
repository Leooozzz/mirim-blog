"use client"
import React, { useState } from "react";

interface Post {
  id: number;
  title: string;
  category: string;
  status: "Publicado" | "Rascunho";
  createdAt: string;
}

export const Page = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "Como melhorar seu SEO", category: "Tecnologia", status: "Publicado", createdAt: "2026-01-20" },
    { id: 2, title: "10 dicas de produtividade", category: "Produtividade", status: "Publicado", createdAt: "2026-01-18" },
    { id: 3, title: "Nova política de comentários", category: "Notícias", status: "Rascunho", createdAt: "2026-01-15" },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Posts do Blog</h1>
        <p className="text-gray-600">Gerencie seus posts publicados e rascunhos</p>
      </header>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado em</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    post.status === "Publicado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4">{post.createdAt}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Nenhum post encontrado.
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