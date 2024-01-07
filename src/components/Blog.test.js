import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'


test('<Blog /> renders only title and author by default', async () => {
    const user = {
        username: 'max'
    }
    const blog = {
        title: 'its a me',
        author: 'mario',
        url: 'mariocart.luigi',
        user: {
            username: 'max'
        }
    }

    const { container } = render(<Blog blog={blog} user={user} reloadBlogs={null} />)

    const divDefault = container.querySelector('.defaultValues')
    const divDetails = container.querySelector('.detailValues')

    expect(divDefault).not.toHaveStyle('display: none')
    expect(divDetails).toHaveStyle('display: none')
})