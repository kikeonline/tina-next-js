interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className='container px-5 mx-auto'>{children}</div>
}

export default Container
