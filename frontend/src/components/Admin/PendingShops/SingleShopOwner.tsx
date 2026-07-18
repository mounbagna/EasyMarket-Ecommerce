import React, { useState,useEffect } from "react";

import {getImageUrl} from "@/utils/normalizedUtils"
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const SingleShopOwner = () => {
   const [shops,setShops] = useState<any>([]);

    const loadShops =()=>{
        const token = localStorage.getItem("token");
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pending-shops`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }).then(res=>res.json()).then(data=>{setShops(Array.isArray(data)?data:[]);})
    }

    useEffect(() => {
        loadShops();
    },[])

    const activate = async(id:number) => {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/activate-shopowner/${id}`,
            {method:"PUT",headers:{Authorization:`Bearer ${token}`}});
            if(res.ok){
              toast.success("Shop activated successfull!")
              /*setTimeout(() => {
                window.location.reload();
              }, 2000)*/
              await loadShops();
            } else {
              toast.success("Activation failed!")
            }
          } catch(error){
            console.error(error);
            toast.success("Something went wrong!")
          }
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
        <p className="text-dark">{shop.payment_deadline}</p>
      </div>

      <div className="min-w-[50px] flex justify-end gap-4">
        <CheckCircle
        size={45}
        onClick={()=>activate(shop.id)}
        className="text-green hover:border-green hover:text-gray"
        >
        </CheckCircle>
      </div>
    </div>))} 
    </div>
  );
};

export default SingleShopOwner;