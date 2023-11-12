<template>
	<v-app-bar
		flat
		class="app-bar">
		<v-app-bar-title
			class="app-title"
			@click="$router.push('/')">
			<v-icon icon="mdi-store" />
			Online shop
		</v-app-bar-title>
	</v-app-bar>
</template>

<style scoped>
.app-bar {
  border-bottom: 1px solid #c8c8c8;
}

.app-title {
  cursor: pointer;
}
</style>
