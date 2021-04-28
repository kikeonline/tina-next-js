import '../styles/index.css'
import { StrapiMediaStore, StrapiProvider, StrapiClient } from 'react-tinacms-strapi'
import { TinaCMS, TinaProvider } from 'tinacms'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import { useCMS } from '@tinacms/react-core'
import { useMemo } from 'react'

import Container from '../components/container'
import cn from 'classnames'

const enterEditMode = () => {
  return fetch('/api/preview').then(() => {
    window.location.href = window.location.pathname
  })
}

const exitEditMode = () => {
  return fetch('/api/reset-preview').then(() => {
    window.location.reload()
  })
}

export const EditButton = ({ preview }) => {
  const cms = useCMS()
  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview
      })}
    >
      <Container>
        <div className='py-2 text-sm text-center'>
          <button
            style={{
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => (cms.enabled ? cms.disable() : cms.enable())}
          >
            {cms.enabled ? 'Stop Editing' : 'Edit this Page'}
          </button>
        </div>
      </Container>
    </div>
  )
}

export default function MyApp ({ Component, pageProps }) {
  const cms = useMemo(
    () =>
      new TinaCMS({
        enabled: pageProps.preview,
        sidebar: pageProps.preview,
        toolbar: pageProps.preview,
        plugins: [MarkdownFieldPlugin],
        apis: {
          strapi: new StrapiClient(process.env.STRAPI_URL)
        },
        media: new StrapiMediaStore(process.env.STRAPI_URL)
      }),
    []
  )
  return (
    <TinaProvider cms={cms}>
      <StrapiProvider onLogin={enterEditMode} onLogout={exitEditMode}>
        <EditButton preview={pageProps.preview} />
        <Component {...pageProps} />
      </StrapiProvider>
    </TinaProvider>
  )
}
