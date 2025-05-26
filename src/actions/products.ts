"use server"; 

import { addProduct,updateProduct } from "@/prisma-db";
import { redirect } from "next/navigation";

export type Errors = {
    title?: string;
    price?: string;
    description?: string;
};
export type FormState = {
    errors: Errors;
};

export async function createProduct(prevState: FormState,formData: FormData) {
    
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;

    const errors: Errors = {};
    if (!title) {
        errors.title = "Title is required";
    };
    if (!price || isNaN(price) || price <= 0) {
        errors.price = "Valid price is required";
    };
    if (!description) {
        errors.description = "Description is required";
    };

    // Retourner les erreurs dans le bon format
    if (Object.keys(errors).length > 0) {
        return { errors }; // Retourne un objet qui correspond au type FormState
    }

    await addProduct(title, price, description);
    redirect("/products-db"); // Redirect to the products page after adding a product
}


export async function editProduct(
    id: number,
    prevState: FormState, // This is the previous state of the form, can be used for validation or other purposes
    formData: FormData
) {

    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;

    const errors: Errors = {};
    if (!title) {
        errors.title = "Title is required";
    };
    if (!price || isNaN(price) || price <= 0) {
        errors.price = "Valid price is required";
    };
    if (!description) {
        errors.description = "Description is required";
    };

    // Retourner les erreurs dans le bon format
    if (Object.keys(errors).length > 0) {
        return { errors }; // Retourne un objet qui correspond au type FormState
    }

    await updateProduct(id,title, price, description);
    redirect("/products-db"); // Redirect to the products page after adding a product
}
