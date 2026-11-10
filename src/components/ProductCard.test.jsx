// libs
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

// component
import ProductCard from "./ProductCard";

// sample data (no API requests)
const product = {
  id: 1,
  title: "Test Headphones",
  price: 99.99,
  description: "Wireless headphones",
  rating: 4.5,
  thumbnail: "/headphones.jpg",
};

describe("ProductCard", () => {
  it("displays the product name and price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Headphones")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("shows Added and a checkmark when clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(button);

    expect(screen.getByRole("button", { name: /Added!/ })).toBeDisabled();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
