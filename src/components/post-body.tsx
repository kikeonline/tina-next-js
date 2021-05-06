import ReactMarkdown from 'react-markdown'
import markdownStyles from './markdown-styles.module.css'

interface PostBodyProps {
  content: string
}

const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className={markdownStyles.markdown}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

export default PostBody
