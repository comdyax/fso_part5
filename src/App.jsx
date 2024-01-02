import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      //TODO window.localStorage

      setUser(user)
      setUsername('')
      setPassword('')

      //TODO Token set for blog posts
    } catch (exc) {
      //TODO: implement some kind of Error Message?
    }
  }

  const loginForm = () => {
    if (user === null) {
      return (
        <>
          <h1>Login to see application</h1>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
      )
    } else {
      return (
        <div>
          <h1>{user.name} ist logged in</h1>
          <div>
            <h2>blogs</h2>
            <ul>
              {blogs.map(blog =>
                <li key={blog.id}>
                  <Blog key={blog.id} blog={blog} />
                </li>
              )}
            </ul>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {loginForm()}
    </div>
  )
}

export default App