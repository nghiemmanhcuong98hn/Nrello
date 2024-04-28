<script setup>
import listSchema from '~/server/schemas/list.schema';

const props = defineProps({
	type: String,
	initinalFormState: Object ?? null,
	onCreateAfter: Function ?? null,
	onUpdateAfter: Function ?? null,
	boardId: String
});

const { $logDebug } = useNuxtApp();
const toast = useToast();

// states
const _isLoading = ref(false);
const formState = reactive({
	name: undefined,
	board: props.boardId
});

// Functions
const resetFormState = () => {
	formState.name = undefined;
};

const onSubmit = async event => {
	try {
		_isLoading.value = true;
		if (props.type === 'update' && props.initinalFormState?._id) {
			await useFetch('/api/list/' + props.initinalFormState?._id, {
				method: 'PUT',
				body: event.data,
				watch: false
			});
			props.onUpdateAfter?.();
			toast.add({
				title: 'Success',
				color: 'green',
				description: 'Updated list successfully'
			});
		} else {
			await useFetch('/api/list', {
				method: 'POST',
				body: event.data,
				watch: false
			});
			toast.add({
				title: 'Success',
				color: 'green',
				description: 'Created list successfully'
			});
			props.onCreateAfter?.();
		}
		resetFormState();
	} catch (error) {
		$logDebug('Log debug line 57[components/form/list.vue]:', error);
		toast.add({
			title: 'Error!',
			color: 'red',
			description: 'List creation failed something went wrong!'
		});
	} finally {
		_isLoading.value = false;
	}
};

watchEffect(() => {
	if (props.type === 'update' && props.initinalFormState) {
		formState.name = props.initinalFormState.name;
	}

	if (props.type === 'create') {
		formState.name = undefined;
	}
});
</script>
<template>
	<UForm
		:state="formState"
		class="space-y-4"
		@submit="onSubmit"
		:schema="listSchema"
	>
		<UFormGroup label="Name" name="name">
			<UInput v-model="formState.name" />
		</UFormGroup>
		<UButton block type="submit" :loading="_isLoading">
			{{ type === 'update' ? 'Update List' : 'Create List' }}
		</UButton>
	</UForm>
</template>
