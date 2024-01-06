import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, newLike, user, reloadBlogs }) => {
  const [hide, setHide] = useState(true)

  const changeHide = () => {
    setHide(!hide)
  }

  const removeBlog = async () => {
    try {
      if (window.confirm(`Delete blog '${blog.title}' by ${blog.author}?`)) {
        await blogService.deleteBlog(blog.id)
        reloadBlogs()
      }
    } catch (exc) {
      console.log(exc)
    }
  }

  const addLike = async () => {
    const newBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }
    try {
      await blogService.updateBlog(newBlogObject)
      reloadBlogs()
    } catch (exc) {
      console.log(exc)
    }
  }

  const showNot = { display: hide ? 'none' : '' }
  const show = { display: hide ? '' : 'none' }
  const removeButtonStyle = {
    display: user.username === blog.user.username ? '' : 'none',
    backgroundColor: 'blue',
    border: '3px',
    borderRadius: '3px',
    padding: '4px 4px',
    margin: '10px 10px',
    color: 'white'
  }

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
        <button style={show} onClick={changeHide}>show details</button>
        <button style={showNot} onClick={changeHide}>close details</button>
      </div>
      <div style={showNot}>
        <b>url:</b> {blog.url}
        <br></br>
        <b>likes:</b> {blog.likes}
        &emsp;
        <button onClick={addLike}>like</button>
        <br></br>
        <b>username:</b> {blog.user.username}
        <br></br>
        <button style={removeButtonStyle} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog