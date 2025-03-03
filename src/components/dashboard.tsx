"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomizationOptions } from "@/components/customization-options"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { toast } from "./ui/use-toast"
import { PhoneCasePreview } from "./phone-case-preview"

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [phoneModel, setPhoneModel] = useState("iphone-14")
  const [caseColor, setCaseColor] = useState("clear")

  const handleAddToCart = () => {
    if (!uploadedImage) {
      toast({
        title: "Error",
        description: "Please upload an image first",
      })
      return
    }

    toast({
      title: "Success",
      description: "Item added to cart",
    })
  }

  const handleImageUploaded = (imageUrl: string | null) => {
    setUploadedImage(imageUrl)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Phone Case Customizer</h1>
          <p className="text-muted-foreground">Upload your image and customize your perfect phone case</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="design" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="design" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Customize Your Case</CardTitle>
                    <CardDescription>Select your phone model, case color, and upload an image</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomizationOptions
                      phoneModel={phoneModel}
                      setPhoneModel={setPhoneModel}
                      caseColor={caseColor}
                      setCaseColor={setCaseColor}
                      onImageUploaded={handleImageUploaded}
                      currentImage={uploadedImage}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview Your Design</CardTitle>
                    <CardDescription>This is how your custom phone case will look</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <PhoneCasePreview 
                      image={uploadedImage} 
                      phoneModel={phoneModel} 
                      caseColor={caseColor} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Custom Case</CardTitle>
                <CardDescription>Review your design before checkout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <PhoneCasePreview 
                    image={uploadedImage} 
                    phoneModel={phoneModel} 
                    caseColor={caseColor} 
                    small 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Phone Model:</span>
                    <span className="font-medium">{phoneModel.replace("-", " ").toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Case Color:</span>
                    <span className="font-medium capitalize">{caseColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">$24.99</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={!uploadedImage}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

