import { describe, it, expect } from 'vitest'
import { splitArrayIntoChunksOfSix } from '@/utils/productInfo'

describe('splitArrayIntoChunksOfSix', () => {
  it('should split an array into chunks of six', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const result = splitArrayIntoChunksOfSix(array)
    expect(result).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ])
  })

  it('should handle arrays that do not perfectly divide by six', () => {
    const array = [1, 2, 3, 4, 5, 6, 7]
    const result = splitArrayIntoChunksOfSix(array)
    expect(result).toEqual([[1, 2, 3, 4, 5, 6], [7]])
  })

  it('should handle empty arrays', () => {
    const array: number[] = []
    const result = splitArrayIntoChunksOfSix(array)
    expect(result).toEqual([])
  })

  it('should handle arrays with exactly one chunk of six', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const result = splitArrayIntoChunksOfSix(array)
    expect(result).toEqual([[1, 2, 3, 4, 5, 6]])
  })

  it('should handle arrays with less than six items', () => {
    const array = [1, 2, 3]
    const result = splitArrayIntoChunksOfSix(array)
    expect(result).toEqual([[1, 2, 3]])
  })
})
