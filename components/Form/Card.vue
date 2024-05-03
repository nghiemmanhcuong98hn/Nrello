<script setup>
import moment from 'moment';
import { format } from 'timeago.js';
import cardSchema from '~/server/schemas/card.schema';

const props = defineProps({
	listId: String,
	initialFormState: Object,
	type: String,
	onAfterCreate: Function,
	onAfterUpdate: Function
});

const { $logDebug } = useNuxtApp();
const toast = useToast();

// apis
const { data, refresh } = await useFetch(
	`/api/comment/${props.initialFormState?._id}`
);

// states
const message = defineModel('message');
const messageEdit = defineModel('messageEdit');

const _isOpenModalDelete = ref(false);
const _selectCommentId = ref(null);
const _isLoading = ref(false);
const _errorDate = ref(null);
const formState = reactive({
	title: undefined,
	startDate: undefined,
	endDate: undefined,
	description: undefined,
	isDone: false,
	list: props.listId
});

const status = computed(() => {
	const currentDate = moment();
	const startDate = moment(formState.startDate);
	const endDate = moment(formState.endDate);

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

// Funtions
const onSubmit = async event => {
	try {
		if (moment(event.data.startDate).isAfter(moment(event.data.endDate))) {
			return (_errorDate.value =
				'End date cannot be earlier than start date.');
		} else {
			_errorDate.value = null;
		}
		_isLoading.value = true;
		if (props.type === 'update' && props.initialFormState) {
			await useFetch(
				`/api/list/${props.listId}/card/${props.initialFormState?._id}`,
				{
					method: 'PUT',
					body: event.data,
					watch: false
				}
			);
			toast.add({
				title: 'Success',
				description: 'Created card successffuly'
			});
			props.onAfterUpdate();
		} else {
			await useFetch(`/api/list/${props.listId}/card`, {
				method: 'POST',
				body: event.data,
				watch: false
			});
			toast.add({
				title: 'Success',
				description: 'Updated card successffuly'
			});
			props.onAfterCreate();
		}
	} catch (error) {
		$logDebug('Log debug line 87[components/form/card.vue]:', error);
		toast.add({
			title: 'Error',
			description: error.message ?? 'Something went wrong'
		});
	} finally {
		_isLoading.value = false;
	}
};

const handlePostComment = async () => {
	try {
		await useFetch(`/api/comment/${props.initialFormState?._id}`, {
			method: 'POST',
			body: {
				message: message.value
			},
			watch: false
		});
		refresh();
	} catch (error) {
		$logDebug('Log debug line 101[components/form/card.vue]:', error);
		toast.add({
			title: 'Error',
			description: error.message ?? 'Something went wrong'
		});
	}
};

const handleDeleteComment = async () => {
	try {
		await useFetch(`/api/comment/${_selectCommentId.value}/${props.initialFormState?._id}`, {
			method: 'DELETE',
			watch: false
		});
		_selectCommentId.value = null;
		refresh();
	} catch (error) {
		$logDebug('Log debug line 127[components/form/card.vue]:', error);
		toast.add({
			title: 'Error',
			description: error.message ?? 'Something went wrong'
		});
	}
}

const handleEditComment = async (comment) => {
	try {
		if (_selectCommentId.value) {
			if(messageEdit.value !== comment.message) {
				await useFetch(`/api/comment/${_selectCommentId.value}/${props.initialFormState?._id}`,{
					method:'PUT',
					body: {
						message: messageEdit.value
					},
					watch: false
				})
				await refresh();
			}
			_selectCommentId.value = null
			messageEdit.value = null
		} else {
			_selectCommentId.value = comment._id
			messageEdit.value = comment.message
		}
	} catch (error) {
		$logDebug('Log debug line 147[components/form/card.vue]:', error);
		toast.add({
			title: 'Error',
			description: error.message ?? 'Something went wrong'
		});
	}
}

// watch
watchEffect(() => {
	if (props.type === 'update' && props.initialFormState) {
		formState.title = props.initialFormState.title;
		formState.startDate = moment(props.initialFormState.startDate).format(
			'YYYY-MM-DD'
		);
		formState.endDate = moment(props.initialFormState.endDate).format(
			'YYYY-MM-DD'
		);
		formState.description = props.initialFormState.description;
		formState.isDone = props.initialFormState.isDone;
	} else {
		formState.title = undefined;
		formState.description = undefined;
		formState.startDate = undefined;
		formState.endDate = undefined;
		formState.isDone = false;
	}
});
</script>

<template>
	<div class="p-4">
		<UForm :state="formState" :schema="cardSchema" class="-mt-4" :class="type === 'update'
			? 'flex justify-between gap-4 md:flex-row flex-col'
			: ''
			" @submit="onSubmit">
			<div v-if="type === 'update'" class="md:w-[60%] w-full space-y-3 pt-4 h-[55vh] overflow-y-auto md:border-b-0 border-b border-white md:pb-0 pb-8 custome-scroll-bar">
				<div>
					<h3>Title</h3>
					<p class="mt-1 pl-4">{{ formState.title }}</p>
				</div>
				<div>
					<h3>Due Date</h3>
					<div class="flex items-center w-max p-1 rounded-sm mt-1 ml-2" :class="formState.isDone
						? 'bg-green-500 text-white'
						: status === 'todo'
							? 'bg-blue-500 text-white'
							: status === 'inprogress'
								? '-ml-1'
								: 'bg-red-500 text-white'
						">
						<UIcon name="i-heroicons-clock-solid" class="w-4 h-4 mr-1" />
						<p class="text-[12px]">
							{{
								moment(formState.startDate).format(
									'MMMM DD-YYYY'
								)
							}}
						</p>
						<p class="text-[12px] px-1">~</p>
						<p class="text-[12px]">
							{{
								moment(formState.endDate).format('MMMM DD-YYYY')
							}}
						</p>
					</div>
				</div>
				<div>
					<h3>Description</h3>
					<div class="pl-4 mt-1 card-description" :style="{}" v-html="formState.description" />
				</div>
				<div>
					<h3>Comemnts</h3>
					<div class="px-4 mt-2 flex items-center gap-2">
						<UButton class="h-[32px] rounded-[50%]" @click="handlePostComment" type="button">
							<UIcon name="i-heroicons-magnifying-glass" />
						</UButton>
						<UInput name="comment_message" placeholder="Write a comment..." class="flex-1" v-model="message" />
					</div>
					<div class="px-4 mt-4">
						<div v-for="comment in data" class="flex items-start gap-2 mb-2">
							<UButton class="w-[32px] h-[32px] rounded-[50%] flex justify-center text-[14px]">
								{{ getName(comment.owner.name) }}
							</UButton>
							<div>
								<div class="flex items-center gap-2 mb-1">
									<p class="leading-none break-all text-[13px]">
										{{ comment.owner.name }}
									</p>
									<p class="dark:text-gray-300 mt-[1px] text-[11px]">
										{{ format(comment.createdAt) }}
									</p>
								</div>
								<div class="bg-white rounded-md p-2 shadow dark:bg-gray-700">
									<UInput v-if="comment._id === _selectCommentId && !_isOpenModalDelete" v-model="messageEdit" />
									<p v-else class="leading-none text-black break-all dark:text-white text-[14px]">
										{{ comment.message }}
									</p>
								</div>
								<div class="flex items-center gap-2 mt-1">
									<p class="text-[11px] underline cursor-pointer" @click="() => handleEditComment(comment)">
										{{ comment._id === _selectCommentId && !_isOpenModalDelete ? 'save' : 'edit' }}
									</p>
									<p class="text-[11px] underline cursor-pointer" @click="() => {
										_isOpenModalDelete = true
										_selectCommentId = comment._id
									}">
										delete
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="space-y-4" :class="type === 'update' ? 'md:w-[40%] w-full' : ''">
				<div class="absolute top-[15px] left-[7.5rem]">
					<UTooltip text="Completed" :popper="{ placement: 'right' }">
						<UCheckbox v-model="formState.isDone" />
					</UTooltip>
				</div>
				<UFormGroup name="title" label="Title">
					<UInput v-model="formState.title" />
				</UFormGroup>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-4">
					<UFormGroup name="startDate" label="Start Date">
						<UInput v-model="formState.startDate" type="date" />
						<p class="text-[12px] pl-1 pt-1 text-red-600" v-if="_errorDate">
							End date cannot be earlier than start date.
						</p>
					</UFormGroup>
					<UFormGroup name="endDate" label="End Date">
						<UInput v-model="formState.endDate" type="date" />
					</UFormGroup>
				</div>
				<UFormGroup name="description" label="Description">
					<ClientOnly fallback-tag="div" fallback="Loading editor...">
						<QuillEditor v-model:content="formState.description" content-type="html" toolbar="minimal" />
					</ClientOnly>
				</UFormGroup>
				<UButton block :loading="_isLoading" type="submit">{{
					type === 'update' ? 'Update card' : 'Create card'
				}}</UButton>
			</div>
		</UForm>
	</div>
	<UModal v-model="_isOpenModalDelete">
		<ModalConfirmDelete :is-open="_isOpenModalDelete" 
		title="Delete comment" 
		description="Are you sure you want to delete this comment?" 
		:on-close="() => {
			_isOpenModalDelete = false
			_selectCommentId = null
		}" 
		:on-delete="handleDeleteComment" />
	</UModal>
</template>
<style>
.card-description ul {
	list-style: disc;
	padding-left: 30px;
}

.card-description h1 {
	font-size: 20px;
	font-weight: bold;
}

.card-description h2 {
	font-size: 18px;
	font-weight: bold;
}

.card-description ol {
	list-style: decimal;
	padding-left: 30px;
}
</style>
