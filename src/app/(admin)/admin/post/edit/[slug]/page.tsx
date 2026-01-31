import { EditPost } from "@/components/admin/posts/editPost"


type Props = {
  params: Promise<{ slug: string }>;
};

const Page = async ({params}:Props) => {
    const {slug} = await params
    return(
        <div>
          <EditPost/>
        </div>
    )
}

export default Page