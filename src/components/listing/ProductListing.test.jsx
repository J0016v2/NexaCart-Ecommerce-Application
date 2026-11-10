// libs
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// component
import ProductListing from "./ProductListing";

describe("ProductListing", () => {
  it("displays loading text while loading", () => {
    render(
      <MemoryRouter>
        <ProductListing products={[]} categories={[]} loading />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("displays an empty message when no products exist", () => {
    render(
      <MemoryRouter>
        <ProductListing products={[]} categories={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });
});
