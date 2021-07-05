import Img from 'next/image'
import { ButtonArrow } from '@/components/UI'

export const CategoryCard = ({
  categories,
  className,
  cb,
}: {
  categories: string
  className?: string
  cb?: () => void
}) => {
  return (
    <li className={`text-center sm:w-[350px] w-10/12  relative ${className}`}>
      <Img
        src={`/shared/desktop/image-${categories}.png`}
        height="225px"
        width="250px"
        className="z-20"
      />
      <div className="bg-grey rounded-2xl pt-32 pb-7 absolute w-full top-16 z-10 space-y-5 sm:top-14">
        <h6 className="uppercase">{categories}</h6>
        <ButtonArrow cb={cb} title={categories} />
      </div>
    </li>
  )
}
