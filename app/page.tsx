import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";

export default async function Home() {
  if ((await cookies()).has("seed_session")) redirect("/workspace");
  return <LandingPage />;
}
