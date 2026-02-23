import { EditPostComponent  } from "@/components/admin/posts/editPost"


type Props = {
  params: Promise<{ slug: string }>;
};

const Page = async ({params}:Props) => {
    const {slug} = await params
    return(
        <div>
          <EditPostComponent slug={slug} />
        </div>
    )
}

export default Page