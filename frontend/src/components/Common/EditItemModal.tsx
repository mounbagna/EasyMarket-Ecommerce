"use client";

import { useEffect, useState } from "react";
import { useEditItemModalContext } from "@/context/EditItemModalContext";
import { Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/types/product";
import { toast } from "react-toastify";
import { Category } from "@/types/category";

type Props = {
    product: Product;
    onClose: () => void;
};

const EditItemModal = ({product}:Props) => {
  const { isModalOpen, closeEditModal} = useEditItemModalContext();
  const {user} = useAuth();

  // ---------------- STATE ----------------
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [discountedPrice, setDiscountedPrice] = useState(product.discounted_price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [description, setDescription] = useState(product.description);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(product.category_id?.toString() || "");
  const [location, setLocation] = useState(product.location || "");
  const [conditionType, setConditionType] = useState(product.condition_type);
  const [thumbnail, setThumbnail] = useState<File[]>([]);
  const [preview, setPreview] = useState<File[]>([]); 

  // ---------------- SUBMIT(sent to backend) ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("discountedPrice", discountedPrice);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    formData.append("location", location);
    formData.append("conditionType", conditionType);

    thumbnail.forEach((file) => {
      formData.append("thumbnail", file);
    });

    preview.forEach((file) => {
      formData.append("preview", file);
    });
    formData.append("shopowner_id", user.id.toString());

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if(res.ok){
        toast.success("Product Updated successfull!")
        closeEditModal();
      } else {
        toast.success(data.error)
        closeEditModal();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Update failed");
      closeEditModal();
    }
  };

  // ---------------- OUTSIDE CLICK ----------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!target.closest(".modal-content")) {
        closeEditModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeEditModal]);

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then(res=>res.json()).then(data=>{setCategories(data)})
    .catch(err=>{console.log("Category fetch error",err)})
  },[]);

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 w-full h-screen overflow-y-auto bg-dark/70 flex items-center justify-center`}
    >
      <div className="modal-content w-full max-w-[1100px] bg-white p-7 rounded-xl relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={closeEditModal}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-center mb-6">
          Update Product
        </h2>

        {/* FORM */}
        <div className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Product Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* DISCOUNT */}
          <input
            type="number"
            placeholder="Discount Price"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* QUANTITY */}
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* CATEGORY */}
          <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded-lg p-3"
          >
          <option value="">Select Category</option>
          {categories.map((category) =>(
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          </select>

           {/* LOCATION */}
          <select
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          className="w-full p-3 border rounded"
          >
          <option value="maroua">Maroua</option>
          <option value="garoua">Garoua</option>
          <option value="ngaoundere">Ngaoundere</option>
          <option value="yaounde">Yaounde</option>
          <option value="douala">Douala</option>
          <option value="bertoua">Bertoua</option>
          <option value="bafoussam">Bafoussam</option>
          <option value="buea">Buea</option>
          <option value="foumban">Foumban</option>
          <option value="bamenda">Bamenda</option>
          </select>

          {/* CONDITION */}
          <select
          value={conditionType}
          onChange={(e)=>setConditionType(e.target.value)}
          className="w-full p-3 border rounded"
          >
          <option value="new">New Product</option>
          <option value="second_hand">Second Hand</option>
          </select>

          {/* THUMBNAIL */}
          <input
            type="file"
            multiple
            accept="/*"
            onChange={(e) =>
              setThumbnail(Array.from(e.target.files || []))
            }
            className="w-full"
          />

          {/* MULTIPLE IMAGES */}
          <input
            type="file"
            accept="/*"
            multiple
            onChange={(e) =>
              setPreview(Array.from(e.target.files || []))
            }
            className="w-full"
          />

          {/* DESCRIPTION */}
          <textarea
            //type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
           className="inline-flex items-center gap-2 font-medium text-sm py-2 px-5 rounded-lg bg-gray text-green hover:bg-blue transition"
          ><Pencil size={30} />
            Update Product
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditItemModal;