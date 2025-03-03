"use client"

import { iPhone14Preview } from "./phone-previews/iPhone14Preview"

interface PhoneCasePreviewProps {
  image: string | null
  phoneModel: string
  caseColor: string
  small?: boolean
}

const colorStyles = {
  clear: "bg-gradient-to-br from-gray-100/10 to-gray-300/10",
  black: "bg-black/40",
  white: "bg-white/40",
  blue: "bg-blue-500/40",
  red: "bg-red-500/40",
} as const

export function PhoneCasePreview({ image, phoneModel, caseColor, small }: PhoneCasePreviewProps) {
  if (phoneModel === "iphone-14") {
    return (
      <div className={small ? "scale-50 origin-top" : ""}>
        <div className="relative mx-auto w-[280px]">
          {/* Phone back panel */}
          <div className={`
            relative
            h-[570px]
            w-[280px]
            rounded-[48px]
            bg-[#f5f5f7]
            shadow-xl
          `}>
            {/* Case overlay with image */}
            <div className={`
              absolute
              inset-0
              rounded-[48px]
              overflow-hidden
            `}>
              {/* User's image */}
              {image && (
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${image})`,
                    imageRendering: 'crisp-edges',
                    backfaceVisibility: 'hidden',
                  }}
                />
              )}
              {/* Case color overlay */}
              <div className={`
                absolute
                inset-0
                backdrop-blur-[0.5px]
                ${colorStyles[caseColor as keyof typeof colorStyles]}
                transition-colors
                duration-200
              `} />
            </div>

            {/* Camera Module */}
            <div className="absolute -right-2 top-12 h-[115px] w-[115px] rounded-[24px] bg-[#1c1c1e] p-4 z-20">
              <div className="grid grid-cols-2 gap-2">
                {/* Main Camera */}
                <div className="h-[40px] w-[40px] rounded-full bg-[#262629]">
                  <div className="h-full w-full rounded-full bg-[#121214]/50 p-2">
                    <div className="h-full w-full rounded-full bg-[#0a0a0b]" />
                  </div>
                </div>
                {/* Ultra Wide */}
                <div className="h-[40px] w-[40px] rounded-full bg-[#262629]">
                  <div className="h-full w-full rounded-full bg-[#121214]/50 p-2">
                    <div className="h-full w-full rounded-full bg-[#0a0a0b]" />
                  </div>
                </div>
                {/* Telephoto */}
                <div className="h-[40px] w-[40px] rounded-full bg-[#262629]">
                  <div className="h-full w-full rounded-full bg-[#121214]/50 p-2">
                    <div className="h-full w-full rounded-full bg-[#0a0a0b]" />
                  </div>
                </div>
                {/* Flash and LiDAR */}
                <div className="flex flex-col gap-1">
                  <div className="h-[18px] w-[18px] rounded-full bg-[#262629]" />
                  <div className="h-[18px] w-[18px] rounded-full bg-[#262629]" />
                </div>
              </div>
            </div>

            {/* Apple Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="h-8 w-8 opacity-20">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback for other models
  return (
    <div className={`relative ${small ? "w-40" : "w-80"} aspect-[9/19] rounded-3xl overflow-hidden bg-[#f5f5f7]`}>
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${image})`,
            imageRendering: 'crisp-edges',
          }}
        />
      )}
      <div className={`absolute inset-0 ${colorStyles[caseColor as keyof typeof colorStyles]}`} />
    </div>
  )
}

