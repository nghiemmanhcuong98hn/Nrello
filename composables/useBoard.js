export const useBoard = () => {
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
			toast.add({
				color: 'red',
				title: 'Error',
				description: error.message ?? 'Something went wrong'
			});
		}
	};

	return { destroy };
};
