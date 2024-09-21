"use client"

import Link from "next/link"
import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "./main-nav"

export function SiteHeader() {
  // Mock function for proof verification, should be replaced with your server-side verification logic
  const verifyProof = async (proof: ISuccessResult) => {
    // Replace this with your actual server route to verify the proof
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proof }),
      })
      console.log("Response:", response)

      console.log("Proof:", proof)
      if (!response.ok) {
        throw new Error("Verification failed")
      }

      console.log("Proof verified successfully")
    } catch (error) {
      console.error("Error verifying proof:", error)
    }
  }

  // Handle success callback after successful verification
  const onSuccess = (req) => {
    const proof = req.body
    const app_id = process.env.APP_ID
    const action = process.env.ACTION_ID
    console.log(proof, app_id, action)
    // const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse
    console.log("Verification successful!")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-2">
            <MainNav items={siteConfig.mainNav} />
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <DynamicWidget />

          <IDKitWidget
            app_id={process.env.APP_ID || "app_undefined"}
            action={process.env.ACTION_ID || "action_undefined"}
            verification_level={VerificationLevel.Orb}
            handleVerify={verifyProof}
            onSuccess={onSuccess}
          >
            {({ open }) => (
              <Button onClick={open} variant="outline">
                Verify with World ID
              </Button>
            )}
          </IDKitWidget>
        </div>
      </div>
    </header>
  )
}
