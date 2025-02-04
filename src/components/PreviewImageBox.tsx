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
      <DialogContent className="min-h-[480px] sm:max-w-[425px] md:max-w-[325px] lg:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="">Preview</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center overflow-auto">
          <a
            href={src}
            rel="noopener noreferrer"
            className="mx-auto block h-[450px] max-w-[350px]"
          >
            <img
              src={src}
              className="h-full w-full max-w-[100%] object-contain"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;
