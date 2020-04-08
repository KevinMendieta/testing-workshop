import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor.todo'
import * as apiMock from '../../utils/api'

jest.mock('../../utils/api', () => ({
  posts: {
    create: jest.fn(() => Promise.resolve()),
  },
}))

const flushPromises = () => {
  return new Promise(resolve => setTimeout(resolve, 0))
}

test('calls onSubmit with the username and password when submitted', async () => {
  const container = document.createElement('div')
  const userMock = {id: '123321'}
  const historyMock = {push: jest.fn()}
  ReactDOM.render(<Editor user={userMock} history={historyMock} />, container)
  const form = container.querySelector('form')
  const {title, content, tags} = form.elements

  title.value = 'I like javascript'
  content.value = 'js is freakin awesome!'
  tags.value = 'js,      programing,    frontEnd,cool'

  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  const expectedPost = {
    authorId: '123321',
    date: expect.any(String),
    content: 'js is freakin awesome!',
    tags: ['js', 'programing', 'frontEnd', 'cool'],
    title: 'I like javascript',
  }

  await flushPromises()

  expect(historyMock.push).toHaveBeenCalledTimes(1)
  expect(historyMock.push).toHaveBeenCalledWith('/')

  expect(apiMock.posts.create).toHaveBeenCalledTimes(1)
  expect(apiMock.posts.create).toHaveBeenCalledWith(expectedPost)
})

// TODO later...
test('snapshot', () => {})
