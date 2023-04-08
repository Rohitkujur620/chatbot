import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabase";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && pathname.startsWith("/chat")) {
    const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  console.log(process.env.NODE_ENV);

  if (session && (pathname === "/" || pathname === "/#")) {
    console.log(pathname);
    console.log("redirecting to chat");
    const url = new URL(req.url);
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  return res;
}
