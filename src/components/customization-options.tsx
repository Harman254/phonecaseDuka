"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PhoneCasePreview } from "@/components/phone-case-preview"
import { ImageUploader } from "@/components/image-uploader"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

interface CustomizationOptionsProps {
  phoneModel: string
  setPhoneModel: (model: string) => void
  caseColor: string
  setCaseColor: (color: string) => void
  onImageUploaded: (imageUrl: string | null) => void
  currentImage: string | null
}

// Define color mapping for consistent styling
const colorStyles = {
  clear: "bg-gradient-to-br from-gray-100/30 to-gray-300/30",
  black: "bg-black",
  white: "bg-white",
  blue: "bg-blue-500",
  red: "bg-red-700",
} as const

type ColorOption = keyof typeof colorStyles

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function CustomizationOptions({
  phoneModel,
  setPhoneModel,
  caseColor,
  setCaseColor,
  onImageUploaded,
  currentImage,
}: CustomizationOptionsProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showUploader, setShowUploader] = useState(true)

  const colorOptions: ColorOption[] = ['clear', 'black', 'white', 'blue', 'red']

  // Fetch the most recent uploaded image
  const fetchRecentImage = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('case_images')
      .select('image_url')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (data && !error) {
      setUploadedImage(data.image_url)
      setShowUploader(false)
    }
  }

  // Handle successful image upload
  const handleImageUploaded = (imageUrl: string | null) => {
    if (imageUrl) {
      setUploadedImage(imageUrl)
      setShowUploader(false)
      onImageUploaded(imageUrl)
    }
    setIsUploading(false)
  }

  // Reset image upload state
  const handleNewUpload = () => {
    setShowUploader(true)
    setIsUploading(false)
  }

  // Fetch recent image on component mount
  useEffect(() => {
    fetchRecentImage()
  }, [])

  return (
    <div className="grid gap-8 md:grid-cols-[1fr,400px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone-model">Phone Model</Label>
          <Select value={phoneModel} onValueChange={setPhoneModel}>
            <SelectTrigger id="phone-model">
              <SelectValue placeholder="Select phone model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iphone-14">iPhone 14</SelectItem>
              <SelectItem value="iphone-13">iPhone 13</SelectItem>
              <SelectItem value="samsung-s22">Samsung S22</SelectItem>
              <SelectItem value="pixel-7">Google Pixel 7</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Case Color</Label>
          <RadioGroup value={caseColor} onValueChange={setCaseColor} className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <RadioGroupItem value={color} id={color} className="peer sr-only" />
                <Label
                  htmlFor={color}
                  className={`
                    flex h-10 w-10 cursor-pointer items-center justify-center 
                    rounded-full border-2 ${colorStyles[color]}
                    peer-data-[state=checked]:border-primary
                    ${color === 'white' ? 'border-gray-200' : 'border-transparent'}
                  `}
                />
                <span className="text-xs capitalize">{color}</span>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Case Image</Label>
            {!showUploader && (
              <button
                onClick={handleNewUpload}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Upload New Image
              </button>
            )}
          </div>
          
          {showUploader ? (
            <ImageUploader 
              onImageUploaded={handleImageUploaded}
              onUploadStart={() => setIsUploading(true)}
            />
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded case image"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex items-center justify-center">
        <PhoneCasePreview 
          phoneModel={phoneModel}
          caseColor={caseColor}
          image={uploadedImage}
        />
      </div>
    </div>
  )
}

