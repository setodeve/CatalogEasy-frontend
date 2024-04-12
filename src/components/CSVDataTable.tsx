import { useState } from 'react'
import CSVReader from './CSVReader'

export default function CSVDataTable() {
  // CSVファイルの内容を格納する用のstate
  const [uploadedList, setUploadedList] = useState()

  const handleUploadCsv = (data: any) => {
    const _formattedData = data
      .map((d: any) => {
        return {
          name: d[0],
          namekana: d[1],
          age: d[2],
          birthday: d[3],
          company: d[4],
        }
      })
      .filter((d: any) => d != null)

    setUploadedList(_formattedData)
  }

  const handleOnImport = async () => {
    console.log('handleOnImport')
    console.log(uploadedList)
  }
  return (
    <>
      <div>
        <div className="py-4 text-gray-600 dark:text-white">
          <CSVReader setUploadedData={handleUploadCsv} />
        </div>
        <div className="py-4 text-gray-600 dark:text-white">
          {uploadedList && uploadedList.length > 0 ? (
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      氏名
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      氏名（カナ）
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      年齢
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      生年月日
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      所属
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {uploadedList.map((d: any) => (
                    <tr key={d.name + d.namekana}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{d.name}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {d.namekana}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{d.age}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {d.birthday}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{d.company}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end">
          <button
            className="mr-1 flex justify-center rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-700"
            onClick={() => handleOnImport()}
          >
            インポート実行
          </button>
        </div>
      </div>
    </>
  )
}
