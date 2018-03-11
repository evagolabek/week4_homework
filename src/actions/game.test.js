import { CREATE_GAME, MOVE } from './types'
import { createGame, move } from './game'

describe('createGame(size)', () => {
  const action = createGame(4)

  it('has the right type', () => {
    expect(action.type).toEqual(CREATE_GAME)
  })

  describe('its payload', () => {
    it('has a board of the right size', () => {
      expect(action.payload.board.length).toEqual(4)
    })

    it('has the locked squares', () => {
      expect(action.payload.locked.length).toEqual(4)
    })
  })
})

describe('move(row, col, value)', () => {
  const [row, col] = [0, 1]
  const action = move(row, col)

//checks that the action type is equal to MOVE
  it('has the right type', () => {
    expect(action.type).toEqual(MOVE)
  })
//checks that the output inside action.payload.row = input row
  describe('its payload', () => {
    it('has the row', () => {
      expect(action.payload.row).toEqual(row)
    })

    it('has the col', () => {
      expect(action.payload.col).toEqual(col)
    })
//checks if payload had only rows and columns
    it('has only those properties', () => {
      expect(Object.keys(action.payload)).toEqual(['row', 'col'])
    })
  })
})
