"use state"

import { ListCategoryBlog } from "@/components/blog/listCategory"
import { MenuBar } from "@/components/blog/menuBar"
import { SearchInputPostBlog } from "@/components/blog/searchinputpostblog"

export const Page = () => {
  return (
    <main className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      <section className="max-w-6xl mx-auto p-6">
        
        <div className="max-w-2xl flex flex-col items-start">
          <h1 className="text-4xl font-bold">Blog da Fundação Mirim</h1>
          <p className="text-lg mt-2 leading-relaxed">
            Fique por dentro das novidades, dicas de estudos e as tendências tecnológicas que estão moldando o futuro do aprendizado.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5 mt-5">
         
          <div className="flex-1 bg-gray-200 dark:bg-gray-900 p-4 rounded-lg">
            <MenuBar/>
            <div className="grid grid-cols-1 md:grid-cols-3 ">
             <div>
              slug
             </div>
            </div>
          </div>
          
          <div className="w-full md:w-80 flex flex-col gap-5">
          <SearchInputPostBlog/>
            <div>
              <ListCategoryBlog />
            </div>
          
          </div>
          
        </div>
      </section>
    </main>
  )
}

export default Page
