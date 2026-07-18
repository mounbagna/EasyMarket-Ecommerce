"use client";

import { useEffect, useState } from "react";
import { useSignupModalContext } from "@/context/SignupModalContext";
import { useAuth } from "@/context/AuthContext";
import {toast} from "react-toastify";

const SignupModal = () => {

  const { isModalOpen, closeModal } = useSignupModalContext();
  const {login} = useAuth();

  // ---------------- STATE ----------------
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [shopCategoryId, setShopCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState<File[]>([]); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [shopName, setShopName] = useState("");
    const [shopDescription, setShopDescription] = useState("");


    // ---------------- SUBMIT ----------------
    const handleSubmit = async () => {
      
      const formData = new FormData();
  
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("shop_name", shopName);
      formData.append("shop_category_id", shopCategoryId);
      formData.append("password", password);

      image.forEach((file) => {
      formData.append("image", file);
    });
  
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();

        if(!res.ok){
        toast.error(data.message);
      }

      if (data.token && data.user){
          login(data.user,data.token);
        }
        
        closeModal();
  
        // optional reset
        setFirstName("");
        setLastName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setShopName("");
        setShopDescription("");
        setPassword("");
        setImage([]);
  
        toast.success(data.message);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then(res => res.json()).then(data => setCategories(data));
  },[]);

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
        Create Account
      </h2>

      {
        error && (
          <p className="text-red-500 mb-3">{error}</p>
        )
      }

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block mb-2.5">
              First Name <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Mounbagna"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block mb-2.5">
              Last Name <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Abasse"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label htmlFor="email" className="block mb-2.5">
            Email Address <span className="text-red">*</span>
          </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="mounbagna@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="block mb-2.5">
            Street Address
            <span className="text-red">*</span>
          </label>

          <input
            type="text"
            name="address"
            id="address"
            placeholder="House number and street name"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2.5">
            Phone <span className="text-red">*</span>
          </label>

          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="671 681 830"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="w-full">
            <label htmlFor="shop_name" className="block mb-2.5">
              Shop Name <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="shop_name"
              id="shop_name"
              placeholder="Abasse Shopping"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>

          <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  {/* CATEGORY */}
          <select
          value={shopCategoryId}
          onChange={(e) => setShopCategoryId(e.target.value)}
          className="w-full border rounded-lg p-3"
          >
          <option value="">Select Shop Category</option>
          {categories.map((category) =>(
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          </select>
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

        

        {/* MULTIPLE IMAGES */}
        <div className="mb-5">
          <label htmlFor="logo" className="block mb-2.5">
            Logo <span className="text-red">*</span>
          </label>

          <input
            type="file"
            accept="/*"
            multiple
            onChange={(e) =>
              setImage(Array.from(e.target.files || []))
            }
            className="w-full"
          />
          </div>

        <button
          onClick={handleSubmit}
          className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >{
              loading ? "Creating..." : "Sign Up"
            }
        </button>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
