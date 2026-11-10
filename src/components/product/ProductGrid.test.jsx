// libs
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// component
import ProductGrid from "./ProductGrid";

// sample data (no API requests)
const products = [
  { id: 1, title: "Headphones", price: 50, description: "Audio", rating: 4.5, thumbnail: "/headphones.jpg" },
  { id: 2, title: "Keyboard", price: 30, description: "Typing", rating: 4.2, thumbnail: "/keyboard.jpg" },
];

describe("ProductGrid", () => {
  it("renders one card for each product", () => {
    render(
      <MemoryRouter>
        <ProductGrid products={products} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(screen.getByText("Headphones")).toBeInTheDocument();
    expect(screen.getByText("Keyboard")).toBeInTheDocument();
  });
});
