export const useToastMessage = () => {
      const toast = useToast();

	const sucessMsg = message => {
		toast.add({
			title: 'Success',
			color: 'green',
			description: message
		});
	};

	const errorMsg = message => {
		toast.add({
			title: 'Error',
			color: 'red',
			description: message
		});
	};

      return {sucessMsg,errorMsg}
};
