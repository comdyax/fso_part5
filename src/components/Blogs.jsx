import blogs from "../services/blogs"
import Blog from "./Blog"

const Blogs = (props) => {
    if (props.user !== null) {
        return (
            <div>
                <h2>blogs</h2>
                <ul key={props.user.id}>
                    {props.blogs.map(blog =>
                        <li key={blog.id}>
                            <Blog blog={blog} />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Blogs