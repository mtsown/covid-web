import reducer from '../../redux/usersSlice';

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        id: 'admin',
        password: 'admin'
      }
    ])
  })

  it('should handle addUser', () => {
    expect(
      reducer([{ id: 'admin', password: 'admin' }], {
        type: 'users/addUser',
        payload: {
          username: 'tuanson',
          password: 'tuanson'
        }
      })
    ).toEqual([
      {
        id: 'admin',
        password: 'admin'
      },
      {
        id: 'tuanson',
        password: 'tuanson'
      }
    ])
  })
})