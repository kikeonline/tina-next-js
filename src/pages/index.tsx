import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Header from '../components/header'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
// STRAPI IMPORTS
import { fetchGraphql } from 'react-tinacms-strapi'
import { GetStaticProps } from 'next'

interface IndexProps {
  allPosts: Array<{
    title: string
    date: string
    author: {
      name: string
      picture: {
        url: string
      }
    }
    slug: string
    excerpt: string
    coverImage: {
      url: string
    }
  }>
}

const Index: React.FC<IndexProps> = ({ allPosts }) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={false}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Header />
          {heroPost != null && (
            <HeroPost
              title={heroPost.title}
              coverImage={`${String(process.env.STRAPI_URL)}${heroPost.coverImage.url}`}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}
export default Index

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const postResults = await fetchGraphql(
    `${String(process.env.STRAPI_URL)}`,
    `
    query{
      posts {
        title
        date
        slug
        author {
          name
          picture { 
            url
          }
        }
        excerpt
        coverImage {
          url
        }
      }
    }
  `
  )

  if (preview != null) {
    return {
      props: {
        allPosts: postResults.data.posts,
        preview
      }
    }
  }

  return {
    props: {
      allPosts: postResults.data.posts,
      preview: false
    },
    revalidate: 1
  }
}
