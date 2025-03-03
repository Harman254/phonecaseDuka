import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dashboard', href: '/dashboard' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Blog', href: '/blog' },
        { label: 'Support', href: '/support' },
      ],
    },
  ]

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <MaxWidthWrapper>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Description */}
            <div className="space-y-4">
              <Link href="/" className="flex font-semibold">
                Case <span className="text-primary">Cobra</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Empowering legal professionals with AI-driven case management solutions.
              </p>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold text-gray-900">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Case Cobra. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link 
                  href="/terms" 
                  className="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
                >
                  Terms
                </Link>
                <Link 
                  href="/privacy" 
                  className="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  href="/cookies" 
                  className="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
