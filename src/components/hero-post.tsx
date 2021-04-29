import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function HeroPost ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) {
  return (
    <section>
      <div className='mb-8 md:mb-16'>
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          height={620}
          width={1240}
        />
      </div>
      <div className='mb-20 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 md:mb-28'>
        <div>
          <h3 className='mb-4 text-4xl leading-tight lg:text-6xl'>
            <Link as={`/posts/${slug}`} href='/posts/[slug]'>
              <a className='hover:underline'>{title}</a>
            </Link>
          </h3>
          <div className='mb-4 text-lg md:mb-0'>
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className='mb-4 text-lg leading-relaxed'>{excerpt}</p>
          <Avatar
            name={author.name}
            picture={process.env.STRAPI_URL + author.picture.url}
          />
        </div>
      </div>
    </section>
  )
}
