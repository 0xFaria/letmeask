type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string
  }
}

export function Question({ // como é obj posos desestruturar
  content,
  author
}: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          
        </div>
      </footer>
    </div>
  )
}