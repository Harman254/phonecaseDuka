"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "./ui/use-toast"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types"

const profileFormSchema = z.object({
  family_name: z.string().min(1, "Family name is required"),
  given_name: z.string().min(1, "Given name is required"),
  middle_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  salutation: z.string().optional(),
  job_title: z.string().optional(),
  industry: z.string().optional(),
  city: z.string().optional(),
  state_region: z.string().optional(),
  postcode: z.string().optional(),
  street_address: z.string().optional(),
  street_address_2: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface AccountSettingsProps {
  user: KindeUser
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      family_name: user?.family_name || "",
      given_name: user?.given_name || "",
      middle_name: "",
      email: user?.email || "",
      salutation: user?.given_name ? `Mr` : "",
      job_title: "",
      industry: "",
      city: "",
      state_region: "",
      postcode: "",
      street_address: "",
      street_address_2: "",
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    const given = user?.given_name?.charAt(0) || ""
    const family = user?.family_name?.charAt(0) || ""
    return `${given}${family}`
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
      </TabsList>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and professional details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={user?.picture || ""}
                      alt={`${user?.given_name || ''} ${user?.family_name || ''}`}
                    />
                    <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a new profile picture or remove the current one.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" type="button">
                        Upload
                      </Button>
                      <Button variant="outline" size="sm" type="button">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="salutation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salutation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a salutation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mr">Mr</SelectItem>
                            <SelectItem value="Mrs">Mrs</SelectItem>
                            <SelectItem value="Ms">Ms</SelectItem>
                            <SelectItem value="Dr">Dr</SelectItem>
                            <SelectItem value="Prof">Prof</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div></div>

                  <FormField
                    control={form.control}
                    name="given_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Given Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your given name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your middle name (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="family_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your family name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your industry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Update your address and location details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="street_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street_address_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Apartment, suite, etc. (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state_region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Region</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state or region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal/Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </Tabs>
  )
}

