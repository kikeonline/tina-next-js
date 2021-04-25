// import Container from '../components/container'

export default function Hero ({ title, subTitle, content }) {
  return (
    <section className='bg-accent-2 h-96 w-full'>
      <div className='container mx-auto px-5 pb-16 flex h-full flex-col justify-end'>
        <h3 className='font-serif italic text-white'>
          {subTitle}
        </h3>
        <h1 className='text-white'>
          {title}
        </h1>
      </div>
    </section>
  )
}
