<script setup>
import clsx from 'clsx';

const props = defineProps({
	modelValue: String
});
defineEmits(['update:modelValue']);
const {
	public: { pixapayApiKey }
} = useRuntimeConfig();

const { data } = useFetch(
	`https://pixabay.com/api/?key=${pixapayApiKey}&image_type=photo&orientation=horizontal&per_page=32`
);
</script>
<template>
	<ol
		v-if="data?.hits"
		class="grid grid-cols-3 gap-2 overflow-y-auto overflow-x-auto h-64 p-2"
	>
		<li
			v-for="image in data.hits"
			:class="
				clsx(
					'h-12 relative rounded-md overflow-hidden cursor-pointer outline outline-transparent focus:outline-blue-500 hover:outline-blue-500',
					props.modelValue === image.largeImageURL
						? 'ring-2 ring-blue-500 shadow'
						: ''
				)
			"
			:key="image.id"
			@click="$emit('update:modelValue', image.largeImageURL)"
		>
			<NuxtImg :src="image.largeImageURL" />
		</li>
	</ol>
</template>
