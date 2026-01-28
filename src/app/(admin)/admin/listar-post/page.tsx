import { requireAdmin } from "@/actions/authAdmin";
import { GetPost } from "@/actions/getPosts";
import { ListPosts } from "@/components/admin/listPost";
import { Button } from "@/components/ui/button";

export const ListarPost = async () => {
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ListPosts/>
    </main>
  );
};

export default ListarPost;
