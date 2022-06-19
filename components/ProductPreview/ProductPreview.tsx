import Link from "next/link";
import React from "react";
import { addToCart, IProduct } from "../../state";

interface Props {
  productPreviewData: IProduct;
}

export const ProductPreview = ({ productPreviewData: product }: Props) => {
  return (
    <div className="w-full my-2 bg-white rounded-lg flex flex-col">
      <Link href={`/shop/products/${product._id}`}>
        <div
          style={{ backgroundImage: `url(${product.image})` }}
          className="h-[300px] bg-center bg-cover cursor-pointer"
          role="img"
          aria-label={product.name}
        />
      </Link>
      <div className="px-4 py-2 flex-1 flex flex-col justify-between">
        <div className="flex justify-between my-1">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
        <button
          className="w-full bg-slate-700 text-white px-4 py-2 mb-2 hover:bg-sky-700"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
