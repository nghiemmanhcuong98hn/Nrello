export default function (name) {
	let result = '';
	const nameString = name.split(' ');

	nameString.forEach(item => {
		result += item.charAt(0).toUpperCase();
	});

      return result;
}
