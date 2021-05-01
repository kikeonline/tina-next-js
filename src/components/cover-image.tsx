import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

interface CoverImageProps {
  title: string
  src: string
  slug: string
  height: number
  width: number
}

const CoverImage: React.FC<CoverImageProps> = ({ title, src, slug, height, width }) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      title={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug
      })}
      layout='responsive'
      width={width}
      height={height}
    />
  )
  return (
    <div className='sm:mx-0'>
      {slug != null ? (
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
