import ImageViewer from 'react-simple-image-viewer';
function ViewApp({ isViewerOpen, images, currentImage, setCurrentImage, setIsViewerOpen }: any) {

    const closeImageViewer: any = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };


    return (
        <div>
            {isViewerOpen && (
                <ImageViewer
                    src={images?.map((x: any) => (x.filePath ?? ''))}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}
            {/* {images.map((src, index) => (
                <img
                    src={src}
                    onClick={() => openImageViewer(index)}
                    width="300"
                    key={index}
                    style={{ margin: '2px' }}
                    alt=""
                />
            ))} */}
        </div>
    );
}

export default ViewApp;