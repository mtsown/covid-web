import reducer from '../../redux/appSlice';

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isLoading: false
      }
    )
  })

  it('should handle toggleGlobalLoading', () => {
    expect(
      reducer({ isLoading: false }, {
        type: 'app/toggleGlobalLoading'
      })
    ).toEqual(
      {
        isLoading: true
      }
    )

    expect(
      reducer({ isLoading: true }, {
        type: 'app/toggleGlobalLoading'
      })
    ).toEqual(
      {
        isLoading: false
      }
    )
  })
})