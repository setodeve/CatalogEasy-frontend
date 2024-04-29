export interface resultType {
  data: string[]
  error: string[]
  meta: string[]
}

export interface CSVReaderProps {
  setUploadedData: (data: string[][]) => void
}
