import Image from 'next/image'
import { useState } from 'react'
export default function ImageUpload() {
  const [imgsSrc, setImgsSrc] = useState<string[]>([])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const result = reader.result
          if (typeof result === 'string') {
            setImgsSrc((imgs: string[]) => [...imgs, result])
          }
        }
        reader.onerror = () => {
          console.log(reader.error)
        }
      }
      console.log(imgsSrc, imgsSrc.length)
    }
  }

  return (
    <div>
      <input onChange={onChange} type="file" name="file" multiple />
      {imgsSrc.map((link, index) => (
        <Image
          key={index}
          src={link}
          alt={'image' + index}
          width="300"
          height="300"
        />
      ))}
    </div>
  )
}
