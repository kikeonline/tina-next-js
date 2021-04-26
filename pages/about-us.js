import Container from '../components/container'
import Layout from '../components/layout'
import Header from '../components/header'
// import PostTitle from '../components/post-title'
import Head from 'next/head'
import Hero from '../components/hero'
import PostBody from '../components/post-body'
// import axios from 'axios'
import { getPageBySlug } from '../lib/api'

// TINA IMPORTS
import { useCMS, useForm, usePlugin } from 'tinacms'

export default function AboutUsPage ({ aboutUsPage }) {
  console.log({ aboutUsPage })
  const cms = useCMS()
  const formConfig = {
    id: aboutUsPage.slug, // a unique identifier for this instance of the form
    label: 'Blog Post', // name of the form to appear in the sidebar
    initialValues: aboutUsPage, // populate the form with starting values
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
        label: 'Page title', // label that appears above the field
        component: 'text' // the component used to handle UI and input to the field
      }
    ]
  }
  const [title, form] = useForm(formConfig)
  usePlugin(form)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js | {aboutUsPage.title}</title>
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
  // console.log(aboutUsPage)
  return {
    props: { aboutUsPage }
  }
}
