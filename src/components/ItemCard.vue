<script setup>
defineProps(["src", "title", "price"]);
const emit = defineEmits(["explore-product"]);
</script>

<template>
	<v-card
		class="mx-auto"
		width="344"
	>
		<v-img
			:src="src"
			height="200px"
			cover
		></v-img>

		<v-card-title>
			{{ title }}
		</v-card-title>

		<v-card-subtitle>
			{{ price }}$
		</v-card-subtitle>

		<v-card-actions>
			<v-btn
				color="orange-lighten-2"
				variant="text"
				@click="emit('explore-product')"
			>
				Explore
			</v-btn>
		</v-card-actions>
	</v-card>
</template>