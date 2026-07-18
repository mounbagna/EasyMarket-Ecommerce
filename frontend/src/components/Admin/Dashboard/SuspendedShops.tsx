"use client";

import { useEffect,useState } from "react";
import Image from "next/image";

const SuspendedShops = () => {

  const [stats, setStats] = useState<any>(null);

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`).then(res=>res.json()).then(data=>{setStats(data);})
    },[]);

    if(!stats){return <p>Loading...</p>}
    const card={title:"Suspended Shops",value:stats.suspendedShops};

  return (
    <div>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <div >
                <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">{card.title}</h1>
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                {card.value}
              </span>
            </div>
         
            </div>
          </div>

          <div>
            <Image
              src="/images/logo/suspended_shops.jpeg"
              alt="sarree"
              width={351}
              height={358}
            />
          </div>*
        </div>
    </div>
  );
};

export default SuspendedShops;


/*
"use client";

const [stats, setStats] = useState<any>(null);

    useEffect(()=>{
        fetch("http://localhost:5000/admin/dashboard").then(res=>res.json()).then(data=>{setStats(data);})
    },[]);

    if(!stats){return <p>Loading...</p>}
    const cards=[
        {title:"Pending Shops",
        value:stats.pendingShops},
       {title:"Active Shops",
        value:stats.activeShops},
        {title:"Suspended Shops",
        value:stats.suspendedShops},
        {title:"Products",
        value:stats.products},
        {title:"Customers",
        value:stats.Customers},
    ];

    return (
        <div>
            <h1 className="text-3x1 font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{cards.map((card,index)=>(
                <div key={index} className="bg-white shadow rounded-x1 p-6">
                    <p className="text-gray-500">{card.title}</p>
                    <h2 className="text-3x1 font-bold mt-3">{card.value} </h2>
                </div>
            ))} </div>
        </div>
    );
}*/
