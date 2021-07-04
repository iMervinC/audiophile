import { Button } from '@/components/UI/Buttons'

const Hero = () => {
  return (
    <div
      data-testid="Hero"
      className="bg-black bg-hero-mobile lg:bg-hero bg-no-repeat bg-mobile sm:bg-tablet lg:bg-cover text-center lg:text-left"
    >
      <div className="flex items-center container h-screen">
        <div className="xl:w-[396px] space-y-[24px] mx-[30px] lg:mx-0">
          <span className="overline text-main-text50">new product</span>
          <h1 className="text-white text-4xl sm:title">
            XX99 Mark II HeadphoneS
          </h1>
          <p className="text-main-text75 font-extralight">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Button label="See Product" />
        </div>
      </div>
    </div>
  )
}

export { Hero }
