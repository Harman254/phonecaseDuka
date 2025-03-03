

export type User = {
  family_name: string | null
  given_name: string | null
  picture: string | null
  email: string
  id: string
  properties: {
    city?: string
    industry?: string
    job_title?: string
    middle_name?: string
    postcode?: string
    salutation?: string
    state_region?: string
    street_address?: string
    street_address_2?: string
  }
}