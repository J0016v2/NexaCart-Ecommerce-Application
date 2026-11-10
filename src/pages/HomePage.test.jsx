// libs
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// api mock
import axiosInstance from "../api/axiosInstance";
vi.mock("../api/axiosInstance", () => ({
  default: { get: vi.fn() },
}));

// component
import HomePage from "./HomePage";

// sample data
const products = [
  {
    id: 1,
    title: "Sample Headphones",
    price: 49.99,
    description: "Wireless headphones",
    rating: 4.5,
    thumbnail: "/headphones.jpg",
    category: "electronics",
    brand: "AudioCo",
  },
  {
    id: 2,
    title: "Sample Backpack",
    price: 35,
    description: "Everyday backpack",
    rating: 4.2,
    thumbnail: "/backpack.jpg",
    category: "bags",
    brand: "BagCo",
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  axiosInstance.get.mockResolvedValue({ data: { products } });
});

describe("HomePage fetching", () => {
  it("displays products received from the API", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Sample Headphones")).toBeInTheDocument();
    expect(screen.getByText("Sample Backpack")).toBeInTheDocument();
    expect(axiosInstance.get).toHaveBeenCalledWith("/products?limit=0");
  });

  it("maps fetched categories into category links", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const electronics = await screen.findByRole("link", {
      name: "electronics",
    });
    expect(electronics).toHaveAttribute(
      "href",
      "/listing/category/electronics",
    );
    expect(screen.getByRole("link", { name: "bags" })).toBeInTheDocument();
  });
});
