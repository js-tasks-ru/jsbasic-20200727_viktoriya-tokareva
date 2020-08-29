/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
    constructor(rows) {
	    this.elem = this.render(rows);
    }

    render (rows) {
		let button = '<button>X</button>';
		let table = document.createElement('table');
		let tbody = document.createElement('tbody');
        for (let row of rows) {
	        let tr = document.createElement('tr');
		 
	        for (let tds in row) {
		        let td = document.createElement('td');
		        td.innerHTML = row[tds];
				tr.appendChild(td);
			}

			let tdButton = document.createElement('td');
            tr.appendChild(tdButton);
		    tdButton.insertAdjacentHTML('beforeend', button);
		
		    tr.lastChild.addEventListener('click', function (event) {
				let elemParent = event.target.parentElement;
			    elemParent.parentElement.remove();
		    });
            tbody.appendChild(tr);
			table.appendChild(tbody);
		}
		return table;
    }
}
