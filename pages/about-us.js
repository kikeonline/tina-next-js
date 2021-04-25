import Container from '../components/container'
import Layout from '../components/layout'
import Header from '../components/header'
// import PostTitle from '../components/post-title'
import Head from 'next/head'
import Hero from '../components/hero'
import PostBody from '../components/post-body'
// import axios from 'axios'
import { getPageBySlug } from '../lib/api'

export default function Index ({ aboutUsPage }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js | About Us</title>
        </Head>
        <Container>
          <Header />
          {/* <PostTitle>
            About Us
          </PostTitle> */}
        </Container>
        <Hero
          title='About Us'
          subTitle='Profesional Support'
        />
        <PostBody content={aboutUsPage.content} />
      </Layout>
    </>
  )
}

export async function getStaticProps () {
  const aboutUsPage = getPageBySlug('about-us', [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'content'
  ])
  console.log(aboutUsPage)
  return {
    props: { aboutUsPage }
  }
}
