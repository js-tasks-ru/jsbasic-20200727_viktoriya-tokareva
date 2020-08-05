/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  let namesArr = [];
	for (let elem of users) {
		namesArr.push(elem['name']);
	}
	return namesArr;
}
