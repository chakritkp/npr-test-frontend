import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductsList from "../ProductsList";
import { MemoryRouter } from "react-router-dom";

describe("test products list", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );
  });

  it("should render text products list", () => {
    expect(screen.getByText(/Products list/));
  });
});
