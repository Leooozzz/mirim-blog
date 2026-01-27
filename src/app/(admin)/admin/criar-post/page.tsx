"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


export default function AddPostForm() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setCover(file)
    setPreview(URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("slug", slug)
    formData.append("content", content)
    formData.append("tags", JSON.stringify(tagsArray))
    if (cover) formData.append("cover", cover)

    console.log("Enviando post:", {
      title,
      slug,
      content,
      tags: tagsArray,
      cover,
    })

   
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-blue-950 p-8 rounded-lg shadow-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Adicionar Post
        </h2>

        
        <div>
          <label className="block mb-1 font-medium">Título</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do post"
          />
        </div>

 
        <div>
          <label className="block mb-1 font-medium">Slug</label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ex: meu-primeiro-post"
          />
        </div>

   
        <div>
          <label className="block mb-1 font-medium">Conteúdo</label>
          <Textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva o conteúdo do post..."
          />
        </div>

   
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, nextjs, tailwind"
          />
          <p className="text-sm text-muted-foreground">
            Separe as tags por vírgula
          </p>
        </div>

    
        <div>
          <label className="block mb-1 font-medium">Imagem de capa</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

     
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        <Button type="submit" className="w-full">
          Publicar Post
        </Button>
      </form>
    </main>
  )
}