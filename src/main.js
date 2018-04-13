import TableWgt from "./TableWgt.js";
import GenericWgt from "./GenericWgt.js";
import { model } from "../dataSource/data.js";

window.wgts = [];
window.pushWidget = function( wgt ) {
	wgts.push( wgt );
}
window.getWidgetById = function( id ) {
	for( let i = 0; i < wgts.length; i++ ) {
		if ( wgts[i].id = id ) {
			return wgts[i]
		}
	}
}

window.tableWgt = new TableWgt( "tableWgt", { 
	width: 500,
	height: 300
	// rowPrototypes: [
	// 	[ // first row
	// 		{
	// 			id: "wgt1",
	// 			cl: "GenericWgt",
	// 			opt: { w: 500, h: 100, x: 0, y: 0, bgcolor: "red", rowOccupied: 0 }
	// 		}
	// 	],
	// 	[ // second row
	// 		{ 
	// 			id: "wgt2",
	// 			cl: "GenericWgt",
	// 			opt: { w: 500, h: 140, x: 0, y: 0, bgcolor: "green", rowOccupied: 1 }
	// 		}
	// 	]
	// ]
 }); 

// Add Generic widgets
let wgt1 = new GenericWgt( "wgt1", { w: 800, h: 100, x: 0, y: 0, bgcolor: "red", rowOccupied: 0 }, tableWgt );
let wgt2 = new GenericWgt( "wgt2", { w: 800, h: 140, x: 0, y: 100, bgcolor: "green", rowOccupied: 1 }, tableWgt );

tableWgt.model = model;

