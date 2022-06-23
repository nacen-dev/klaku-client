import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import { addAndShowProductInCart, IProduct } from "../../state";
import { Button } from "../Button/Button";

interface Props {
  productPreviewData: IProduct;
  index: number;
}

export const ProductPreview: FC<Props> = ({
  productPreviewData: product,
  index,
}) => {
  return (
    <div className="w-full my-2 bg-white rounded-lg flex flex-col">
      <Link href={`/shop/products/${product._id}`}>
        <a className="h-[300px] relative">
          <Image
            layout="fill"
            className="cursor-pointer"
            src={product.image}
            alt={product.name}
            priority={index < 3}
          />
        </a>
      </Link>
      <div className="px-4 py-2 flex-1 flex flex-col justify-between">
        <div className="flex text-xl justify-between my-1 text-slate-700 font-semibold">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>

        <Button
          className="my-2"
          onClick={() => addAndShowProductInCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
