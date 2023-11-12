<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/store/product";
import ItemCard from "@/components/ItemCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const productStore = useProductStore();
const router = useRouter();

const pageNumber = ref(1);
const productPerPage = ref(15);
const isLoading = ref(false);
const isSearching = ref(false);
const searchText = ref("");

onMounted(async () => {
  isLoading.value = true;
  await productStore.fetchProducts(productPerPage.value, pageNumber.value);
  isLoading.value = false;
});

const paginationLength = computed(() => {
  return productStore.products[pageNumber.value]?.total ? (productStore.products[pageNumber.value]?.total / productPerPage.value).toFixed() : 1;
});

const showPage = async (page) => {
  if(!(page in productStore.products)) {
    isLoading.value = true;
    await productStore.fetchProducts(productPerPage.value, pageNumber.value);
    isLoading.value = false;
  }
};

const searchForProduct = async() => {
  isSearching.value = true;
  pageNumber.value = 1;
  await productStore.searchForProduct(searchText.value, productPerPage.value, pageNumber.value);
  isSearching.value = false;
};

const goToProduct = (product) => {
  router.push({path: "/product", query: {id: product.id}});
};
</script>

<template>
	<v-text-field
		v-model="searchText"
		class="search-field"
		density="default"
		variant="solo"
		label="Search product"
		append-inner-icon="mdi-magnify"
		single-line
		hide-details
		:loading="isSearching"
		@click:append-inner="searchForProduct"
	></v-text-field>
	<div class="item-wrapper">
		<ItemCard
			v-for="product in productStore?.products[pageNumber]?.products"
			:key="product.id"
			:src="product.thumbnail"
			:title="product.title"
			:price="product.price"
			@exploreProduct="goToProduct(product)" />
	</div>
	<v-pagination
		v-model="pageNumber"
		:length="paginationLength"
		@update:modelValue="showPage">
	</v-pagination>
	<LoadingSpinner :isLoading="isLoading"/>
</template>

<style scoped>
.item-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.search-field {
  margin: 10px 0;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  min-width: 350px;
}
</style>