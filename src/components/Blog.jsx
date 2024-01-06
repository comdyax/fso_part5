import { useState } from "react"

const Blog = ({ blog }) => {
  const [hide, setHide] = useState(true)

  const changeHide = () => {
    setHide(!hide)
  }

  const showDetails = { display: hide ? 'none' : '' }
  const showButton = { display: hide ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        <b>title:</b> {blog.title} 
        <br></br>
        <b>author:</b> {blog.author}
        <br></br>
        <button style={showButton} onClick={changeHide}>show details</button>
      </div>
      <div style={showDetails}>
        <b>url:</b> {blog.url}
        <br></br>
        <b>likes:</b> {blog.likes}
        &emsp;
        <button>like</button>
        <br></br>
        <b>username:</b> {blog.user.username}
        <br></br>
        <button onClick={changeHide}>close details</button>
      </div>
    </div>
  )
}

export default Blog