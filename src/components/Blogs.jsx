import Blog from "./Blog"

const Blogs = (props) => {
    if (props.user !== null) {
        return (
            <div key={props.user.id}>
                <h2>blogs</h2>
                <ul key={props.user.id}>
                    {props.blogs.map(blog =>
                        <li key={blog.id}>
                            <Blog blog={blog} user={props.user} reloadBlogs={props.reloadBlogs} />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Blogs