export const getArray = (length, content) => {
	const func = typeof content === 'function' ? content : () => content;
	return Array.from({length}, func);
};