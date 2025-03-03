import { AccountSettings } from "@/components/account-settings"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { saveNewUser } from "@/lib/supabase/db";

export default async function AccountPage() {
  const {getUser} = getKindeServerSession();
  const kindeUser = await getUser();
  
  if(!kindeUser) {
    redirect("/api/auth/login");
  }
  
  // Only try to save if we have a user
  try {
    await saveNewUser(kindeUser);
  } catch (error) {
    console.error('Error checking/saving user:', error);
    // Handle error appropriately
  }
  
  // Transform Kinde user to match our User type
  
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <AccountSettings user={kindeUser} />
    </div>
  )
}

