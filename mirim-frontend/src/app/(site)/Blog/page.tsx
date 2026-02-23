import { GetPostBlog } from "@/components/blog/getPostBlog";
import { ListCategoryBlog } from "@/components/blog/listCategory";
import { Separator } from "@/components/ui/separator";

export const Page = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="w-full bg-white py-20">
        <div className="flex justify-center items-center flex-col gap-3 text-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6 text-blue-500">
            BLOG
          </h1>
          <p className="text-xl text-gray-400">
            Fique por dentro das novidades da Fundação Mirim
          </p>
        </div>
      </section>
      <ListCategoryBlog />
      <Separator />

      <section className="max-w-7xl mx-auto p-6">
        <div className="mt-5">
          <GetPostBlog />
        </div>
      </section>
    </main>
  );
};

export default Page;
