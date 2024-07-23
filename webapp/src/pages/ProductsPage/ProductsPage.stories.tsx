import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";

import ProductsPage from "./ProductsPage";

import { GET_PRODUCTS_BY_STATUS_URL, UPDATE_PRODUCT_STATUS_URL } from "../../services/product.service";

import { ProductStatus } from "../../enum/product-status";


export default {
  title: "Products Page",
  component: ProductsPage,
  decorators: [(Story) => (<MemoryRouter><Story /></MemoryRouter>)]
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetDataSuccess = Template.bind({});

GetDataSuccess.parameters = {
  mockData: [
    {
      url: GET_PRODUCTS_BY_STATUS_URL,
      method: "GET",
      status: 200,
      response: {
        data: {
          [ProductStatus.Active]: [
            {
              ProductID: 1,
              ProductName: "Hat",
              ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-190-scaled.jpg",
              ProductStatus: ProductStatus.Active
            },
            {
              ProductID: 2,
              ProductName: "Shoes",
              ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-199-scaled.jpg",
              ProductStatus: ProductStatus.Active
            },
            {
              ProductID: 3,
              ProductName: "Pants",
              ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-283-scaled.jpg",
              ProductStatus: ProductStatus.Active
            }
          ],
          [ProductStatus.Inactive]: [
            {
              ProductID: 4,
              ProductName: "Shirt",
              ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-368-moose-hug.jpg",
              ProductStatus: ProductStatus.Inactive
            },
            {
              ProductID: 5,
              ProductName: "Coat",
              ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-363-scaled.jpg",
              ProductStatus: ProductStatus.Inactive
            }
          ]
        },
        message: ""
      }
    },
    {
      url: UPDATE_PRODUCT_STATUS_URL,
      method: "POST",
      status: 200,
      response: {
        data: true,
        message: ""
      },
    },
  ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
  mockData: [
    {
      url: GET_PRODUCTS_BY_STATUS_URL,
      method: "GET",
      status: 200,
      response: {
        data: {
          [ProductStatus.Active]: [],
          [ProductStatus.Inactive]: []
        },
        message: ""
      },
    },
    {
      url: UPDATE_PRODUCT_STATUS_URL,
      method: "POST",
      status: 200,
      response: {
        data: true,
        message: ""
      },
    },
  ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
  mockData: [
    {
      url: GET_PRODUCTS_BY_STATUS_URL,
      method: "GET",
      status: 500,
      response: {
        data: [],
        message: "Error"
      }
    },
    {
      url: UPDATE_PRODUCT_STATUS_URL,
      method: "POST",
      status: 200,
      response: {
        data: false
      },
    },
  ],
};
