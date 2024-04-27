<script setup>
definePageMeta({
	middleware: ['auth']
});

// states
const _isShowCrateBoard = ref(false);
const _selectBoard = ref(undefined);
const _formBoardType = ref('create');

// apis
const { data: boards, refresh, pending, status } = useFetch('/api/board');

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
		<div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
			<Card
				v-for="board in boards"
				:board="board"
				:on-edit="
					selectBoard => handleOpenBoardForm('update', selectBoard)
				"
			/>
		</div>
	</WrapperDefault>
</template>
