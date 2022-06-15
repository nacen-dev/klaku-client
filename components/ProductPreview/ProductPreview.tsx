import Link from "next/link";
import React from "react";

export interface IProductPreview {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  productPreviewData: IProductPreview;
}

export const ProductPreview = ({ productPreviewData: product }: Props) => {
  return (
    <div className="h-[350px] w-full my-2">
      <Link href={`/shop/products/${product._id}`}>
        <div
          style={{ backgroundImage: `url(${product.image})` }}
          className="h-[90%] bg-center bg-cover cursor-pointer"
          role="img"
          aria-label={product.name}
        />
      </Link>
      <div className="flex justify-between h-[10%] my-1">
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};
