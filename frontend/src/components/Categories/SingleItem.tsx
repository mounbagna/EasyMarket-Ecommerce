import { Category } from "@/types/category";

const SingleItem = ({ item }: { item: Category }) => {
  return (
    <a href={`/category/${item.id}`} className="group flex flex-col items-center">
      <div className="max-w-[130px] w-full h-[130px] rounded-full overflow-hidden bg-[#ffffff] mb-4 flex items-center justify-center ">
        <img src={item.image} alt="Category" width={62} height={52} className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.name}
        </h3>
      </div>
    </a>
  );
};

export default SingleItem;
