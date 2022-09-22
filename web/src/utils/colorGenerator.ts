// const tailwindColorNames = ['amber', 'teal', 'violet', 'blue', 'rose']
// const tailwindShades = ['300', '400', '500', '600']

const colorOptions = [
  'bg-amber-400',
  'bg-amber-500',
  'bg-amber-600',
  'bg-teal-400',
  'bg-teal-500',
  'bg-teal-600',
  'bg-violet-400',
  'bg-violet-500',
  'bg-violet-600',
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600',
  'bg-rose-400',
  'bg-rose-500',
  'bg-rose-600',
]

type ColorGeneratorProps = {
  numColors: number
  prefix?: string
}

export function colorGenerator({ numColors }: ColorGeneratorProps) {
  let colors: string[] = []

  for (let i = 0; i < numColors; i++) {
    colors = [
      ...colors,
      colorOptions[Math.floor(Math.random() * colorOptions.length)],
    ]
  }

  return colors
}
