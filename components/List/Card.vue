<script setup>
import moment from 'moment';

const toast = useToast();
const { $logDebug } = useNuxtApp();
const props = defineProps({
	card: Object,
	listId: String,
	onClick: Function
});

const refeshList = inject('refesh-board', () => {});

// functions
const handleDeleteCard = async () => {
	try {
		await useFetch(`/api/list/${props.listId}/card/${props.card?._id}`, {
			method: 'DELETE',
			watch: false
		});
		toast.add({
			title: 'Sucess',
			color: 'green',
			description: 'Deleted card successfully'
		});
		refeshList();
	} catch (error) {
		$logDebug('Log debug inline 14 [components/List/Card.vue]', error);
		toast.add({
			title: 'Error',
			color: 'red',
			description: 'Something went wrong'
		});
	}
};
// states
const _isOpenModalDelete = ref(false);
const status = computed(() => {
	const currentDate = moment();
	const startDate = moment(props.card.startDate);
	const endDate = moment(props.card.endDate);

	if (startDate.isAfter(currentDate)) {
		return 'todo';
	}

	if (
		startDate.isSameOrBefore(currentDate) &&
		endDate.isSameOrAfter(currentDate)
	) {
		return 'inprogress';
	}

	if (endDate.isBefore(currentDate)) {
		return 'end';
	}
});
</script>

<template>
	<div
		class="p-1 pb-[7px] border shadow relative group rounded-md dark:border-gray-700 bg-white dark:bg-gray-700 hover:cursor-pointer"
	>
		<div class="absolute top-0 left-0 right-0 bottom-0 z-[1]" @click="onClick"/>
		<UIcon
			name="i-heroicons-trash"
			class="absolute top-1 right-1 z-[2] group-hover:opacity-100 opacity-0 duration-200"
			@click="_isOpenModalDelete = true"
		/>
		<h3 class="text-[14px]">{{ card.title }}</h3>
		<div class="mt-1">
			<div
				class="flex items-center w-max px-1 py-[1.5px] rounded-sm"
				:class="
					card.isDone
						? 'bg-green-500 text-white'
						: status === 'todo'
						? 'bg-blue-500 text-white'
						: status === 'inprogress'
						? '-ml-1'
						: 'bg-red-500 text-white'
				"
			>
				<UIcon
					name="i-heroicons-clock-solid"
					class="w-[13px] h-[13px] mr-1"
				/>
				<p class="text-[10px]">
					{{
						moment(card.startDate).format('YYYY') ==
						moment(card.endDate).format('YYYY')
							? moment(card.startDate).format('MMMM DD')
							: moment(card.startDate).format('MMMM DD-YYYY')
					}}
				</p>
				<p class="text-[10px] px-1">~</p>
				<p class="text-[10px]">
					{{
						moment(card.startDate).format('YYYY') ==
						moment(card.endDate).format('YYYY')
							? moment(card.endDate).format('MMMM DD')
							: moment(card.endDate).format('MMMM DD-YYYY')
					}}
				</p>
			</div>
		</div>
		<UModal v-model="_isOpenModalDelete"
			><ModalConfirmDelete
				:is-open="_isOpenModalDelete"
				title="Delete card"
				description="Are you sure you want to delete this card?"
				:on-close="() => (_isOpenModalDelete = false)"
				:on-delete="handleDeleteCard"
		/></UModal>
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
