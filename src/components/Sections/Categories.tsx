import { CategoryCard } from '@/components/UI'
import { useRouter } from 'next/router'

const Categories = () => {
  const cats = ['headphones', 'speakers', 'earphones']
  const route = useRouter()
  return (
    <ul
      data-testid="Categories"
      className="container flex flex-col justify-between items-center max-w-[1150px] my-28 space-y-20  sm:flex-row sm:space-y-0 sm:space-x-5 "
    >
      {cats.map((cat) => (
        <CategoryCard
          key={cat}
          categories={cat}
          cb={() => route.push(`/${cat}`)}
        />
      ))}
    </ul>
  )
}

export { Categories }
