<script setup>
import boardSchema from '~/server/schemas/board.schema';

const props = defineProps({
	type: String,
	initinalFormState: Object ?? null,
	onCreateAfter: Function ?? null,
	onUpdateAfter: Function ?? null
});

const { $logDebug } = useNuxtApp();
const toast = useToast();

// states
const _isLoading = ref(false);
const formState = reactive({
	name: undefined,
	coverImage: undefined
});

// Functions
const resetFormState = () => {
	formState.name = undefined;
	formState.coverImage = undefined;
};

const onSubmit = async event => {
	try {
		_isLoading.value = true;
		if (props.type === 'update' && props.initinalFormState?._id) {
			await useFetch('/api/board/' + props.initinalFormState?._id, {
				method: 'PUT',
				body: {
					...event.data,
					...(!event.data.coverImage
						? { backgroundIndex: Math.floor(Math.random() * 5) }
						: {})
				},
				watch: false
			});
			props.onUpdateAfter?.();
			toast.add({
				title: 'Success',
				color: 'green',
				description: 'Updated board successfully'
			});
		} else {
			await useFetch('/api/board', {
				method: 'POST',
				body: {
					...event.data,
					...(!event.data.coverImage
						? { backgroundIndex: Math.floor(Math.random() * 5) }
						: {})
				},
				watch: false
			});
			toast.add({
				title: 'Success',
				color: 'green',
				description: 'Created board successfully'
			});
			props.onCreateAfter?.();
		}
		resetFormState();
	} catch (error) {
		$logDebug('Log debug line 57[components/form/bard.vue]:', error);
		toast.add({
			title: 'Error!',
			color: 'red',
			description: 'Board creation failed something went wrong!'
		});
	} finally {
		_isLoading.value = false;
	}
};

watchEffect(() => {
	if (props.type === 'update' && props.initinalFormState) {
		formState.name = props.initinalFormState.name;
		formState.coverImage = props.initinalFormState.coverImage;
	}

	if (props.type === 'create') {
		formState.name = undefined;
		formState.coverImage = undefined;
	}
});
</script>
<template>
	<UForm
		:state="formState"
		class="space-y-4"
		@submit="onSubmit"
		:schema="boardSchema"
	>
		<UFormGroup label="Name" name="name">
			<UInput v-model="formState.name" />
		</UFormGroup>
		<UFormGroup name="coverImage" label="Cover Image">
			<ImagePicker v-model="formState.coverImage" />
		</UFormGroup>
		<UButton block type="submit" :loading="_isLoading">
			{{ type === 'update' ? 'Update Board' : 'Create Board' }}
		</UButton>
	</UForm>
</template>
