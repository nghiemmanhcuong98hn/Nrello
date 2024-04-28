<script setup>
const props = defineProps({
	card: Object,
	onClick: Function
});
</script>

<template>
	<div
		class="p-1 border shadow rounded-md dark:border-gray-700 bg-white dark:bg-gray-700 cursor-grab"
        @click="onClick"
	>
		<p>{{ card.title }}</p>
	</div>
</template>
<style>
.ghost-card > p {
	visibility: hidden;
}
.ghost-card.sortable-chosen {
	opacity: 0.5 !important;
}
</style>
