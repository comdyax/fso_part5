
const LoginForm = ({
    handleLogin,
    handleLogout,
    setUsername,
    setPassword,
    username,
    password,
    user }) => {
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
                <form onSubmit={handleLogout}>
                    <button type='submit'>logout</button>
                </form>
            </div>
        )
    }
}

export default LoginForm