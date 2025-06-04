'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          
          {/* Left Section */}
          <div>
            {/* <h3 className="text-2xl font-bold text-blue-500">BabyNameBlessing</h3> */}
            <img src="/1.png" alt="logo" className="w-20 rounded mb-4 bg-white" />
            <p className="text-gray-400 mt-2 max-w-sm">
              Finding meaningful names for your blessing with love and culture.
            </p>

          
          </div>

          {/* Right Section */}
          <div className="flex space-x-8 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition duration-300">
              Privacy Policy
            </Link>
              
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition duration-300">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} <span className="text-blue-500">BabyNameBlessing.com</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
