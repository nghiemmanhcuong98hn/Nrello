<script setup>
import draggableComponent from 'vuedraggable';

const props = defineProps({
	lists: Array,
	boardId: String
});

const { handleSort } = useList(props.boardId);

</script>
<template>
	<div class="mt-4">
		<draggableComponent
			:animation="200"
			:scroll-sensitivity="500"
			:force-fallback="true"
			:list="lists"
			handle=".list-handle"
			item-key="_id"
			ghost-class="ghost-board"
			@sort="() => handleSort(lists)"
			class="flex gap-4 h-[80vh] overflow-x-auto pb-5 custome-scroll-bar"
		>
			<template #item="{ element }">
				<div class="flex">
					<ListItem :list="element"/>
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
