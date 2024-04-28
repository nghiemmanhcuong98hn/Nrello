export const useCard = () => {
	const toast = useToast();

	const updateCard = async (listId, cardId, data) => {
		try {
			await useFetch(`/api/list/${listId}/card/${cardId}`, {
				method: 'PUT',
				body: data,
				watch: false
			});
		} catch (error) {
			toast.add({
				title: 'Error',
				error: 'Something when wrong'
			});
		}
	};

	return { updateCard };
};
