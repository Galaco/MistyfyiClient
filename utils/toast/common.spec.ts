import { normalizeResponse } from '@/utils/api/transform'
import { apiError, apiSuccess } from '@/utils/toast/common'

describe('apiError', () => {
  it('provides a correct error message when one is provided', () => {
    const resp = {
      code: 200,
      message: 'foo is a bar',
      body: 'egg'
    }

    const sut = normalizeResponse(resp)

    const msg = apiError(sut)

    expect(msg).toEqual(`An error occurred: ${resp.message}`)
  })

  it('provides a correct error message when none is provided', () => {
    const resp = {
      code: 200,
      message: '',
      body: 'egg'
    }
    const sut = normalizeResponse(resp)

    const msg = apiError(sut)

    expect(msg).toEqual('There was an issue communicating with the server.')
  })
})

describe('apiSuccess', () => {
  it('provides a correct message when one is provided', () => {
    const resp = {
      code: 200,
      message: 'foo is a bar',
      body: 'egg'
    }

    const sut = normalizeResponse(resp)

    const msg = apiSuccess(sut)

    expect(msg).toEqual(resp.message)
  })
})
