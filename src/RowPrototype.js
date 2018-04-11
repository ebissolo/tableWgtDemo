export default class RowPrototype {
	constructor() {
		this.free = true;
		this.row = 0;
		this.rowWidgets = [];
	}
	freeRow() {
		console.log( "--> freeRow !" );
		// this.rowWidgets = [];
 	}
}