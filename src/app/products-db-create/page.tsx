import { addProduct } from "@/prisma-db"; // Adjust the import path as necessary
import {redirect} from "next/navigation"; // Import redirect for navigation after form submission
// import { FormState, createProduct } from "@/actions/products";
// import { Submit } from "@/components/submit";
// import { useActionState } from "react";

export default function AddProductPage() {
    async function createProduct(formData: FormData) {
        "use server"; 
        const title = formData.get("title") as string;
        const price = parseFloat(formData.get("price") as string);
        const description = formData.get("description") as string;
        await addProduct(title, price, description);
        redirect("/products-db"); // Redirect to the products page after adding a product
    }
    

    return (

        <div className="min-h-screen flex items-center justify-center">
            <form action={createProduct} className="p-4 space-y-4 max-w-96">
                <label className="text-white">
                    Title
                    <input
                        type="text"
                        className="block w-full p-3 text-white border rounded border-amber-300 text-lg"
                        name="title"
                        
                    />
                </label>
                <label className="text-white">
                    Price
                    <input
                        type="number"
                        className="block w-full p-3 text-white border rounded border-amber-300 text-lg"
                        name="price"
                        
                    />
                </label>
                <label className="text-white">
                    Description
                    <textarea
                        className="block w-full p-3 text-white border rounded border-amber-300 text-lg min-h-[100px]"
                        name="description"
                       
                    />
                </label>
                <button
                    type="submit"
                    className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
                   
                >
                    Add Product
                </button>
            </form>
        </div>    );
    
}