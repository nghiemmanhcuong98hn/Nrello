<script setup>
const route = useRoute();

// states
const _selectedList = ref(null);
const _isShowListForm = ref(false);
const _formListType = ref('create');

// apis
const { data, refresh } = await useFetch('/api/board/' + route.params.id);

if (!data.value) {
	throw createError({
		status: 404,
		message: 'Board not found!'
	});
}

// functions
const handleShowListForm = (type, data = null) => {
	_formListType.value = type;
	_isShowListForm.value = true;
	_selectedList.value = data;
};

const handleAfterCreate = async () => {
	await refresh();
	_isShowListForm.value = false;
};

const handleAfterUpdate = async () => {
	await refresh();
	_isShowListForm.value = false;
	_selectedList.value = null;
};

// provides
provide('show-list-form',handleShowListForm)
provide('refesh-list',refresh)

</script>
<template>
	<WrapperDefault
		v-if="data"
		class="h-screen bg-no-repeat bg-center bg-cover relative"
		:style="{
			backgroundImage: `url(${data?.coverImage})`
		}"
	>
		<div
			class="z-[2] absolute top-[65px] left-0 right-0 bottom-0"
			:style="{ backgroundColor: 'rgba(0,0,0,0.2)' }"
		/>
		<template #actions>
			<UButton @click="() => handleShowListForm('create')"
				>Create list</UButton
			>
		</template>
		<div class="z-[3] relative">
			<USlideover v-model="_isShowListForm">
				<OverlayHeader
					:title="_selectedList ? 'Update list' : 'Create list'"
					:on-click="() => (_isShowListForm = false)"
				/>
				<div class="p-4">
					<FormList
						:type="_formListType"
						:initinal-form-state="_selectedList"
						:board-id="route.params.id"
						:on-create-after="handleAfterCreate"
						:on-update-after="handleAfterUpdate"
					/>
				</div>
			</USlideover>
			<h1 class="text-3xl font-semibold text-white">{{ data.name }}</h1>
			<ListContainer :lists="data.list" :board-id="data._id" />
		</div>
	</WrapperDefault>
</template>
