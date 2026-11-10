// libs
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// component
import OrderTabs from "./OrderTabs";

describe("OrderTabs", () => {
  it("calls the callback when another status is selected", async () => {
    const user = userEvent.setup();
    const onSelectTab = vi.fn();

    render(
      <OrderTabs
        orderTabs={["All", "To Ship", "Completed"]}
        selectedTab="All"
        onSelectTab={onSelectTab}
      />,
    );

    expect(screen.getByRole("radio", { name: "All" })).toBeChecked();

    await user.click(screen.getByRole("radio", { name: "Completed" }));

    expect(onSelectTab).toHaveBeenCalledWith("Completed");
  });
});
