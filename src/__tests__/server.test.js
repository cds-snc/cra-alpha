const request = require('supertest')
const app = require('../server.js')

describe('Test server responses', () => {
  test('it should return 200 for the root path', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('it should return security-focused headers in reponses', async () => {
    const response = await request(app).get('/')

    /*
      More documentaion on each of these can be found here:
      - https://helmetjs.github.io/docs/
    */
    expect(response.headers['x-dns-prefetch-control']).toEqual('off')
    expect(response.headers['x-frame-options']).toEqual('SAMEORIGIN')
    expect(response.headers['strict-transport-security']).toEqual(
      'max-age=15552000; includeSubDomains',
    )
    expect(response.headers['x-download-options']).toEqual('noopen')
    expect(response.headers['x-content-type-options']).toEqual('nosniff')
    expect(response.headers['x-xss-protection']).toEqual('1; mode=block')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  test('it should return "Consent" in the h1 tag for /consent', async () => {
    const response = await request(app).get('/consent')
    expect(response.text).toContain('<h1>Consent</h1>')
  })

  test('it should return "Alpha" in the h1 tag for /alpha', async () => {
    const response = await request(app).get('/alpha')
    expect(response.text).toContain('<h1>Alpha</h1>')
  })

  test('it should return "Dashboard" in the h1 tag for /user', async () => {
    const response = await request(app).get('/user')
    expect(response.text).toContain('<h1>Dashboard</h1>')
  })
})
