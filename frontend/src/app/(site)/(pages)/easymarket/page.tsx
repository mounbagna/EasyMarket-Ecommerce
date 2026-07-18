import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
export default function EasyMarket() {
  return (
    <>
    <section>
        <Breadcrumb title={"EasyMarket"} pages={["EasyMarket"]} />
      </section>
    <div className="max-w-5xl mx-auto px-6 py-12">

      

      <div className="flex justify-center mb-8">
              <Image
                src="/images/logo/easymarket.png"
                alt="EasyMarket"
                width={600}
                height={350}
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="text-gray-700 space-y-4 text-lg">

            
      <p className="text-lg text-gray-700 mb-6 text-center">
        EasyMarket is a modern eCommerce platform designed to provide a fast, simple, and user-friendly online shopping experience.
      </p>


        <p>
          The platform allows users to browse products, add items to their cart, and complete purchases seamlessly. It is designed with simplicity and performance in mind, ensuring a smooth experience across all devices.
        </p>

        <p>
          Built using modern technologies like Next.js and React, EasyMarket focuses on speed, scalability, and clean user interface design.
        </p>
      </div>

      {/* Goals Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Our Goals
      </h2>

      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Provide a simple and intuitive shopping experience</li>
        <li>Ensure fast and responsive performance</li>
        <li>Build a scalable and modern web application</li>
        <li>Deliver high-quality user interface and usability</li>
        <li>Continuously improve features and user experience</li>
      </ul>

    </div>
    </>
  );
}