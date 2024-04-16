export const splitArrayIntoChunksOfTwo = <T>(array: T[]): T[][] => {
  return array.reduce((resultArray: T[][], item, index) => {
    const chunkIndex = Math.floor(index / 2)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }
    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}
