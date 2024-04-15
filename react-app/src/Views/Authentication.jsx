import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

export const Authentication = () => {
  return (
    <div>
        <Button onClick={()=>toast.success("Hello World!")}>Click me</Button>
    </div>
  )
}
