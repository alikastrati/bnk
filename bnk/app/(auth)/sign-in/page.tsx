'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
// Use this later when redirecting to the home page
// import { motion, AnimatePresence } from 'framer-motion' // Import motion and AnimatePresence
import { Progress } from '@/components/ui/progress' // Import Progress component
import { ThemeToggle } from '@/components/ThemeButtonTrigger'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [progress, setProgress] = useState(0) // State for progress bar
  const [isLoading, setIsLoading] = useState(false) // State for loading

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setProgress(0)

    // Simulate a loading process with a progress bar
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          setIsLoading(false)
          // Redirect (AFTER LOADING)
          return 100
        }
        return oldProgress + 10
      })
    }, 200)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative flex-1 bg-primary md:w-1/2">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Banking illustration"
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-primary/60" />

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <h1 className="text-4xl font-bold text-white md:text-6xl">BNK</h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold ">Sign in to your account</h2>
          </div>
          <form onSubmit={handleSignIn} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input id="email-address" name="email" type="email" autoComplete="email" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          {/* Progress Bar */}
          {isLoading && <Progress value={progress} className="w-full" />}

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-primary hover:text-primary/80">
                Sign up
              </Link>
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}
