/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
	let newStr = str.split(/\s*,| \s*/);
    
	newStr.sort( (a, b) => a - b );
	
	let result = {
      min: +newStr[0],
      max: +newStr[newStr.length - 1],
	};

	return result;
}
