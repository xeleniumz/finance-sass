import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47] pb-2">
            Welcome Back!
          </h1>
          <p className="text-base text-[#7E8CA0]">Log in or create account to get back to your dashboard</p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 size={32} className="animate-spin text-muted-foreground"/>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-gradient-to-r from-blue-700 to-blue-500  hidden lg:flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Sign in illustration"
          width={200}
          height={200}
        />
      </div>
    </div>

  );
}