"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login, AppError } from "./server/auth";
export async function loginPreviewAction(formData: FormData) {
  let token: string;
  try {
    token = await login(
      String(formData.get("email") ?? ""),
      String(formData.get("password") ?? ""),
    );
  } catch (e) {
    redirect(
      "/login?status=" +
        (e instanceof AppError
          ? e.status === 429
            ? "limited"
            : "invalid"
          : "unavailable"),
    );
  }
  (await cookies()).set("seed_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.APP_ORIGIN?.startsWith("https:") ?? false,
    path: "/",
    maxAge: 28800,
  });
  redirect("/workspace");
}
export async function signupPreviewAction() {
  redirect("/login?status=provisioned");
}
