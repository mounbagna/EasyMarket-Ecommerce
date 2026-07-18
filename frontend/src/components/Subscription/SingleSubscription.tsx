import {Caveat} from "next/font/google"

const caveat = Caveat({subsets: ["latin"], weight: [ "700"]})

const SingleSubscription = () => {
  return (
    <>
    <div className="flex flex-wrap gap-8 justify-center">
      <div className="w-[130px] h-[130px] rounded-full bg-[#b4b4b6] mb-4 flex flex-col items-center justify-center text-center">
        <p className="font-bold text-white text-lg hover:text-white">FREE</p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          5 ITEMS
        </p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          0 FCFA
        </p>
      </div>

      <div className="w-[130px] h-[130px] rounded-full bg-[#eb764c] mb-4 flex flex-col items-center justify-center text-center">
        <p className="font-bold text-white text-lg hover:text-white">BASIC</p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          50 ITEMS
        </p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          5,000 FCFA
        </p>
      </div>

      <div className="w-[130px] h-[130px] rounded-full bg-[#4e4ee7] mb-4 flex flex-col items-center justify-center text-center">
        <p className="font-bold text-white text-lg hover:text-white">STANDARD</p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          120 ITEMS
        </p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          9,000 FCFA
        </p>
      </div>

      <div className="w-[130px] h-[130px] rounded-full bg-[#16ce35] mb-4 flex flex-col items-center justify-center text-center">
        <p className="font-bold text-white text-lg hover:text-white">PREMIUM</p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          250 ITEMS
        </p>
        <p className="font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_3px]">
          19,000 FCFA
        </p>
      </div>
    </div>
    
    <h6 className={`${caveat.className} mt-8 font-bold text-center text-dark text-8x1`}>
      Choose the subscription plan that best fits your business and upgrade anytime.
    </h6>
</>
  );
};

export default SingleSubscription;
