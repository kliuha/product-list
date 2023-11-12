<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/store/product";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const productStore = useProductStore();

const isLoading = ref(false);

onMounted(async () => {
    if(route.query.id) {
        isLoading.value = true;
        await productStore.getSingleProduct(route.query.id);
        isLoading.value = false;
    }
});

onUnmounted(() => {
    productStore.selectedProduct = {};
});
</script>

<template>
	<v-btn
		prepend-icon="mdi-arrow-left"
		@click="$router.push('/')">
		Back to home page
	</v-btn>
	<div class="product-wrapper">
		<v-sheet
			rounded
			elevation="4">
			<v-carousel 
				class="product-carousel"
				hide-delimiter-background
				color="primary"
				v-if="productStore.selectedProduct?.images"
				:show-arrows="false">
				<v-carousel-item
					v-for="image in productStore.selectedProduct?.images"
					:src="image"
					:key="image"
					cover
				></v-carousel-item>
			</v-carousel>

			<v-list-item
				:title="productStore.selectedProduct?.title"
				lines="two"
				density="comfortable"
				:subtitle="productStore.selectedProduct?.description"
			>
				<template v-slot:title>
					<strong class="text-h6">
						{{ productStore.selectedProduct?.title }}
					</strong>
				</template>
			</v-list-item>

			<v-table
				class="text-caption">
				<tbody>
					<tr align="right">
						<th>Category:</th>
						<td>{{ productStore.selectedProduct?.category }}</td>
					</tr>
					<tr align="right">
						<th>Brand:</th>
						<td>{{ productStore.selectedProduct?.brand }}</td>
					</tr>
					<tr align="right">
						<th>Rating:</th>
						<td>
							<v-rating
								v-model="productStore.selectedProduct.rating"
								half-increments
								readonly
							></v-rating>
						</td>
					</tr>
					<tr align="right">
						<th>Discount:</th>
						<td>{{ productStore.selectedProduct?.discountPercentage }}%</td>
					</tr>
					<tr align="right">
						<th>Price:</th>
						<td>${{ productStore.selectedProduct?.price }}</td>
					</tr>
				</tbody>
			</v-table>
		</v-sheet>
	</div>
	<LoadingSpinner :isLoading="isLoading"/>
</template>

<style scoped>
.product-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(.v-table__wrapper) {
    overflow: hidden;
}
</style>