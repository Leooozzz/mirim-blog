import { ListPosts } from "@/components/admin/posts/listPost";

export const ListarPost = async () => {
  return (
    <main className=" bg-background">
      <ListPosts />
    </main>
  );
};

export default ListarPost;
