interface AvatarProps {
  name: string
  picture: string
}

const Avatar: React.FC<AvatarProps> = ({ name, picture }) => {
  return (
    <div className='flex items-center'>
      <img
        src={picture}
        className='w-12 h-12 mr-4 rounded-full'
        alt={name}
        title={name}
      />
      <div className='text-xl font-bold'>{name}</div>
    </div>
  )
}

export default Avatar
