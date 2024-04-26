<script setup>
const props = defineProps({
	title: String,
	onClick: Function
});
</script>
<template>
	<div class="py-2 px-4 flex justify-between items-center dark:border-gray-800 border-b">
		<h3>{{ title }}</h3>
		<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="onClick">
		</UButton>
	</div>
</template>
