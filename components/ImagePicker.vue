<script setup>
import clsx from 'clsx';

const props = defineProps({
	modelValue: String
});
defineEmits(['update:modelValue']);

const imageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>
<template>
	<ol class="grid grid-cols-3 gap-2 overflow-y-auto overflow-x-auto h-64 p-2">
		<li
			v-for="id in imageIds"
			:class="
				clsx(
					'h-12 relative rounded-md overflow-hidden cursor-pointer outline outline-transparent focus:outline-blue-500 hover:outline-blue-500',
					props.modelValue === id ? 'ring-2 ring-blue-500 shadow' : ''
				)
			"
			:key="id"
			@click="$emit('update:modelValue', id.toString())"
		>
			<img :src="`/images/bg-${id}.jpg`" alt="image cover" />
		</li>
	</ol>
</template>
