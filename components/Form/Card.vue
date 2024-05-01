<script setup>
import moment from 'moment';
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

// states
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

// Funtions
const onSubmit = async event => {
	try {
		if(moment(event.data.startDate).isAfter(moment(event.data.endDate))){
			return _errorDate.value = 'End date cannot be earlier than start date.';
		}else {
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
		$logDebug('Log debug line 53[components/form/card.vue]:', error);
		toast.add({
			title: 'Error',
			description: error.message ?? 'Something went wrong'
		});
	} finally {
		_isLoading.value = false;
	}
};

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
		<UForm
			:state="formState"
			:schema="cardSchema"
			class="space-y-4 -mt-4"
			@submit="onSubmit"
		>
			<div class="absolute top-[15px] left-[7.5rem]">
				<UTooltip text="Completed" :popper="{ placement: 'right' }">
					<UCheckbox v-model="formState.isDone"/>
				</UTooltip>
			</div>
			<UFormGroup name="title" label="Title">
				<UInput v-model="formState.title" />
			</UFormGroup>
			<div class="grid sm:grid-cols-2 grid-cols-1 gap-4">
				<UFormGroup name="startDate" label="Start Date">
					<UInput v-model="formState.startDate" type="date" />
					<p class="text-[12px] pl-1 pt-1 text-red-600" v-if="_errorDate">End date cannot be earlier than start date.</p>
				</UFormGroup>
				<UFormGroup name="endDate" label="End Date">
					<UInput v-model="formState.endDate" type="date" />
				</UFormGroup>
			</div>
			<UFormGroup name="description" label="Description">
				<ClientOnly fallback-tag="div" fallback="Loading editor...">
					<QuillEditor
						v-model:content="formState.description"
						content-type="html"
						toolbar="minimal"
					/>
				</ClientOnly>
			</UFormGroup>
			<UButton block :loading="_isLoading" type="submit">{{
				type === 'update' ? 'Update card' : 'Create card'
			}}</UButton>
		</UForm>
	</div>
</template>
