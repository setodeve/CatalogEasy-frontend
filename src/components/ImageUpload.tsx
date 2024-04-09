import { default as Image } from 'next/image'
import { useRef, useState } from 'react'
export default function ImageUpload() {
  const [imgsSrc, setImgsSrc] = useState<string[]>([])
  const imageRef = useRef<HTMLInputElement>(null)
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
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (imageRef.current && imageRef.current.files) {
      const formData = new FormData()
      for (let i = 0; i < imageRef.current.files.length; i++) {
        formData.append(`image[]`, imageRef.current.files[i])
      }

      const res = await fetch(`http://0.0.0.0:8080/api/product_images`, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        console.log('Image uploaded')
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={onChange} type="file" multiple ref={imageRef} />
        <input type="submit" value="Upload" />
      </form>

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
