export const normalizeArray = (data: any): string[] => {
    if (!data) return [];

    if (Array.isArray(data)) return data;

    if (typeof data === "string") {
        try {
            const parsed = JSON.parse(data);
            if(Array.isArray(parsed)) return parsed;
            return [data];
        } catch {
            return [data]
        }
    }
    return []
}

//const BASE_URL = "http://127.0.0.1:5000";

export const getImageUrl = (img?: string | string[]): string => {
    if (!img) {
        return "/images/404.svg";
    }

    let image = "";
    if(Array.isArray(img)){
        image = img[0];
    }
    else {
        image = img.trim();
    
    if(image.startsWith("[")){
        try{
            const parsed = JSON.parse(image);
            image = parsed[0]
        }catch(error){
            console.log("Image parsing error:", error);
            return "/images/404.svg";
        }
    }
}

    if (!image) {
        return "/images/404.svg";
    }
    if(image.startsWith("http")){
        return image;
    }
    const path = image.startsWith("/") ? image : `/${image}`;
    return `${process.env.NEXT_PUBLIC_API_URL}${path}`
};