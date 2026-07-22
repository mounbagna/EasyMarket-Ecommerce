import React, { useState,useEffect } from "react";

import {getImageUrl} from "@/utils/normalizedUtils"
import { Ban } from "lucide-react";

const SingleShopOwner = () => {
   const [shops,setShops] = useState<any>([]);

    const loadShops =()=>{
        const token = localStorage.getItem("token");
        fetch("https://easymarket-backend.onrender.com/admin/active-shops",{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }).then(res=>res.json()).then(data=>{
          setShops(Array.isArray(data)?data:[]);})
    }

    useEffect(() => {
        loadShops();
    },[])

    const suspendShop = async(id:number)=>{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${id}/suspend`,{method:"PUT"});
      loadShops();  
    };
    

  return (
    <div>
      {shops.map((shop) => (
    <div key={shop.id} className="flex items-center border-t border-gray-3 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <img width={200} height={200} 
              src={getImageUrl(Array.isArray(shop.image) ? shop.image[0] : shop.image)} alt="shop owner" />
            </div>
            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <a href="#"> {shop.shop_name} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="text-dark">{shop.email}</p>
      </div>

      <div className="min-w-[275px]">
        <p className="text-dark">{shop.status}</p>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">{shop.address}</p>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">{shop.registration_paid}</p>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">{shop.monthly_paid_until}</p>
      </div>

      <div className="min-w-[200px]">
        <p className="text-dark">{shop.created_at}</p>
      </div>

      <div className="min-w-[50px] flex justify-end gap-4">
        <button
          onClick={() => suspendShop(shop.id)}
          className="bg-gray text-yellow px-3 py-2 rounded flex gap1 hover:border-dark hover:text-red"
        >
          <Ban size={16}/>Suspend
        </button>

       
      </div>
    </div>))} 
    </div>
  );
};

export default SingleShopOwner;
