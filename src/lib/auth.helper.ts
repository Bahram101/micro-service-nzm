export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (e) {
    console.error("Logout request failed", e);
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  }
}
