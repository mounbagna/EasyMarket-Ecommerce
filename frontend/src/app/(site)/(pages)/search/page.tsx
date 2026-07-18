"use client";

import SingleGridItem from "@/components/Shop/SingleGridItem";
import {useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
import ProductItem from "@/components/Common/ProductItem";
import Breadcrumb from "@/components/Common/Breadcrumb";


const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProducts = async () => {
            if(!query){
                setProducts([]);
                setLoading(false) 
                return;
            } 
            try {
                const res = await fetch(`http://localhost:5000/products/search?q=${encodeURIComponent(query)}`)

                if(!res.ok){
                    throw new Error("Search failed")
                }
                const data = await res.json();
                setProducts(data);
            } catch(error){
                console.error("search error:",error)
            } finally{
                setLoading(false)
            }
        };
        fetchProducts();
  },[query])

  return (
    <>
    <section>
        <Breadcrumb title={"Search Results"} pages={["Search"]} />
      </section>
    <section className="py-10">
        <div className="container">
            {
                loading ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <SingleGridItem
                            key={item.id}
                            item={item}
                        />
                    ))
                } 
                </div>
                )
            }
        </div>

    </section>
    </>
  )
}

export default SearchPage;