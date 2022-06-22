import Link from "next/link";
import React from "react";
import { addToCart, IProduct } from "../../state";
import { Button } from "../Button/Button";

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
        <div className="flex text-xl justify-between my-1 text-slate-700 font-semibold">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>

        <Button className="my-2" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
