"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, Loader2 } from "lucide-react"
import { toast } from "./ui/use-toast"
import { uploadImage, deleteImage } from "@/actions/case-images"


interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string | null) => void
  onUploadStart?: () => void
}

interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

export function ImageUploader({ onImageUploaded, onUploadStart }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, or GIF)",
      })
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadImage(formData) as UploadResponse

      if (!result.success || !result.url) {
        throw new Error(result.error || 'Upload failed')
      }

      setPreviewUrl(result.url)
      onImageUploaded(result.url)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
      })
      setPreviewUrl(null)
      onImageUploaded(null)
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = async () => {
    if (!previewUrl) return

    try {
      setIsUploading(true)
      const filePath = previewUrl.split('/').pop()
      
      if (filePath) {
        const result = await deleteImage(filePath)
        
        if (!result.success) {
          throw new Error(result.error)
        }

        toast({
          title: "Success",
          description: "Image removed successfully",
        })
      }

      setPreviewUrl(null)
      onImageUploaded(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove image",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {!previewUrl ? (
        <Card
          className={`border-2 border-dashed p-6 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          } relative`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={async (e) => {
            e.preventDefault()
            setIsDragging(false)
            const file = e.dataTransfer.files?.[0]
            if (file) await processFile(file)
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            {isUploading ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Uploading...</h3>
                </div>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Drag & drop your image here</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG and GIF files. Max file size 5MB.
                  </p>
                </div>
              </>
            )}
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="secondary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Browse Files"}
            </Button>
          </div>
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) processFile(file)
            }}
            disabled={isUploading}
          />
        </Card>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-auto max-h-[300px] w-full rounded-md object-contain"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute right-2 top-2" 
            onClick={removeImage}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}


