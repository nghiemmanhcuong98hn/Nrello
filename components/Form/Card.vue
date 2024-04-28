<script setup>
// import { QuillEditor } from '@vueup/vue-quill';
import cardSchema from '~/server/schemas/card.schema';

const props = defineProps({
	listId: String,
	initialFormState: Object,
	type: String,
	onAfterCreate: Function,
	onAfterUpdate: Function
});

const toast = useToast();

// states
const _isLoading = ref(false);
const formState = reactive({
	title: undefined,
	description: undefined,
	list: props.listId
});

// Funtions
const onSubmit = async event => {
	try {
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
		formState.description = props.initialFormState.description;
	} else {
		formState.title = undefined;
		formState.description = undefined;
	}
});
</script>

<template>
	<div class="p-4">
		<UForm
			:state="formState"
			:schema="cardSchema"
			class="space-y-4"
			@submit="onSubmit"
		>
			<UFormGroup name="title" label="Title">
				<UInput v-model="formState.title" />
			</UFormGroup>
			<UFormGroup name="description" label="Description">
				<!-- <ClientOnly fallback-tag="div" fallback="Loading editor...">
					<QuillEditor
						v-model:content="formState.description"
						content-type="html"
						toolbar="minimal"
					/>
				</ClientOnly> -->
			</UFormGroup>
			<UButton block :loading="_isLoading" type="submit">{{
				type === 'update' ? 'Update card' : 'Create card'
			}}</UButton>
		</UForm>
	</div>
</template>
