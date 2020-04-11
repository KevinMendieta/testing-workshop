// add a beforeEach for cleaning up state and intitializing the API
import React from 'react'
import {Simulate} from 'react-dom/test-utils'
import {renderWithRouter, generate} from 'til-client-test-utils'
import axiosMock from 'axios'
import {render, cleanup} from 'react-testing-library'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('login as an existing user', async () => {
  // render the app with the router provider and custom history
  const {
    container,
    getByTestId,
    getByText,
    finishLoading,
    getByLabelText,
  } = renderWithRouter(<App />)
  // wait for the app to finish loading the mocked requests
  await finishLoading()

  // navigate to login by clicking login-link
  const leftClick = {button: 0}
  Simulate.click(getByText('Login'), leftClick)
  expect(window.location.href).toContain('login')
  // fill out the form
  const fakeUser = generate.loginForm()
  const usernameNode = getByLabelText('Username')
  const passwordNode = getByLabelText('Password')
  const formWrapper = container.querySelector('form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // submit form
  const {post} = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  Simulate.submit(formWrapper)

  await finishLoading()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/login',
    fakeUser,
  )
  // asserts
  expect(window.localStorage.getItem('token')).toBe(token)
  expect(window.location.href).toBe('https://til.test.com/')
  expect(getByTestId('username-display').textContent).toEqual(fakeUser.username)
  expect(getByText('Logout')).toBeTruthy()
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=app.login&em=kevin.mendieta.pe@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
