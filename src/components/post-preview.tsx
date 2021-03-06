import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

interface PostPreviewProps {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: {
    name: string
    picture: {
      url: string
    }
  }
  slug: string
}

const PostPreview: React.FC<PostPreviewProps> = ({ title, coverImage, date, excerpt, author, slug }) => {
  return (
    <div>
      <div className='mb-5'>
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={278}
          width={556}
        />
      </div>
      <h3 className='mb-3 text-3xl leading-snug'>
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a className='hover:underline'>{title}</a>
        </Link>
      </h3>
      <div className='mb-4 text-lg'>
        <DateFormatter dateString={date} />
      </div>
      <p className='mb-4 text-lg leading-relaxed'>{excerpt}</p>
      <Avatar
        name={author.name}
        picture={`${String(process.env.STRAPI_URL)}${author.picture.url}`}
      />
    </div>
  )
}

export default PostPreview
