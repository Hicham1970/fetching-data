"use client";

import { editProduct, FormState } from "@/actions/products";
import { useActionState } from "react";
import {Product} from "@/app/products-db/page";

export default function EditProductForm({product}:{product: Product}) {
    const initialState: FormState = {
        errors: {},
    };

    const editProductWithId = editProduct.bind(null, product.id);
    const [state, formAction, isPending] = useActionState(editProductWithId, initialState);
    

    return (

        <div className="min-h-screen flex items-center justify-center">
            <form action={formAction} className="p-4 space-y-4 max-w-96">
                <div>
                    <label className="text-white">
                        Title
                        <input
                            type="text"
                            className="block w-full p-3 text-white border rounded border-amber-300 text-lg"
                            name="title"
                            defaultValue={product.title} // Set the default value to the product title

                        />
                    </label>
                    {state.errors.title && (
                        <p className="text-red-500">{state.errors.title}</p>
                    )}
                </div>
                <div>
                    <label className="text-white">
                        Price
                        <input
                            type="number"
                            className="block w-full p-3 text-white border rounded border-amber-300 text-lg"
                            name="price"
                            defaultValue={product.price} // Set the default value to the product price

                        />
                    </label>
                    {state.errors.price && (
                        <p className="text-red-500">{state.errors.price}</p>
                    )}
                </div>
                <div>
                    <label className="text-white">
                        Description
                        <textarea
                            className="block w-full p-3 text-white border rounded border-amber-300 text-lg min-h-[100px]"
                            name="description"
                            defaultValue={product.description ?? ""} // Set the default value to the product description, or an empty string if null
                        />
                    </label>
                    {state.errors.description && (
                        <p className="text-red-500">{state.errors.description}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
                    disabled={isPending}>
                    {isPending ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );

}