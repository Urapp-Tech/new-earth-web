import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import CustomCard from './ImageBox';
import { useAppSelector } from '@/redux/redux-hooks';

export function CarouselItems({ cardHeight, items, type }: any) {
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  ]);
  const ITEMS_PER_PAGE = 1;
  const TOTAL_ITEMS = 4;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const slidesCount = emblaApi.scrollSnapList().length;
    setTotalPages(Math.ceil(slidesCount / ITEMS_PER_PAGE));

    emblaApi.on('select', () => {
      const currentPage = Math.floor(
        emblaApi.selectedScrollSnap() / ITEMS_PER_PAGE
      );
      setSelectedIndex(currentPage);
    });
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index * ITEMS_PER_PAGE);
    },
    [emblaApi]
  );

  return (
    <div className="relative md:max-w-[35rem] 2xl:max-w-[900px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items?.map((x: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 md:basis-1/3 2xl:basis-1/6"
            >
              <div className="p-1">
                <CustomCard type={type} item={x} cardHeight={cardHeight} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`mx-[.5px] h-2 rounded-full transition-all ${
              selectedIndex === index
                ? 'w-12 bg-[#F27426]'
                : 'w-3  bg-[#D9D9D9]'
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
