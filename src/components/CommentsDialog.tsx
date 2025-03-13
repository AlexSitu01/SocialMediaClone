import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CommentsDialogProps {
    comments?: Comment[]
    isCommentsOpen: boolean
    setIsCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function CommentsDialog({ comments = [], isCommentsOpen, setIsCommentsOpen }: CommentsDialogProps) {
    return <>
        <Dialog open={true} as="div" className="w-500 h-500 bg-amber-300" onClose={() => setIsCommentsOpen(false)}>
            
           
            <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                    Payment successful
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                    Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
                    order.
                </p>
                <div className="mt-4">
                    <button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={() => setIsCommentsOpen(false) }
                    >
                        Got it, thanks!
                    </button>
                </div>
            </DialogPanel>
        </Dialog>
    </>


}
