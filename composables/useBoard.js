export const useBoard = () => {
	const { $logDebug } = useNuxtApp();
	const toast = useToast();
	const destroy = async boardId => {
		try {
			await useFetch('/api/board/' + boardId, {
				method: 'DELETE',
				watch: false
			});

			toast.add({
				color: 'green',
				title: 'Success',
				description: 'Deleted board successffuly'
			});
		} catch (error) {
			$logDebug('Log debug line 17[composables/useBoard.js]:', error);
			toast.add({
				color: 'red',
				title: 'Error',
				description: error.message ?? 'Something went wrong'
			});
		}
	};

	return { destroy };
};
