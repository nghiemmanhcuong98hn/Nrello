<script setup>
import moment from 'moment';

const props = defineProps({
	card: Object,
	onClick: Function
});

const status = computed(() => {
	const currentDate = moment();
	const startDate = moment(props.card.startDate);
	const endDate = moment(props.card.endDate);

	if (startDate.isAfter(currentDate)) {
		return 'todo';
	}

	if (startDate.isSameOrBefore(currentDate) && endDate.isSameOrAfter(currentDate)) {
		return 'inprogress';
	}

	if (endDate.isBefore(currentDate)) {
		return 'end';
	}
});
</script>

<template>
	<div
		class="p-1 pb-[7px] border shadow rounded-md dark:border-gray-700 bg-white dark:bg-gray-700 cursor-grab"
		@click="onClick"
	>
		<h3 class="text-[14px]">{{ card.title }}</h3>
		<div class="mt-1">
			<div
				class="flex items-center w-max px-1 py-[1.5px] rounded-sm"
				:class="
					card.isDone
						? 'bg-green-500'
						: status === 'todo'
						? 'bg-blue-500'
						: status === 'inprogress'
						? '-ml-1'
						: 'bg-red-500'
				"
			>
				<UIcon name="i-heroicons-clock-solid" class="w-[13px] h-[13px] mr-1" />
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
