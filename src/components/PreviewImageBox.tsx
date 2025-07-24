import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ImagePreview = ({
  open,
  setOpen,
  src,
}: {
  open: boolean;
  setOpen: any;
  src: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen({ state: !open })}>
      <DialogContent className="min-h-[400px] sm:max-w-[425px] md:max-w-[325px] lg:max-w-[767px] 2xl:max-w-[1324px]">
        <DialogHeader>
          <DialogTitle className="">Preview</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center overflow-auto">
          <img src={src} className="max-h-full max-w-full object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;
