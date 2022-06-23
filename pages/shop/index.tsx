import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getAllProducts } from "../../axios/axiosAPI";
import { ErrorText } from "../../components/ErrorText/ErrorText";
import { Loader } from "../../components/Loader/Loader";
import { ProductPreview } from "../../components/ProductPreview/ProductPreview";

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", getAllProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Shop = () => {
  const { isLoading, isError, data } = useQuery("products", getAllProducts);

  if (isLoading) {
    return (
      <div className="h-fit-content w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-fit-content w-full flex justify-center items-center">
        <ErrorText className="text-xl" message="An error has occurred. Try refreshing the page" />
      </div>
    )
  }

  return (
    <div className="p-4 bg-neutral-200">
      <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
        {data?.map((product) => (
          <ProductPreview key={product._id} productPreviewData={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
