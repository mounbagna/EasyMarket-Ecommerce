"use client";
import SingleProduct from "./SingleProduct";

const ProductList = () => {

  return (

        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mt-10">
              <h2 className="font-medium text-dark text-2xl mb-8">List of products</h2>
            </div>

            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  <div className="flex items-center py-5.5 px-7.5">
                    <div className="min-w-[400px]">
                      <p className="text-dark">Product</p>
                    </div>

                    <div className="min-w-[180px]">
                      <p className="text-dark">Price (FCFA)</p>
                    </div> 

                    <div className="min-w-[275px]">
                      <p className="text-dark">Discount Price (FCFA)</p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className="text-dark">Quantity</p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className="text-dark">Shop Owner's ID</p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className="text-dark">Location</p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className="text-dark">Condition</p>
                    </div>

                    <div className="min-w-[50px]">
                      <p className="text-dark text-right">Action</p>
                    </div>
                  </div>
                  
                  <SingleProduct  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )
};

export default ProductList;
