// Normally you shouldn't need to break your tests up this much.
// Normally I'd just have a file called `auth` and have all my tests
// in that file. But I've split them up like this to make the workshop
// flow nicer with the demo and exercises.
// eslint-disable-next-line
import {generate} from '../utils'

describe('authentication', () => {
  let user
  beforeEach(() => {
    cy.logout()
      .createNewUser()
      .then((newUser) => (user = newUser))
      .visit('/')
  })

  it('should allow existing users to login', () => {
    cy.getByText('Login')
      .click()
      .getByLabelText('Username')
      .type(user.username)
      .getByLabelText('Password')
      .type(user.password)
      .getByText('submit')
      .click()
      .assertRoute('/')

    cy.getByTestId('username-display').should('contain', user.username)
  })

  //////// Elaboration & Feedback /////////
  // When you've finished with the exercises:
  // 1. Copy the URL below into your browser and fill out the form
  // 2. remove the `.skip` from the test below
  // 3. Change submitted from `false` to `true`
  // 4. And you're all done!
  /*
  http://ws.kcd.im/?ws=Testing&e=e2e%20register&em=kevin.mendieta.pe@gmail.com
  */
  it.skip('I submitted my elaboration and feedback', () => {
    const submitted = false // change this when you've submitted!
    expect(submitted).toBe(true)
  })
  ////////////////////////////////
})
