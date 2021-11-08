import cookie from "cookie";

import { API_URL } from "@/config/index";

export default async function register(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end({ message: `Method ${req.method} not allowed` });

    return;
  }

  const { username, email, password } = req.body;

  const strapiRes = await fetch(`${API_URL}auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await strapiRes.json();

  if (!strapiRes.ok) {
    res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });

    return;
  }

  // Set cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ user: data.user });
}
