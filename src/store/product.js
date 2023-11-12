import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product",() => {
  const products = ref({});
  const selectedProduct = ref({});

  const fetchProducts = async (quantity, pageNumber) => {
    const response = await fetch(`https://dummyjson.com/products?limit=${quantity}&skip=${quantity*(pageNumber-1)}&`);
    products.value[pageNumber] = await response.json();
  };

  const searchForProduct = async (searchText, quantity, pageNumber) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchText}&limit=${quantity}&skip=${quantity*(pageNumber-1)}&`);
    products.value[pageNumber] = await response.json();
  };

  const getSingleProduct = async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    selectedProduct.value = await response.json();
  };

  return { products, selectedProduct, fetchProducts, searchForProduct, getSingleProduct };
});
