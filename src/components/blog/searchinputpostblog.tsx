import { SearchIcon } from "lucide-react"
import { Card, CardDescription } from "../ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

export const SearchInputPostBlog = () =>{ 
    return(
        <Card className="p-4 bg-white dark:bg-gray-900">
        <CardDescription className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
        Pesquisar
        </CardDescription>
        <InputGroup>
        <InputGroupInput placeholder="Pesquisar posts..." />
        <InputGroupAddon>
            <SearchIcon />
        </InputGroupAddon>
        </InputGroup>
        </Card>
    )
}