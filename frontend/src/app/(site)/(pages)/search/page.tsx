import { Suspense } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb";
import SearchContent from "../../../../components/Search/SearchContent";


export default function SearchPage(){

    return (
        <>
            <section>
                <Breadcrumb 
                    title={"Search Results"} 
                    pages={["Search"]}  
                />
            </section>
            <Suspense fallback={<p>Loading search...</p>}>
                <SearchContent />
            </Suspense>
        </>
    );

}