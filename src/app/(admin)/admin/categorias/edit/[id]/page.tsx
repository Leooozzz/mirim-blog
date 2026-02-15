import { EditCategoryComponent } from "@/components/admin/category/editCategory";


type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({params}:Props) => {
    const {id} = await params
    return(
        <div>
          <EditCategoryComponent id={id} />
        </div>
    )
}

export default Page