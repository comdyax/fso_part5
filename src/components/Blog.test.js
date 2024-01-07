import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import JSDOMEnvironment from 'jest-environment-jsdom'

let user = null
let blog = null
let container = null

beforeEach(() => {
    user = {
        username: 'max'
    }
    blog = {
        title: 'its a me',
        author: 'mario',
        url: 'mariocart.luigi',
        user: {
            username: 'max'
        }
    }
    container = render(<Blog blog={blog} user={user} reloadBlogs={jest.fn()} />).container
})


test('<Blog /> renders only title and author by default', async () => {
    const divDefault = container.querySelector('.defaultValues')
    const divDetails = container.querySelector('.detailValues')

    expect(divDefault).not.toHaveStyle('display: none')
    expect(divDetails).toHaveStyle('display: none')
})

test('<Blog /> details are shown when show-details-button is clicked', async () => {
    const client = userEvent.setup()
    const button = screen.getByText('show details')

    await client.click(button)

    const divDefault = container.querySelector('.defaultValues')
    const divDetails = container.querySelector('.detailValues')

    expect(divDefault).not.toHaveStyle('display: none')
    expect(divDetails).not.toHaveStyle('display: none')
})