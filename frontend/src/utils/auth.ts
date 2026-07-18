export const loginUser = async (email: string, password: string)  => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password}),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.console.error || "Login failed");
  }

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
}

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  if(!user){
    return null;
  }

  return JSON.parse(user)
}

export const isLoggedIn = () => {
  const token = localStorage.getItem("token")

  return !!token;
}