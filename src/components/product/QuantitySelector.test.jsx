// libs
import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// component
import QuantitySelector from "./QuantitySelector";

// A tiny parent keeps the controlled quantity in React state.
function TestQuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return <QuantitySelector quantity={quantity} onChange={setQuantity} />;
}

describe("QuantitySelector", () => {
  it("starts at 1 and increases when clicked", async () => {
    const user = userEvent.setup();
    render(<TestQuantitySelector />);

    expect(screen.getByText("1")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not decrease below 1", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector quantity={1} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
