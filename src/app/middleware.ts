import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set(
        "Content-Security-Policy",
        [
            "default-src 'self';",
            "script-src 'self' https://www.google.com https://www.gstatic.com;",
            "style-src 'self' 'unsafe-inline';",
            "img-src 'self' data:;",
            "font-src 'self';",
            "frame-src https://www.google.com https://www.gstatic.com;", // reCAPTCHA iframe
        ].join(" ")
    );

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
