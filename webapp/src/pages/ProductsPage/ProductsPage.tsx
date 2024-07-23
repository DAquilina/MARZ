import React, { useEffect, useLayoutEffect, useState } from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import PageWrapper from "../PageWrapper";

import DraggableProductList from "../../components/DraggableProductList/DraggableProductList";
import Spinner from "../../components/Spinner/Spinner";

import { DataState } from "../../enum/data-state";
import { ProductStatus } from "../../enum/product-status";

import { IErrorResponse } from "../../interface/error-response";
import { IProduct } from "../../interface/product";

import { getProductsByStatus, updateProductStatus } from "../../services/product.service";

import { SortedProductResponse } from "../../type/sorted-product-response";


const ProductsPage = () => {

  const [data, setData]: [SortedProductResponse, Function] = useState(
    {
      [ProductStatus.Active]: [],
      [ProductStatus.Inactive]: []
    } as SortedProductResponse
  );
  const [loadingState, setLoadingState]: [DataState, Function] = useState(DataState.Waiting);
  const [productDragged, setProductDragged]: [{ target: IProduct, newStatus: ProductStatus, dragIndex: number, dropIndex: number } | null, Function] = useState(null);


  const handleDragEnd = ({ source, destination }: DropResult) => {

    if (!destination) {
      return;
    }
    
    const initialStatus = source.droppableId as ProductStatus;
    const targetStatus = destination.droppableId as ProductStatus;

    setProductDragged({
      target: data[initialStatus][source.index],
      newStatus: targetStatus,
      dragIndex: source.index,
      dropIndex: destination.index
    });
  };


  useEffect(() => {

    const getProductData = async () => {

      setLoadingState(DataState.Waiting);

      const response: SortedProductResponse | IErrorResponse = await getProductsByStatus();

      // Error
      if (response.message) {
        setLoadingState(DataState.Error);
      }
      // Success
      else {
        setData(response as SortedProductResponse);

        setLoadingState(DataState.Loaded);
      }
    };

    getProductData();
  }, []);


  useLayoutEffect(() => {

    /**
     * Moves the given product to the set that matches its new status
     */
    const moveProduct = (product: IProduct, newStatus: ProductStatus, targetIndex: number): SortedProductResponse => {

      let activeProducts, inactiveProducts: Array<IProduct>;

      // If the user is dragging within the same list, just move the tile. The sorting will reset when the view reloads, but
      // it feels really awkward if the tile jumps back
      if (product.ProductStatus === newStatus) {
        if (newStatus === ProductStatus.Active) {
          let originalIndex = data[ProductStatus.Active].findIndex((originalProduct: IProduct) => {

            return originalProduct.ProductID === product.ProductID;
          });

          // 1 -> 0 => [] : product : [0, 2]
          // 2 -> 1 => [0] : product : [1]
          // 0 -> 1 => [1] : product : [2]
          // 1 -> 2 => [0, 2] : product : []

          activeProducts = [
            ...data[ProductStatus.Active].filter(
              (targetProduct: IProduct) => {
                
                return ((originalIndex > targetIndex) || (targetProduct.ProductID !== product.ProductID));
              }
            ).slice(0, targetIndex),
            product,
            ...data[ProductStatus.Active].filter(
              (targetProduct: IProduct) => {
                
                return ((originalIndex < targetIndex) || (targetProduct.ProductID !== product.ProductID));
              }
            ).slice(targetIndex)
          ];
          inactiveProducts = data[ProductStatus.Inactive];
        }
        else {
          let originalIndex = data[ProductStatus.Inactive].findIndex((originalProduct: IProduct) => {

            return originalProduct.ProductID === product.ProductID;
          });

          activeProducts = data[ProductStatus.Active];
          inactiveProducts = [
            ...data[ProductStatus.Inactive].filter(
              (targetProduct: IProduct) => {
                
                return ((originalIndex > targetIndex) || (targetProduct.ProductID !== product.ProductID));
              }
            ).slice(0, targetIndex),
            product,
            ...data[ProductStatus.Inactive].filter(
              (targetProduct: IProduct) => {
                
                return ((originalIndex < targetIndex) || (targetProduct.ProductID !== product.ProductID));
              }
            ).slice(targetIndex)
          ];
        }
      }
      else {
        if (product.ProductStatus === ProductStatus.Active) {
          activeProducts = data[ProductStatus.Active].filter(
            (targetProduct: IProduct) => {
              
              return (targetProduct.ProductID !== product.ProductID);
            }
          );

          inactiveProducts = [
            ...data[ProductStatus.Inactive].slice(0, targetIndex),
            {
              ...product,
              ProductStatus: ProductStatus.Inactive
            },
            ...data[ProductStatus.Inactive].slice(targetIndex)
          ];
        }
        else {
          activeProducts = [
            ...data[ProductStatus.Active].slice(0, targetIndex),
            {
              ...product,
              ProductStatus: ProductStatus.Active
            },
            ...data[ProductStatus.Active].slice(targetIndex)
          ];

          inactiveProducts = data[ProductStatus.Inactive].filter(
            (targetProduct: IProduct) => {
              
              return (targetProduct.ProductID !== product.ProductID);
            }
          );
        }
      }

      return {
        [ProductStatus.Active]: activeProducts,
        [ProductStatus.Inactive]: inactiveProducts
      };
    }

    const updateProduct = async (product: IProduct, newStatus: ProductStatus, dragIndex: number, dropIndex: number) => {

      setData(moveProduct(product, newStatus, dropIndex));

      let response: boolean | IErrorResponse = true;

      if (product.ProductStatus !== newStatus) {
        response = await updateProductStatus(product.ProductID, newStatus);
      }

      // Undo the move if there's an error
      if (response !== true) {
        setData(moveProduct(product, product.ProductStatus, dragIndex));
      }
    };

    const handleProductDragged = async () => {

      if (productDragged) {
        const { target, newStatus, dragIndex, dropIndex } = productDragged as { target: IProduct, newStatus: ProductStatus, dragIndex: number, dropIndex: number };

        updateProduct(target, newStatus, dragIndex, dropIndex);
  
        setProductDragged(null);
      }
    };

    if (productDragged) {
      handleProductDragged();
    }
  }, [productDragged, data]);


  let content;

  if (loadingState === DataState.Waiting) {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  }
  else if (loadingState === DataState.Loaded) {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="product-list-container"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <DraggableProductList
            ID={ProductStatus.Active}
            listTitle="Active products"
            onDragEnd={() => {}}
            items={data ? data[ProductStatus.Active] ?? [] : []}
          />
          <DraggableProductList
            ID={ProductStatus.Inactive}
            listTitle="Inactive Products"
            onDragEnd={() => {}}
            items={data ? data[ProductStatus.Inactive] ?? [] : []}
          />
        </DragDropContext>
      </div>
    );
  }
  else {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error Occurred fetching the data!
      </div>
    );
  }

  return (
    <PageWrapper>
      { content }
    </PageWrapper>
  );
};

export default ProductsPage
