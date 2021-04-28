import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
// import markdownToHtml from '../../lib/markdownToHtml'
// TINA IMPORTS
import { useCMS, useForm, usePlugin } from 'tinacms'
import { DateFieldPlugin } from 'react-tinacms-date'
// STRAPI
import { fetchGraphql } from 'react-tinacms-strapi'

export default function Post ({ post: initialPost, preview }) {
  const cms = useCMS()
  cms.plugins.add(DateFieldPlugin)

  const formConfig = {
    id: initialPost.slug, // a unique identifier for this instance of the form
    label: 'Blog Post', // name of the form to appear in the sidebar
    initialValues: initialPost, // populate the form with starting values
    onSubmit: async (values) => {
      const saveMutation = `
      mutation UpdatePost(
        $id: ID!
        $title: String
        $date: Date
        $content: String
        $coverImageId: ID
      ) {
        updatePost(
          input: {
            where: { id: $id }
            data: { title: $title, date: $date, content: $content, coverImage: $coverImageId}
          }
        ) {
          post {
            id
            date
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
        coverImageId: values.coverImage.id
      })
      if (response.data) {
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
        name: 'coverImage',
        label: 'Cover Image',
        component: 'image'
      },
      {
        name: 'date',
        label: 'Date',
        component: 'date',
        // dateFormat: 'MMMM DD YYYY',
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
  const [post, form] = useForm(formConfig)
  usePlugin(form)

  const router = useRouter()
  if (!router.isFallback && !initialPost?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback
          ? (
            <PostTitle>Loading…</PostTitle>
            )
          : (
            <>
              <article className='mb-32'>
                <Head>
                  <title>
                    {post.title} | Next.js Blog Example with {CMS_NAME}
                  </title>
                  <meta property='og:image' content={process.env.STRAPI_URL + post.coverImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={process.env.STRAPI_URL + post.coverImage.url}
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

export async function getStaticProps ({ params, preview, previewData }) {
  const postResults = await fetchGraphql(
    process.env.STRAPI_URL,
    `
    query{
      posts(where: {slug: "${params.slug}"}){
        id
        title
        date
        slug
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
  if (preview) {
    return {
      props: {
        post: {
          ...post
        },
        preview,
        ...previewData
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

export async function getStaticPaths () {
  const postResults = await fetchGraphql(
    process.env.STRAPI_URL,
    `
    query{
      posts{
        slug
      }
    }
  `
  )

  return {
    paths: postResults.data.posts.map(post => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
