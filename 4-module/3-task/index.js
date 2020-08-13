/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    let trs = table.rows;  

    for (let i = 0; i < trs.length; i++) {
		let tds = trs[i].querySelectorAll('td');

		for (let j = 0; j < tds.length; j++) {
			if (tds[j].dataset.available === 'true') {
				trs[i].classList.add('available');
			} else if (tds[j].dataset.available === 'false') {
				trs[i].classList.add('unavailable');
            }
            
            if (tds[3].dataset.available === undefined){
				trs[i].hidden = true;
			}

			if (tds[j].innerHTML == 'f') {
				trs[i].classList.add('female');
			} else if (tds[j].innerHTML == 'm') {
				trs[i].classList.add('male');
			}
			
			if (tds[1].innerHTML < 18){
				trs[i].style.textDecoration = 'line-through';
			}
	
		}
    }
}
