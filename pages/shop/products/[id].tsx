import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getProductById } from "../../../axios/axiosAPI";
import { capitalize } from "../../../utils/capitalize";

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
    return <div className="h-screen w-full text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="h-screen w-full justify-center items-center flex">
        <p>Could not find the product</p>
      </div>
    );
  }

  return product ? (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div className="flex-1 relative">
        <Image src={product.image} layout="fill" alt={product.name} />
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-4xl mb-2">{product.name}</h2>
        <p>{product.description}</p>
        <p className="text-lg">${product.price}</p>
        {product.color && <p>Color: {capitalize(product.color)}</p>}
        {product.size && <p>Size: ${product.size}</p>}
        <button className="rounded border w-full px-4 py-2 cursor-pointer bg-slate-700 text-white hover:bg-sky-700 uppercase">
          Add to cart
        </button>
        <div className="border-2 p-2 px-6 mt-4">
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
