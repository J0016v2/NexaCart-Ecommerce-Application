// libs
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// api mock
import axiosInstance from "../../api/axiosInstance";
vi.mock("../../api/axiosInstance", () => ({
  default: { get: vi.fn() },
}));

// component
import OrderPage from "./OrderPage";

beforeEach(() => {
  vi.clearAllMocks();
  axiosInstance.get.mockImplementation((url) => {
    if (url === "/carts?limit=10") {
      return Promise.resolve({
        data: {
          carts: [
            {
              id: 1,
              products: [
                {
                  id: 1,
                  title: "Sample Headphones",
                  price: 30,
                  quantity: 2,
                  thumbnail: "/a.jpg",
                },
                {
                  id: 2,
                  title: "Sample Mouse",
                  price: 10,
                  quantity: 1,
                  thumbnail: "/b.jpg",
                },
              ],
            },
          ],
        },
      });
    }
    if (url === "/products?limit=0") {
      return Promise.resolve({
        data: {
          products: [
            { id: 1, brand: "AudioCo" },
            { id: 2, brand: "TechCo" },
          ],
        },
      });
    }
    return Promise.reject(new Error(`Unexpected endpoint: ${url}`));
  });
});

describe("OrderPage fetching", () => {
  it("groups fetched cart products by store", async () => {
    render(
      <MemoryRouter>
        <OrderPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Sample Headphones")).toBeInTheDocument();
    expect(screen.getByText("Sample Mouse")).toBeInTheDocument();
    expect(screen.getByText("AudioCo")).toBeInTheDocument();
    expect(screen.getByText("TechCo")).toBeInTheDocument();
    expect(axiosInstance.get).toHaveBeenCalledWith("/carts?limit=10");
    expect(axiosInstance.get).toHaveBeenCalledWith("/products?limit=0");
  });
});
