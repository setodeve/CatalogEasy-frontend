import { useEffect, useState } from 'react'
import {
  formatFileSize,
  lightenDarkenColor,
  useCSVReader,
} from 'react-papaparse'

const GREY = '#CCC'
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)'
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40,
)
const GREY_DIM = '#686868'

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    zIndex: 20,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    border: `2px dashed ${GREY}`,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
    fontSize: 12,
    zIndex: 20,
  },
  name: {
    backgroundColor: GREY_LIGHT,
    border: `2px dashed ${GREY}`,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
    zIndex: 20,
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
    border: `2px dashed ${GREY_DIM}`,
  },
  default: {
    border: `2px dashed ${GREY}`,
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
}

export default function CSVReader({ setUploadedData }) {
  const { CSVReader } = useCSVReader()
  const [uploadedList, setUploadedList] = useState([])

  useEffect(() => {}, [uploadedList])

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        const _uploadedData = results.data ?? []
        setUploadedList(_uploadedData.slice(1))
        setUploadedData(_uploadedData.slice(1))
      }}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDragLeave={(event) => {
        event.preventDefault()
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }) => (
        <div
          {...getRootProps()}
          style={{
            ...styles.zone,
            border: acceptedFile
              ? `2px dashed ${GREY_DIM}`
              : `2px dashed ${GREY}`,
          }}
          className="mb-4 flex"
        >
          {acceptedFile ? (
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <span className="text-lg">{acceptedFile.name}</span>
                <span className="px-4 text-lg"> - </span>
                <span className="mr-4 text-lg">
                  {formatFileSize(acceptedFile.size)}
                </span>
                <div
                  {...getRemoveFileProps()}
                  onMouseOver={() => {
                    getRemoveFileProps().style = {
                      color: REMOVE_HOVER_COLOR_LIGHT,
                    }
                  }}
                  onMouseOut={() => {
                    getRemoveFileProps().style = {
                      color: DEFAULT_REMOVE_HOVER_COLOR,
                    }
                  }}
                  onClick={(event) => {
                    getRemoveFileProps().onClick(event)
                    setUploadedList([])
                    setUploadedData([])
                  }}
                >
                  <Remove />
                </div>
              </div>
              <ProgressBar />
            </div>
          ) : (
            <span className="text-lg">
              クリックまたはドラッグ&ドロップでCSVファイルをアップロードしてください。
            </span>
          )}
        </div>
      )}
    </CSVReader>
  )
}
