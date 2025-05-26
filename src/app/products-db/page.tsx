import { getProducts } from "@/prisma-db";
import Link from "next/link";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export default async function ProductsPrismaDBPage(){
    
    const products: Product[] = await getProducts();

    return (
        <ul className="space-y-4 p-4">
            {products.map((product) => (
                <li key={product.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h2 className="text-xl font-semibold">
                        <Link href={`/products-db/${product.id}`}>{product.title}</Link>
                    </h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-gray-800">{product.description}</p>
                </li>
            ))}
        </ul>
    );
}