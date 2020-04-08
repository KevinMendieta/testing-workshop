// Basic unit test
import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

const onSubmit = jest.fn()

const flushPromises = () => {
  return new Promise(resolve => setTimeout(resolve, 0))
}

test('calls onSubmit with the username and password when submitted', async () => {
  const mockLoginData = {username: 'infernoskull', password: '12345'}
  const container = document.createElement('div')
  ReactDOM.render(<Login onSubmit={onSubmit} />, container)
  const form = container.querySelector('form')
  const {username, password} = form.elements
  username.value = mockLoginData.username
  password.value = mockLoginData.password

  form.dispatchEvent(new window.Event('submit'))

  await flushPromises()

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith(mockLoginData)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=kevin.mendieta.pe@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
