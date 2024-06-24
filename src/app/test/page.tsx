"use client"

import { useEffect, useState } from "react";

export default function Page() {

  const [token, setToken] = useState<null | string>();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <div>page</div>
  )
}
