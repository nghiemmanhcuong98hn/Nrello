<script setup>
useSeoMeta({
	title: 'Home',
	description: 'Project management doashboard'
});

import draggableComponent from 'vuedraggable';
const { $logDebug } = useNuxtApp();

definePageMeta({
	middleware: ['auth']
});

const toast = useToast();

// states
const _isShowCrateBoard = ref(false);
const _selectBoard = ref(undefined);
const _formBoardType = ref('create');

// apis
const { data: boards, refresh } = useFetch('/api/board');
// provides
provide('refesh-board', refresh);

// Functions
const onCreateBoardAfter = async () => {
	await refresh();
	_isShowCrateBoard.value = false;
};

const onUpdateBoardAfter = async () => {
	await refresh();
	_isShowCrateBoard.value = false;
	_selectBoard.value = undefined;
};

const handleOpenBoardForm = (type, data = undefined) => {
	_formBoardType.value = type;
	_isShowCrateBoard.value = true;
	_selectBoard.value = data;
};

const hanldeChangeOderboard = async event => {
	if (event.moved) {
		const { newIndex, oldIndex } = event.moved;
		try {
			await useFetch('/api/board/order', {
				method: 'PUT',
				body: {
					newIndex: newIndex + 1,
					oldIndex: oldIndex + 1
				},
				watch: false
			});
			await refresh();
		} catch (error) {
			$logDebug('Log debug line 45[page/index.vue]:', error);
			toast.add({
				title: 'Error',
				description: error.message ?? 'Something went wrong'
			});
		}
	}
};
</script>
<template>
	<WrapperDefault>
		<template #actions>
			<UButton @click="() => handleOpenBoardForm('create')"
				>Create board</UButton
			>
		</template>
		<USlideover v-model="_isShowCrateBoard">
			<OverlayHeader
				:title="_selectBoard ? 'Update board' : 'Create new board'"
				:on-click="() => (_isShowCrateBoard = false)"
			/>
			<div class="px-4 mt-2">
				<FormBoard
					:on-create-after="onCreateBoardAfter"
					:on-update-after="onUpdateBoardAfter"
					:initinal-form-state="_selectBoard"
					:type="_formBoardType"
				/>
			</div>
		</USlideover>
		<draggableComponent
			:animation="200"
			:scroll-sensitivity="500"
			:force-fallback="true"
			:list="boards"
			ghost-class="ghost-list"
			itemKey="_id"
			@change="hanldeChangeOderboard"
			class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4"
		>
			<template #item="{ element }">
				<Card
					:board="element"
					:data-index="element._id"
					:on-edit="
						selectBoard =>
							handleOpenBoardForm('update', selectBoard)
					"
				/>
			</template>
		</draggableComponent>
	</WrapperDefault>
</template>
<style>
.ghost-list.sortable-chosen > div {
	cursor: grabbing !important;
	opacity: 0.5 !important;
}
</style>
