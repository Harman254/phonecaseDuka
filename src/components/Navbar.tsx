import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { saveNewUser } from "@/lib/supabase/db";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  // If we have a user, try to save them (only saves if they're new)
  if (user) {
    try {
      await saveNewUser(user);
    } catch (error) {
      console.error('Error checking/saving user:', error);
      // Handle error silently to not disrupt navigation
    }
  }
  
  return (
    <nav className="sticky h-14 z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Case <span className="text-primary">Cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Out
                </Link>
                <Link
                  href="/account"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Account
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className="h-5 w-5 ml-1.5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Up
                </Link>

                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className="h-5 w-5 ml-1.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
