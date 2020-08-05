/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let filterArr = arr.filter(item => (a <= item && item <= b) );
	return filterArr;
}
