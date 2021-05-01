import Footer from './footer'
import Meta from './meta'

interface LayoutProps {
  children: React.ReactElement
  preview: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Meta />
      <div className='min-h-screen'>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
