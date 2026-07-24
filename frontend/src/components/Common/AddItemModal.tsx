"use client";

import { useEffect, useState } from "react";
import { useAddItemModalContext } from "@/context/AddItemModalContext";
import { PackagePlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const AddItemModal = () => {
  const { isModalOpen, closeModal } = useAddItemModalContext();
  const {user} = useAuth();


  // ---------------- STATE ----------------
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(""); 
  const [location, setLocation] = useState("");
  const [conditionType, setConditionType] = useState("new");

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
    formData.append("condition_type", conditionType);

    thumbnail.forEach((file) => {
      formData.append("thumbnail", file);
    });

    preview.forEach((file) => {
      formData.append("preview", file);
    });
    formData.append("shopowner_id", user.id.toString());
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if(res.ok){
        toast.success("Product Added successfull!")
        setTitle("");
        setPrice("");
        setDiscountedPrice("");
        setQuantity("");
        setDescription("");
        setThumbnail([]);
        setPreview([]);
      
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  // ---------------- OUTSIDE CLICK ----------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then(res => res.json()).then(data => setCategories(data));
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
          onClick={closeModal}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-center mb-6">
          Add New Product
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

          {/*THUMBNAIL */}
          <label className="mt-10 text-xl font-bold text-center mb-6" htmlFor="thumbnail">Upload 4 thumnail & preview images respectively</label>
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
          ><PackagePlus size={30} />
            Add Product
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddItemModal;