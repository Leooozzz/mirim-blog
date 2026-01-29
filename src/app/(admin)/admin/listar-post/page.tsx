import { ListPosts } from "@/components/admin/posts/listPost";


export const ListarPost = async () => {
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ListPosts/>
    </main>
  );
};

export default ListarPost;
