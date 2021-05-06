import Avatar from './avatar'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import CoverImage from '../components/cover-image'
// TINA
import { useCMS } from 'tinacms'

interface PostHeaderProps {
  title: string
  slug: string
  coverImage: string
  date: string
  author: {
    name: string
    picture: {
      url: string
    }
  }
  excerpt: string
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, slug, coverImage, date, author, excerpt }) => {
  useCMS()
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className='hidden excerpt'>
        <p>
          {excerpt}
        </p>
      </div>
      <div className='hidden  md:block md:mb-12'>
        <Avatar
          name={author.name} picture={`${String(process.env.STRAPI_URL)}${author.picture.url}`}
        />
      </div>
      <div className='mb-8 md:mb-16 sm:mx-0'>
        <CoverImage title={title} src={coverImage} slug={slug} height={620} width={1240} />
      </div>
      <div className='max-w-2xl mx-auto'>
        <div className='block mb-6 md:hidden'>
          <Avatar
            name={author.name}
            picture={`${String(process.env.STRAPI_URL)}${author.picture.url}`}
          />
        </div>
        <div className='mb-6 text-lg'>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
