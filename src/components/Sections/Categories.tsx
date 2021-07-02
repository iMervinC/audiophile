import { CategoryCard } from '@/components/UI'

const Categories = () => {
  const cats = ['headphones', 'speakers', 'earphones']

  return (
    <div
      data-testid="Categories"
      className="container flex flex-col justify-between items-center max-w-[1150px] my-28 space-y-20  sm:flex-row sm:space-y-0 sm:space-x-5 "
    >
      {cats.map((cat) => (
        <CategoryCard key={cat} categories={cat} />
      ))}
    </div>
  )
}

export { Categories }
