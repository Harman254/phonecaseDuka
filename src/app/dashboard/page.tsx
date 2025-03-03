import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Phone Case Customizer",
  description: "Upload your image and customize your phone case",
}



export default async function Home() {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        redirect("/api/auth/login");
    }
  

  return (
    <main className="min-h-screen bg-background">
      <Dashboard />
    </main>
  )
}

