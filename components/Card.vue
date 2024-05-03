<script setup>
const props = defineProps({
	board: Object,
	onEdit: Function
});

const router = useRouter();
const { destroy } = useBoard();

// injects
const refeshBoard = inject('refesh-board', () => {});

// functions
const handleInviteUser = async () => {
	await useFetch(`/api/board/${props.board._id}/invite`, { method: 'PUT' });
};

// states
const actions = ref([
	[
		{
			label: 'Edit',
			icon: 'i-heroicons-pencil',
			click: () => props?.onEdit(props.board)
		}
	],
	[
		{
			label: 'Invite User',
			icon: 'i-heroicons-envelope',
			click: handleInviteUser
		}
	],
	[
		{
			label: 'Delete',
			icon: 'i-heroicons-trash',
			click: async () => {
				await destroy(props.board?._id);
				refeshBoard();
			}
		}
	]
]);
</script>
<template>
	<div
		class="shadow-lg drak:bg-gray-800 rounded-lg overflow-hidden relative min-h-36 cursor-pointer"
	>
		<div
			class="h-36 relative"
			@click="() => router.push(`/board/${board?._id}`)"
		>
			<NuxtImg
				v-if="board.coverImage"
				:src="board.coverImage"
				:alt="board.name"
				class="h-full w-full object-cover absolute z-[1]"
			/>
			<div
				v-if="!board.coverImage"
				class="h-full w-full absolute z-[1]"
				:style="{
					backgroundColor: getDefaultBackgroupBoard(
						board.backgroundIndex
					)
				}"
			></div>
			<div
				class="absolute w-full h-full z-[2] bg-gradient-to-b from-black/90 to-transparent"
			></div>
		</div>
		<div
			class="flex items-center justify-between gap-2 absolute left-0 z-10 top-0 py-2 pl-2 pr-8"
		>
			<NuxtLink
				:to="`/board/${board?._id}`"
				class="block font-semibold text-white truncate-2"
			>
				{{ board.name }}
			</NuxtLink>
		</div>
		<UDropdown
			:items="actions"
			:popper="{ placement: 'right-start' }"
			class="absolute top-2 right-2 z-[11]"
		>
			<UIcon name="i-heroicons-cog-6-tooth" class="text-white" />
		</UDropdown>
	</div>
</template>
<style>
.truncate-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-word;
}
</style>
