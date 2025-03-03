"use client"

interface iPhone14PreviewProps {
  image: string | null
  caseColor: string
  small?: boolean
}

export function iPhone14Preview({ image, caseColor, small = false }: iPhone14PreviewProps) {
  const containerSize = small ? "w-40" : "w-80"
  const cameraSize = small ? "w-8 h-8" : "w-16 h-16"
  
  // Map case colors to actual CSS colors/gradients
  const caseColorStyles = {
    clear: "bg-opacity-20 bg-gray-100 backdrop-blur-sm",
    black: "bg-black",
    white: "bg-gray-100",
    blue: "bg-blue-500",
    red: "bg-red-500"
  }

  return (
    <div className={`relative ${containerSize} aspect-[9/19]`}>
      {/* Phone frame */}
      <div 
        className={`absolute inset-0 rounded-[3rem] border-[8px] border-gray-800 overflow-hidden
          ${caseColorStyles[caseColor as keyof typeof caseColorStyles]}`}
      >
        {/* Uploaded image as background */}
        {image && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[3%] bg-black rounded-b-2xl" />
      </div>

      {/* Camera module */}
      <div className={`absolute top-4 left-4 ${cameraSize} bg-gray-900 rounded-2xl p-1`}>
        <div className="grid grid-cols-2 gap-1 h-full">
          <div className="bg-black rounded-full"></div>
          <div className="bg-black rounded-full"></div>
          <div className="bg-black rounded-full"></div>
          <div className="flex items-center justify-center">
            <div className="bg-black rounded-full w-3/4 h-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 