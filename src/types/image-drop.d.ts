export type ImageDropProps = {
  index: number
  change: (index: number, src: string | null, id: string | null) => void
}
