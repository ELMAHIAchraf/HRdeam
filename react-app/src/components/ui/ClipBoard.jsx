import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export const ClipBoard = () => {
  return (
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger><i className="fa-regular fa-copy text-[#007bffbd]"></i></TooltipTrigger>
    <TooltipContent>
      <p>copy</p>
    </TooltipContent>
    
  </Tooltip>
</TooltipProvider>

  )
}
  