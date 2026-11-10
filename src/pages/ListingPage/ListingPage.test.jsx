// libs
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

// api mock
import axiosInstance from "../../api/axiosInstance";
vi.mock("../../api/axiosInstance", () => ({
  default: { get: vi.fn() },
}));

// component
import ListingPage from "./ListingPage";

const products = [
  {
    id: 10,
    title: "Test Phone",
    price: 200,
    description: "A sample phone",
    rating: 4.8,
    thumbnail: "/phone.jpg",
    category: "smartphones",
    brand: "PhoneCo",
  },
  {
    id: 11,
    title: "Test Phone Case",
    price: 15,
    description: "A sample case",
    rating: 4.3,
    thumbnail: "/case.jpg",
    category: "smartphones",
    brand: "CaseCo",
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  axiosInstance.get.mockImplementation((url) => {
    if (url === "/products/categories") {
      return Promise.resolve({
        data: [{ slug: "smartphones", name: "Smartphones" }],
      });
    }
    return Promise.resolve({ data: { products } });
  });
});

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/listing/category/:category" element={<ListingPage />} />
        <Route path="/search" element={<ListingPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ListingPage fetching", () => {
  it("fetches a category and renders its products", async () => {
    renderAt("/listing/category/smartphones");

    expect(await screen.findByText("Test Phone")).toBeInTheDocument();
    expect(screen.getByText("Test Phone Case")).toBeInTheDocument();
    expect(screen.getByText("2 products found")).toBeInTheDocument();
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/products/category/smartphones?limit=0",
    );
  });

  it("fetches search results using the query in the URL", async () => {
    renderAt("/search?q=phone");

    expect(await screen.findByText("Test Phone")).toBeInTheDocument();
    expect(screen.getByText("Test Phone Case")).toBeInTheDocument();
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/products/search?q=phone&limit=0",
    );
  });
});
