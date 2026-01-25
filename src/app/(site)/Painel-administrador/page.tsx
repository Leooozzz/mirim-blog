import { requireAdmin } from "@/actions/auth.admin";


const Page = async ()=> {
  
  const admin = await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold">Painel do Administrador</h1>
      
    </div>
  );
}
export default Page