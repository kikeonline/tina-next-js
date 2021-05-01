import PostPreview from './post-preview'

interface MoreStoriesProps {
  posts: Array<{
    slug: string
    title: string
    coverImage: {
      url: string
    }
    date: string
    author: {
      name: string
      picture: {
        url: string
      }
    }
    excerpt: string
  }>
}

const MoreStories: React.FC<MoreStoriesProps> = ({ posts }) => {
  return (
    <section>
      <h2 className='mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl'>
        More Stories
      </h2>
      <div className='grid grid-cols-1 mb-32 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32'>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={`${String(process.env.STRAPI_URL)}${post.coverImage.url}`}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
