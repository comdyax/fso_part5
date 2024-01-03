import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import NewBlog from './components/NewBlog'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exc) {
      //TODO: implement some kind of Error Message?
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService.addBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
    setBlogs(blogs.concat(newBlog))
  }

  return (
    <div>
      <LoginForm
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        setUsername={setUsername}
        setPassword={setPassword}
        user={user}
        username={username}
        password={password}
        blogs={blogs}
      />

      <NewBlog
        user={user}
        handleNewBlog={handleNewBlog}
        title={title}
        author={author}
        url={url}
        setAuthor={setAuthor}
        setTitle={setTitle}
        setUrl={setUrl}
      />

      <Blogs
        user={user}
        handleLogout={handleLogout}
        blogs={blogs}
      />
    </div>
  )
}

export default App