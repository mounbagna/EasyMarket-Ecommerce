import CategoryProducts from "@/components/Categories/CategoryProducts"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMarket",
  description: "Products by category",
};

type Props={
  params: Promise<{
    id:string;
  }>;
};

const CategoryPage = async({params}:Props) => {
    const {id} = await params;
    return(
        <main>
            <CategoryProducts categoryId={Number(id)} />
        </main>
    )
}
export default CategoryPage; 

