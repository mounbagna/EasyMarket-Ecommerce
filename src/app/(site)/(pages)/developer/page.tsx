import Image from "next/image";
import Breadcrumb from "../../../../components/Common/Breadcrumb";

export default function Developer() {
  return (
    <>
    <section>
        <Breadcrumb title={"Author"} pages={["Developer"]} />
      </section>
    <div className="max-w-5xl mx-auto px-6 py-12 text-center">

      <h1 className="text-4xl font-bold mb-8">
        About the Developer
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-10">

      
      {/* Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src="/images/Author/IMG_2620.jpeg"
          alt="Abasse"
          width={880}
          height={780}
          className="rounded-full shadow-lg"
        />
      </div>

      <h2 className="text-2xl font-bold mb-8">
        Mounbagna Abdella Abasse
      </h2>

      <div className="w-full md:w-2/3 text-gray-700 space-y-4 text-lg mt-11">

        <p>
          I am a Computer Science engineer, having completed a four-year engineering program through the OIC scholarship.
        </p>

        <p>
          I am fluent in both English and French, with a French-speaking background and academic training in English.
        </p>

        <p>
          I have developed several web applications, all documented on my GitHub, demonstrating my skills in modern web development.
        </p>

        <p>
          I am passionate about building scalable and user-friendly applications using modern technologies like Next.js and React.
        </p>

      </div>
</div>
    </div>
    </>
  );
}