import Link from 'next/link'

export default function Header () {
  return (
    <section className='flex flex-row justify-between items-center md:flex-row mt-16 mb-16 md:mb-12'>
      <h1 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8'>
        <Link href='/'>
          <a className='hover:underline'>NSource</a>
        </Link>
      </h1>

      <nav>
        <Link href='/about-us'>
          <a className='hover:underline'>About Us</a>
        </Link>
      </nav>
    </section>
  )
}
