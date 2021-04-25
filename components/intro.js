import Link from 'next/link'

export default function Intro () {
  return (
    <section className='flex flex-row justify-between items-center md:flex-row mt-16 mb-16 md:mb-12'>
      <h1 className='text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8'>
        NextJS
      </h1>
      <div>
        <nav>
          <Link href='/about-us'>
            <a className='hover:underline'>About Us</a>
          </Link>
        </nav>
      </div>
    </section>
  )
}
