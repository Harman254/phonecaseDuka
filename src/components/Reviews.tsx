import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Star } from 'lucide-react'

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Legal Professional",
      content: "Case Cobra has revolutionized how I handle case documentation. The AI-powered analysis saves hours of work.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Law Firm Partner",
      content: "An invaluable tool for our practice. The document processing and analysis features are exceptional.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Paralegal",
      content: "The interface is intuitive and the AI insights are incredibly helpful. Highly recommend!",
      rating: 5,
    }
  ]

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16">
      <MaxWidthWrapper>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Legal Professionals
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what our users have to say about Case Cobra
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex items-center space-x-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                &quot;{review.content}&quot;
              </p>

              <div className="mt-6">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-base font-semibold text-gray-600">
            Join thousands of satisfied legal professionals using Case Cobra
          </p>
          <a
            href="/dashboard"
            className="mt-4 inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Get Started Today
          </a>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Reviews