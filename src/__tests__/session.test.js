const session = require('supertest-session')
const app = require('../server.js')

const validNames = [
  'a',
  'j',
  'l',
  'k',
  'K',
  'KIM',
  'KIM    \t\t  \n ', // trailing whitespace doesn't matter
  'kim', // captialization isn't important
  'Avril',
  'k h1ry3hr23yr8723r', // as long as the first name is valid, it'll work
  'kim 12u482193u1ueh12e9',
  'AvRiL ue892u3218e8uej12ien',
  'Avril Douglas Campbell',
  'John Caldwell Abbott',
  'Arthur Meighen',
  'Louis Stephen St. Laurent',
]

validNames.map(name => {
  it(`It should log in to the dashboard with name: "${name}"`, async () => {
    const response = await session(app)
      .post('/login')
      .send({ name })
    expect(response.statusCode).toBe(302)
    expect(response.headers['location']).toEqual('/dashboard')
  })
})

const invalidNames = [
  'b', // only some letters are allowed
  'kk',
  'Ki',
  ' KIM', // leading whitespace will fail
  'Avri', // impartial names are generally going to fail
  'Douglas', // middle names don't work
  'Campbell', // last names don't work
  'vril Douglas Campbell', // the first name needs to be right
]

invalidNames.map(name => {
  it(`It should fail to log in to the dashboard with name: "${name}"`, async () => {
    const response = await session(app)
      .post('/login')
      .send({ name })

    expect(response.statusCode).toBe(422)
    expect(response.text).toContain('There is a problem')
    expect(response.text).toContain('Can’t find that name. 🤷')
  })
})

it('It should fail to log in to the dashboard an empty name', async () => {
  const response = await session(app)
    .post('/login')
    .send({ name: '' })

  expect(response.statusCode).toBe(422)
  expect(response.text).toContain('There is a problem')
  expect(response.text).toContain('Name can’t be empty')
})

it('It should log into the dashboard with "/kim" or "/avril', async () => {
  const urls = ['/kim', '/avril']
  urls.map(async url => {
    const response = await session(app).get(url)

    expect(response.statusCode).toBe(302)
    expect(response.headers['location']).toEqual('/dashboard')
  })
})

const authUrls = ['/dashboard', '/edit', '/confirmation']

describe('Before logging in', () => {
  authUrls.map(url => {
    it(`it should redirect from "${url}" to "/login"`, async () => {
      const response = await session(app).get(url)
      expect(response.statusCode).toBe(302)
      expect(response.headers['location']).toEqual('/login')
    })
  })
})

describe('After logging in', () => {
  let authSession

  beforeEach(async () => {
    authSession = session(app)
    const response = await authSession.post('/login').send({ name: 'Kim' })
    expect(response.statusCode).toBe(302)
  })

  authUrls.map(url => {
    it(`it should get "${url}"`, async () => {
      const response = await authSession.get(url)
      expect(response.statusCode).toBe(200)
    })
  })
})
