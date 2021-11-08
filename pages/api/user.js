import cookie from "cookie";

import { API_URL } from "@/config/index";

export default async function login(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });

    return;
  }

  if (!req.headers.cookie) {
    res.status(403).json({ message: "Not Authorized" });
  }

  const { token } = cookie.parse(req.headers.cookie);

  const strapiRes = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await strapiRes.json();

  if (!res.ok) {
    res.status(403).json({ message: "User forbidden" });

    return;
  }

  res.status(200).json({ user });
}
