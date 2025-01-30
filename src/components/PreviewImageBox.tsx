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
      <DialogContent className="sm:max-w-[425px] md:max-w-[325px] lg:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="">Preview</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <a href={src} rel="noopener noreferrer">
            <img
              src={src}
              className="min-w-[40%] max-w-[100%] object-contain"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;
