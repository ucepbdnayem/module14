"use client"
import Navber from '@/components/navber'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Authentication, Token Handling, and Email Integration in a Next.js Application',
  description: 'You are tasked with building a secure authentication system for a Next.js application. Additionally, you need to implement token handling, email verification, and redirection for unauthorised users. Below are the tasks you need to accomplish',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <Navber></Navber>
            <div className='bg-white min-h-screen flex items-center'>
                {children}
                <ProgressBar
                  height="4px"
                  color="#fffd00"
                  options={{ showSpinner: false }}
                  shallowRouting
                />
            </div>
            <Footer></Footer>
        </body>
    </html>
  )
}
