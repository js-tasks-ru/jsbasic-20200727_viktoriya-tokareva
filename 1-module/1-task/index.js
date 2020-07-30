/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let res = n;
	if (n === 0){
		res = 1;
	}
	for (let i = 1; i < n; i++) {
		res *= n - i;
	}
	return res;
}
