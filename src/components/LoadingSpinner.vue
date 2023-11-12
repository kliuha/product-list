<script setup>
defineProps({
    isLoading: Boolean,
});
</script>

<template>
	<div
		v-if="isLoading"
		class="app-loading">
		<v-progress-circular
			indeterminate
			color="primary"
			:size="70"
			:width="7"
		></v-progress-circular>
	</div>
</template>

<style scoped>
.app-loading {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    z-index: 100;
    transform: translate(-50%, -50%);
    background-color: #444444;
    opacity: 0.5
}
</style>