import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getProducts,
  getFilteredProducts,
  getProduct,
  getShopProducts,
  deleteShopProduct,
  updateShopProduct,
  getProductById,
} from '../services/productService';

export function useProducts(endPoint, query) {
  return useQuery(['products'], () => getProducts(endPoint, query));
}

export function useProduct(endPoint, query) {
  return useQuery(['product', query], () => getProduct(endPoint, query));
}

export function useProductCart(endPoint, queryKey) {
  return useQuery([queryKey], () => getProductById(endPoint), {
    enabled: false,
  });
}

export function useFilteredProducts(endPoint, query) {
  return useQuery(['filteredProducts', query], () =>
    getFilteredProducts(endPoint, query)
  );
}

export function useSearchProduct(endPoint, query) {
  return useQuery(['SearchProduct', query], () => getProducts(endPoint, query));
}

export function useShopProducts(endPoint) {
  return useQuery(['shop-products'], () => getShopProducts(endPoint));
}

export function useUpdateProduct() {
  return useMutation(updateShopProduct, {
    mutationKey: 'update-product',
  });
}

export function useDeleteProduct() {
  return useMutation(deleteShopProduct, {
    mutationKey: 'delete-product',
  });
}
