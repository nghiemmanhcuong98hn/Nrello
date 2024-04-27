<script setup>
import draggableComponent from 'vuedraggable';

const props = defineProps({
	lists: Array,
	boardId: String
});

// functions
const handleSort = async () => {
	await useFetch('/api/board/' + props.boardId, {
		method: 'PUT',
		body: {
			list: props.lists.flatMap(item => item._id)
		},
		watch: false
	});
};

// states
const actions = ref([
	[
		{
			label: 'Add Card',
			icon: 'i-heroicons-plus-circle',
			click: () => {}
		}
	],
	[
		{
			label: 'Delete',
			icon: 'i-heroicons-trash'
		}
	]
]);
</script>
<template>
	<div class="mt-4">
		<draggableComponent
			:animation="200"
			:scroll-sensitivity="500"
			:force-fallback="true"
			:list="props.lists"
			handle=".list-handle"
			item-key="_id"
			ghost-class="ghost-board"
			@sort="handleSort"
			class="flex gap-4 h-[80vh] overflow-x-auto pb-5"
		>
			<template #item="{ element }">
				<div class="flex">
					<div
						class="flex flex-col w-64 shadow flex-none bg-white dark:bg-gray-800 rounded-lg"
					>
						<!-- header -->
						<div
							class="p-2 border-b list-handle dark:border-gray-700 flex items-center justify-between"
						>
							<h3 class="font-medium">{{ element.name }}</h3>
							<UDropdown
								:items="actions"
								class="z-[11]"
							>
								<UIcon name="i-heroicons-cog-6-tooth" />
							</UDropdown>
						</div>
						<!-- end header -->
						<!-- body -->
						<div
							class="list-body p-2 overflow-y-hidden flex-1"
						></div>
						<!-- end body -->
						<!-- footer -->
						<div class="p-1 border-t dark:border-gray-700">
							<UButton block>Add Card</UButton>
						</div>
						<!-- end  footer -->
					</div>
				</div>
			</template>
		</draggableComponent>
	</div>
</template>
<style>
.ghost-board > div {
	opacity: 0.5;
}
.ghost-board > div > div {
	visibility: hidden;
}
.sortable-chosen {
	cursor: grabbing !important;
	opacity: 1 !important;
}
</style>
