export const useList = (boardId) => {
    const { $logDebug } = useNuxtApp();
    const toast = useToast()

	// functions
	const handleSort = async (lists) => {
		await useFetch('/api/board/' + boardId, {
			method: 'PUT',
			body: {
				list: lists.flatMap(item => item._id)
			},
			watch: false
		});
	};

    const destroy = async (listId) => {
        try {
            await useFetch('/api/list/' + listId, {
                method: 'DELETE',
                watch: false
            });

            toast.add({
                color:'green',
                title:'Success',
                description:'Deleted list successffuly'
            })
        } catch (error) {
            $logDebug('Log debug line 29[composables/useList.js]:', error);
            toast.add({
                color:'red',
                title:'Error',
                description: error.message ?? 'Something went wrong'
            })
        }
    }

    const updateOrderCardsInList = async (listId, cards) => {
		await useFetch('/api/list/' + listId, {
			method: 'PUT',
			body: { cards: cards.flatMap(card => card._id) },
			watch: false
		});
	};

    return {handleSort,destroy,updateOrderCardsInList}
};
