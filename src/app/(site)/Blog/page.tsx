"use state";

import { GetPostBlog } from "@/components/blog/getPostBlog";
import { ListCategoryBlog } from "@/components/blog/listCategory";
import { MenuBar } from "@/components/blog/menuBar";
import { SearchInputPostBlog } from "@/components/blog/searchinputpostblog";

export const Page = () => {
  return (
    <main className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold">Blog da Fundação Mirim</h1>

        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="flex-1 p-4 rounded-lg">
            <MenuBar />
            <GetPostBlog />
          </div>

          <aside className="w-full md:w-80 flex flex-col gap-5">
            <SearchInputPostBlog />
            <ListCategoryBlog />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Page;
