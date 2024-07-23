import { render, screen, waitFor } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";

import ProductsPage from "./ProductsPage";

import { ProductStatus } from "../../enum/product-status";

import { GET_PRODUCTS_BY_STATUS_URL, UPDATE_PRODUCT_STATUS_URL } from "../../services/product.service";


describe("HomePage", () => {

  it("shouldDisplayLoadingSpinner", () => {

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
  });

  it("shouldDisplayProductLists", async () => {

    // set up mock for axios.get
    const response = {
      data: {
        [ProductStatus.Active]: [
          {
            "ProductID": 1,
            "ProductName": "test",
            "ProductPhotoUrl": "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-190-scaled.jpg",
            "ProductStatus": ProductStatus.Active
          }
        ],
        [ProductStatus.Inactive]: []
      }
    };

    const server = setupServer(
      rest.get(GET_PRODUCTS_BY_STATUS_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response));
      })
    );

    server.listen();

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`product-list-container`)).toBeInTheDocument();
    });

    server.close();
  });

  it("shouldDisplayErrorMessage", async () => {

    // set up mock for axios.get
    const response = {
      data: {},
      message: "Error"
    };
    const server = setupServer(
      rest.get(GET_PRODUCTS_BY_STATUS_URL, (req, res, ctx) => {

        return res(ctx.status(500), ctx.json(response));
      })
    );

    server.listen();

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
    });

    server.close();
  });
});
