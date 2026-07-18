"use client";

import { getImageUrl } from "@/utils/normalizedUtils";
import { ShopOwnerCard } from "@/types/shopownercard";
import Link from "next/link";
import {MapPin, Store} from "lucide-react"

type Props = { item: ShopOwnerCard }
 
const ShopOwnersList = ({ item }: Props) => {
  return (
          <div>
            <Link href={`/shop/${item.id}`} className="group flex flex-col items-center">
            <div className="max-w-[130px] w-full h-[130px] bg-[#F2F3F8] rounded-full overflow-hidden flex items-center justify-center mb-4">
              <img src={getImageUrl(item.image)} alt="ShopOwners" className="w-full h-full object-cover" />
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                {item.category_name || "No Ctegory"}
              </h3>
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <MapPin size={16} className="text-green"/>
              <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                {item.address || "No name"}
              </h3>
            </div>

            <div className="flex justify-center gap-2 mt-1">
              <Store size={16} className="text-red"/>
              <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                {item.shop_name || "No name"}
              </h3>
            </div>
            </Link>
          </div>
          );
        };
        
export default ShopOwnersList;