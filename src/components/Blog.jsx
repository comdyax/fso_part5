import { useState } from "react"

const Blog = ({ blog, newLike }) => {
  const [hide, setHide] = useState(true)

  const changeHide = () => {
    setHide(!hide)
  }

  const addLike = () => {
    const newBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }
    newLike(newBlogObject)
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
        <button onClick={addLike}>like</button>
        <br></br>
        <b>username:</b> {blog.user.username}
        <br></br>
        <button onClick={changeHide}>close details</button>
      </div>
    </div>
  )
}

export default Blog