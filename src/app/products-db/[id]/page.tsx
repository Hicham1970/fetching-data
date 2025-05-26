import { getProduct } from "@/prisma-db";
import EditProductForm from "./product-edit-form"; // Import the form component
import { Product } from "@/app/products-db/page"; // Import the Product type if needed
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params; 
    const product: Product = await getProduct(parseInt(id)); 

    if (!product) {
        notFound(); // If the product is not found, return a 404 page
    }
    return <EditProductForm product={product} /> // Render the form component with the fetched product data

}