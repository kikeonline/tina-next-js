import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
// import markdownToHtml from '../../lib/markdownToHtml'
// import { useState, useEffect, useMemo } from 'react'
// TINA IMPORTS
import { useCMS, useForm, usePlugin } from 'tinacms'
import { DateFieldPlugin } from 'react-tinacms-date'

export default function Post ({ post: initialPost, morePosts, preview }) {
  // console.log('Post: ', initialPost)

  const cms = useCMS()
  cms.plugins.add(DateFieldPlugin)
  const formConfig = {
    id: initialPost.slug, // a unique identifier for this instance of the form
    label: 'Blog Post', // name of the form to appear in the sidebar
    initialValues: initialPost, // populate the form with starting values
    onSubmit: values => {
      // do something with the data when the form is submitted
      // alert(`Submitting ${values.title}`)
      console.log(values)
      cms.alerts.success('Page saved successfully.')
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
                  <meta property='og:image' content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
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

export async function getStaticProps ({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt'
  ])
  // const content = await markdownToHtml(post.content || '')

  return {
    props: {
      // post: {
      //   ...post,
      //   content,
      // },
      post
    }
  }
}

export async function getStaticPaths () {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
