import { render, screen } from "@testing-library/react";
import { IProductPreview, ProductPreview } from "./ProductPreview";

describe("Product Preview", () => {
  const product: IProductPreview = {
    _id: "123",
    name: "coat",
    image: "test-url",
    price: 50,
  };
  it("contains product name, price, product image", () => {
    render(<ProductPreview productPreviewData={product} />);

    const name = screen.getByText(product.name);
    const price = screen.getByText(`$${product.price}`);
    const image = screen.getByRole("img");

    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle(`backgroundImage: url(${product.image})`);
  });
});
