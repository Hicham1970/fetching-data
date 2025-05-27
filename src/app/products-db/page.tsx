import { getProducts } from "@/prisma-db";
import { ProductDetail } from "./product-detail";



export type Product = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export default async function ProductsPrismaDBPage({searchParams}:{searchParams: {query?: string}}) {
    // If you want to use searchParams, you can pass it to getProducts
    const { query } = await searchParams;
    // If you want to filter products based on a query, you can pass it to getProducts
    const products: Product[] = await getProducts(query);
    
    return <ProductDetail products={products} />;   
}