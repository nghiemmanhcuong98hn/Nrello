<script setup>
import draggableComponent from 'vuedraggable';

const props = defineProps({
	list: Object
});

const { $logDebug } = useNuxtApp();
const { destroy, updateOrderCardsInList } = useList();

// apis
const { data, refresh } = useFetch('/api/list/' + props.list?._id + '/card');

// provides
provide('refesh-board', refresh);

// Functions
const handleOpenFormModal = (type, data = null) => {
	_formCardType.value = type;
	_isShowFormCardModal.value = true;
	_selectCard.value = data;
};

const handleAfterCreate = () => {
	_isShowFormCardModal.value = false;
	refresh();
};

const handleAfterUpdate = () => {
	_isShowFormCardModal.value = false;
	_selectCard.value = null;
	refresh();
};

// injects
const refeshList = inject('refesh-list', () => {});
const handleShowListForm = inject('show-list-form', () => {});

// states
const _isShowFormCardModal = ref(false);
const _selectCard = ref(null);
const _formCardType = ref('create');
const actions = ref([
	[
		{
			label: 'Edit List',
			icon: 'i-heroicons-pencil',
			click: () => handleShowListForm('update', props.list)
		}
	],
	[
		{
			label: 'Add Card',
			icon: 'i-heroicons-plus-circle',
			click: () => handleOpenFormModal('create')
		}
	],
	[
		{
			label: 'Delete',
			icon: 'i-heroicons-trash',
			click: async () => {
				await destroy(props.list?._id);
				refeshList();
			}
		}
	]
]);

const handleChangeOrderCard = async e => {
	try {
		await updateOrderCardsInList(props.list?._id, data.value);
	} catch (error) {
		$logDebug('Log debug line 71[components/List/Item.vue]:', error);
		toast.add({
			title: 'Error',
			error: 'Something when wrong'
		});
	}
};
</script>

<template>
	<div
		class="flex flex-col w-[280px] shadow flex-none bg-white dark:bg-gray-800 rounded-lg"
	>
		<!-- header -->
		<div
			class="p-2 border-b list-handle dark:border-gray-700 flex items-center justify-between rounded-t-lg text-shadow"
			:style="{
				backgroundColor: list.headerBg ? list.headerBg : 'unset'
			}"
		>
			<h3 class="font-medium">{{ list.name }}</h3>
			<UDropdown :items="actions" class="z-[11]">
				<UIcon name="i-heroicons-cog-6-tooth" />
			</UDropdown>
		</div>
		<!-- end header -->
		<!-- body -->
		<draggableComponent
			v-if="data"
			:list="data"
			group="list"
			item-key="_id"
			:animation="300"
			:scroll-sensitivity="500"
			:force-fallback="true"
			ghost-class="ghost-card"
			@change="handleChangeOrderCard"
			class="p-2 space-y-2 overflow-hidden flex-1"
		>
			<template #item="{ element }">
				<ListCard
					:card="element"
					:listId="props.list?._id"
					:on-click="() => handleOpenFormModal('update', element)"
				/>
			</template>
		</draggableComponent>
		<!-- end body -->
		<!-- footer -->
		<div class="p-1 border-t dark:border-gray-700">
			<UButton block @click="handleOpenFormModal('create')"
				>Add Card</UButton
			>
		</div>
		<!-- end  footer -->
		<Teleport to="body">
			<UModal
				v-model="_isShowFormCardModal"
				:ui="{
					width:
						_formCardType === 'update'
							? 'sm:max-w-5xl'
							: 'sm:max-w-2xl'
				}"
			>
				<OverlayHeader
					:title="_selectCard ? 'Update card' : 'Create card'"
					:on-click="() => (_isShowFormCardModal = false)"
				/>
				<FormCard
					:title="_selectCard ? 'Update card' : 'Create card'"
					:list-id="list?._id"
					:initial-form-state="_selectCard"
					:on-after-create="handleAfterCreate"
					:on-after-update="handleAfterUpdate"
					:type="_formCardType"
				/>
			</UModal>
		</Teleport>
	</div>
</template>
<style>
.ql-container {
	height: 200px;
}
</style>
