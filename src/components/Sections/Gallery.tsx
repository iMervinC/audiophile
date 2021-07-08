import Image from 'next/image'
import { Products } from '@/utils/types'

export const Gallery = ({ gallery }: { gallery: Products['gallery'] }) => {
  return (
    <div className="mt-16 contain-padding grid grid-cols-1 gap-[30px] md:grid-cols-gallery-tablet md:grid-rows-gallery-tablet lg:grid-cols-gallery lg:grid-rows-gallery">
      <div className="sm:col-start-1">
        <Image
          src={gallery.first.desktop}
          alt="first"
          height="280"
          width="445"
          objectFit="fill"
          blurDataURL={gallery.first.mobile}
          placeholder="blur"
          className="rounded-xl"
        />
      </div>
      <div className="sm:col-start-1 sm:row-start-2">
        <Image
          src={gallery.second.desktop}
          alt="second"
          height="280"
          width="445"
          objectFit="cover"
          blurDataURL={gallery.second.mobile}
          placeholder="blur"
          className="rounded-xl"
        />
      </div>
      <div className="sm:col-start-2 sm:row-start-1 sm:row-end-2">
        <Image
          src={gallery.third.desktop}
          alt="third"
          height="592"
          width="635"
          objectFit="cover"
          blurDataURL={gallery.third.mobile}
          placeholder="blur"
          className="rounded-xl"
        />
      </div>
    </div>
  )
}
