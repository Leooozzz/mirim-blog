
import { requireAdmin } from "@/actions/authAdmin"
import { IconProfileClient } from "./IconProfileClient"



export const IconProfile = async () => {
  const user = await requireAdmin()
  return <IconProfileClient user={user} />
}
