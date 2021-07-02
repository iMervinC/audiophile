import React from 'react'

const CategoryTitle = ({ title }: { title: string }) => {
  return (
    <div
      data-testid="categoryTitle"
      className="bg-black pb-24 text-center pt-[212px] "
    >
      <h1 className="text-white text-4xl md:title">{title}</h1>
    </div>
  )
}
export default CategoryTitle
