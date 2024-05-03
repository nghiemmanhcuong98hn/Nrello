<script setup>
const props = defineProps({
	title: String,
	description: String,
	onDelete: Function,
	onClose: Function
});

const handleDeleteCard = async () => {
	await props.onDelete?.();
	props.onClose?.();
};
</script>
<template>
	<UCard>
		<div class="space-y-2">
			<h3 class="text-18 font-bold">{{ title }}</h3>
			<p>{{ description }}</p>
			<div class="w-full flex justify-end gap-2">
				<UButton @click="handleDeleteCard" color="red">Delete</UButton>
				<UButton @click="onClose">Cancel</UButton>
			</div>
		</div>
	</UCard>
</template>
