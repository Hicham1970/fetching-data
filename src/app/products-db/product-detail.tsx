"use client";

import { removeProduct } from "@/actions/products";
import { getProducts } from "@/prisma-db";
import Form from "next/form";
import Link from "next/link";
import { useOptimistic } from "react";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export const ProductDetail = ({products}:{products: Product[]}) =>{
    
    const [optimisticProducts,setOptimisticProducts] = useOptimistic(products, (currentProducts, productId) => {
        return currentProducts.filter((product) => product.id !== productId);

    })

    const removeProductsById = async (productId: number) => {
        setOptimisticProducts(productId)
        await removeProduct(productId);
     }

    return (
        <ul className="space-y-4 p-4">
            {optimisticProducts.map((product) => (
                <li key={product.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h2 className="text-xl font-semibold">
                        <Link href={`/products-db/${product.id}`}>{product.title}</Link>
                    </h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-gray-800">{product.description}</p>
                    <Form
                        action={removeProductsById.bind(null, product.id)}
                        className="mt-4">
                        <button
                            type="submit"
                            className="mt-2 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </Form>
                </li>
            ))}
        </ul>
    );
}