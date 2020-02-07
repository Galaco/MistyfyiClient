import { normalizeResponse } from '@/utils/api/transform'

describe('normaliseResponse', () => {
  it('normalizes a successful api response', () => {
    const resp = {
      code: 200,
      message: 'foo',
      body: 'bar'
    }

    const sut = normalizeResponse(resp)
    expect(sut.code).toEqual(resp.code)
    expect(sut.message).toEqual(resp.message)
    expect(sut.body).toEqual(resp.body)
  })
})
