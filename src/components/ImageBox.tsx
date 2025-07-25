import assets from '@/assets';

export default function CustomCard({
  cardHeight,
  item,
  setIsPreview,
  type,
}: any) {
  return item?.attachmentType === 'video' ? (
    <div
      className={`relative w-[200px] overflow-hidden rounded-[35px] border-2`}
    >
      <video
        className={`max-h-[194px] min-h-[194px] w-full max-w-[250px] rounded-[20px] object-cover max-[576px]:max-w-full max-[576px]:max-h-full max-[576px]:min-h-full max-[576px]:min-w-full  max-[576px]:w-full `}
        controls
        controlsList="nodownload"
      >
        <source src={item.filePath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute left-4 top-3 w-[50%] truncate rounded-full bg-[#14242E40] px-5 py-2 text-[14px] font-medium text-[#FFFFFF] shadow-lg">
        {type === 'day' ? item?.day : item?.title}
      </div>
    </div>
  ) : (
    <div
      onClick={() => {
        if (item?.attachmentType !== 'document') {
          setIsPreview({
            state: true,
            source: item.filePath,
          });
        } else {
          const link = document.createElement('a');
          link.href = item.filePath;
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }}
      className={`relative ${cardHeight} border-3 w-[200px] overflow-hidden rounded-[35px]`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${item?.attachmentType === 'document' ? assets.images.docs : item?.filePath}')`,
        }}
      />
      {item?.title ? (
        <div className="absolute left-4 top-3 w-[50%] truncate rounded-full bg-[#14242E40] px-5 py-2 text-[14px] font-medium text-[#FFFFFF] shadow-lg">
          {type === 'day' ? item?.day : item?.title}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
