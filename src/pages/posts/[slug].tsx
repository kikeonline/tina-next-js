import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
// TINA IMPORTS
import { useCMS, useForm, useFormScreenPlugin } from 'tinacms'
import { DateFieldPlugin } from 'react-tinacms-date'
// STRAPI
import { fetchGraphql } from 'react-tinacms-strapi'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface PostProps {
  post: {
    id: string
    title: string
    coverImage: {
      url: string
    }
  }
  slug: string
  preview: any
}

const Post: React.FC<PostProps> = ({ post: initialPost, preview }) => {
  const cms = useCMS()
  cms.plugins.add(DateFieldPlugin)

  const formConfig = {
    id: initialPost.id,
    label: 'Edit Blog Post',
    initialValues: initialPost,
    onSubmit: async (values: any) => {
      const saveMutation = `
      mutation UpdatePost(
        $id: ID!
        $title: String
        $date: Date
        $excerpt: String
        $content: String
        $coverImageId: ID
      ) {
        updatePost(
          input: {
            where: { id: $id }
            data: { title: $title, date: $date, excerpt: $excerpt, content: $content, coverImage: $coverImageId }
          }
        ) {
          post {
            id
            date
            coverImage {
              url
            }
          }
        }
      }`
      // STRAPI DATE TEMPORAL FIX TODO: FIX TIMEZONE backend-side
      const dateChosen = new Date(values.date)
      const day = 60 * 60 * 24 * 1000
      const fixedDate = new Date(dateChosen.getTime() + (day * 2)).toISOString().split('T')[0]
      const response = await cms.api.strapi.fetchGraphql(saveMutation, {
        id: values.id,
        title: values.title,
        date: fixedDate,
        content: values.content,
        excerpt: values.excerpt,
        /* @ts-expect-error */
        coverImageId: cms.media.store.getFileId(values.coverImage.url)
      })
      if (response.data != null) {
        cms.alerts.success('Changes Saved')
      } else {
        cms.alerts.error('Error saving changes')
      }
    },
    fields: [
      // define fields to appear in the form
      {
        name: 'title', // field name maps to the corresponding key in initialValues
        label: 'Post Title', // label that appears above the field
        component: 'text' // the component used to handle UI and input to the field
      },
      {
        name: 'author.name',
        label: 'Author',
        component: 'text'
      },
      {
        name: 'coverImage.url',
        label: 'Cover Image',
        component: 'image',
        // Generate value based on the filename
        parse: (media: {filename: string}) => {
          return `/uploads/${media.filename}`
        },
        // Generate the src attribute for the preview image.
        previewSrc: (src: string) => {
          return `${String(process.env.STRAPI_URL)}${src}`
        }
      },
      {
        name: 'date',
        label: 'Date',
        component: 'date',
        timeFormat: false
      },
      {
        name: 'content', // as mentioned in project setup, `post.content` will refer to the raw markdown.
        label: 'Content',
        component: 'markdown' // `component` accepts a predefined components or a custom React component
      },
      {
        name: 'excerpt',
        label: 'Excerpt',
        component: 'textarea'
      }
    ]
  }

  interface UseFormProps {
    slug: string
    title: string
    excerpt: string
    date: string
    author: {
      name: string
      picture: {
        url: string
      }
    }
    coverImage: {
      url: string
    }
    content: string

  }
  const [post, form] = useForm<UseFormProps>(formConfig)

  // Create the form
  // const icon = () => <span>🦙</span>
  const layout = 'popup'
  // Register Plugin
  useFormScreenPlugin(form, null, layout)
  // usePlugin(form)

  const router = useRouter()
  // Had to comment this code due to this bug:  https://github.com/vercel/next.js/issues/12846
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className='mb-32'>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property='og:image' content={`${String(process.env.STRAPI_URL)}${post.coverImage.url}`} />

                {/* <!-- Primary Meta Tags --> */}
                <meta name='title' content={post.title} key='ogtitle' />
                <meta name='description' content={post.excerpt} key='ogdesc' />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property='og:type' content='website' />
                <meta property='og:url' content={`${String(process.env.NEXTJS_URL)}/${post.slug}`} key='ogurl' />
                <meta property='og:title' content={`${post.title}`} key='ogtitle' />
                <meta property='og:description' content={`${post.excerpt}`} key='ogdesc' />
                <meta property='og:image' content={`${String(process.env.STRAPI_URL)}${post.coverImage.url}`} key='ogimage' />

                {/* <!-- Twitter --> */}
                <meta property='twitter:card' content='summary_large_image' key='twcard' />
                <meta property='twitter:url' content={`${String(process.env.NEXTJS_URL)}/${post.slug}`} key='twurl' />
                <meta property='twitter:title' content={`${post.title}`} key='twtitle' />
                <meta property='twitter:description' content={`${post.excerpt}`} key='twdesc' />
                <meta property='twitter:image' content={`${String(process.env.STRAPI_URL)}${post.coverImage.url}`} key='twimg' />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={`${String(process.env.STRAPI_URL)}${post.coverImage.url}`}
                date={post.date}
                author={post.author}
                excerpt={post.excerpt}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}
export default Post

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const { slug } = params as IParams
  const postResults = await fetchGraphql(
    `${String(process.env.STRAPI_URL)}`,
    `
    query{
      posts(where: {slug: "${slug}"}){
        id
        title
        date
        slug
        excerpt
        content
        author {
          name
          picture { 
            url
          }
        }
        coverImage {
          url
        }
      }
    }
  `
  )
  const post = postResults.data.posts[0]

  if (preview != null) {
    return {
      props: {
        post: {
          ...post
        },
        preview
        // ...previewData
      }
    }
  }

  return {
    props: {
      post: {
        ...post
      },
      preview: false
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postResults = await fetchGraphql(
    `${String(process.env.STRAPI_URL)}`,
    `
    query{
      posts{
        slug
      }
    }
  `
  )
  return {
    fallback: 'blocking',
    paths: postResults.data.posts.map((post: any) => {
      return {
        params: {
          slug: post.slug
        }
      }
    })
  }
}
