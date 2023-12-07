export const getAllIndexes = (array, value) => array.reduce((a, e, i) => (e === value) ? a.concat(i) : a, []);

export const getAllObjectIndexes = (array, label, value) => array.reduce((a, e, i) => (e[label] === value) ? a.concat(i) : a, []);

