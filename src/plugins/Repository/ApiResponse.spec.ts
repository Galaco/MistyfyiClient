import ApiResponse from '@/plugins/Repository/ApiResponse'

describe('ApiResponse', () => {
  it('determines if the response was successful', () => {
    const sut = new ApiResponse(200, '', '')
    expect(sut.wasSuccessful()).toEqual(true)
  })

  it('determines if the response was a failure', () => {
    const sut = new ApiResponse(400, '', '')
    expect(sut.wasSuccessful()).toEqual(false)
  })
})
