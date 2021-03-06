import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import StarRatingComponent from "react-star-rating-component";

import { getProductById } from "../../../axios/axiosAPI";
import { Button } from "../../../components/Button/Button";
import { addAndShowProductInCart } from "../../../state";
import { capitalize } from "../../../utils/capitalize";
import { FaStar } from "react-icons/fa";

interface Props {}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product", id], () => getProductById(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function Product({}: Props) {
  const router = useRouter();
  const productId = typeof router.query?.id === "string" ? router.query.id : "";

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["product", productId], () => getProductById(productId));

  if (isLoading) {
    return <div className="h-fit-content w-full text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="h-fit-content w-full justify-center items-center flex flex-col">
        <p className="text-2xl">Could not find the product</p>
        <button className="">
          <Link href="/shop">Back to shop</Link>
        </button>
      </div>
    );
  }

  

  return product ? (
    <div className="h-fit-content w-full flex flex-col md:flex-row">
      <div className="flex-1 relative">
        <Image src={product.image} layout="fill" alt={product.name} />
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2 text-slate-700">
        <h2 className="text-3xl mb-2 font-semibold">{product.name}</h2>
        <p className="text-lg">{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>
        {product.color && (
          <p className="text-lg">Color: {capitalize(product.color)}</p>
        )}
        {product.size && <p className="text-lg">Size: ${product.size}</p>}
        <div className="flex gap-2 items-center">
          <span className="text-lg">
            {product.rating === 0 ? "No ratings yet" : "Ratings: "}
          </span>
          <StarRatingComponent
            name="rating"
            value={product.rating}
            editing={false}
            renderStarIcon={() => <FaStar className="text-xl" />}
          />
        </div>
        <Button
          className="rounded uppercase"
          onClick={() => addAndShowProductInCart(product)}
        >
          Add to cart
        </Button>

        <div className="border-2 p-2 px-6 mt-4 border-slate-700">
          <h3 className="text-xl text-center font-semibold mb-6">
            Customer Reviews
          </h3>
          <p className="text-lg">
            {product.reviews.length > 0
              ? `Based on ${product.reviews.length} reviews`
              : "No reviews yet"}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Product;
