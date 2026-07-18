"use client";
import { useEffect, useState } from "react";
import { useLoginModalContext } from "@/context/LoginModalContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginModal = () => {
  const { isModalOpen, closeModal } = useLoginModalContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();
  const router = useRouter();

  const handleLogin = async ()  => {
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          method:"POST", headers:{"content-Type":"application/json"},
          body: JSON.stringify({email, password}),
        }
      );

      const data = await res.json();
      
      if(!res.ok){throw new Error(data.message || "Login Failed");}
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify({...data.user,role:data.role}));

      if(data.role === "admin"){router.push("/admin/dashboard");}
      if(res.ok){
        login(data.user, data.token)
        toast.success("Login successfull!")
        closeModal();
        setEmail("");
        setPassword("");
      }
      
      
    } catch(err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${isModalOpen ? "z-99999" : "hidden"
        } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={() => closeModal()}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                fill=""
              />
            </svg>
          </button>

          <div className="mt-9">
      <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5 text-center">
        Login
      </h2>
      {
        error && (
          <p className="text-red-500 mb-3">{error}</p>
        )
      }

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        <div className="mb-5.5">
          <label htmlFor="email" className="block mb-2.5">
            Email Address <span className="text-red">*</span>
          </label>

          <input
            type="email"
            
            placeholder="mounbagna@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5">
            Password <span className="text-red">*</span>
          </label>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            {
              loading ? "Logging in..." : "Login"
            }
        </button>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
