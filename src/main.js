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

// Table widget
window.tableWgt = new TableWgt( "tableWgt", { width: 500, height: 500, rowNumber: 3, rowsProps: [100, 140, 40] } ); 

// First row
let wgt1 = new GenericWgt( "wgt1", { w: 300, h: 100, x: 0, y: 0, bgcolor: "red", rowOccupied: 0 }, tableWgt );
let wgt2 = new GenericWgt( "wgt2", { w: 300, h: 100, x: 300, y: 0, bgcolor: "blue", rowOccupied: 0 }, tableWgt );

// Second row
let wgt3 = new GenericWgt( "wgt3", { w: 400, h: 140, x: 0, y: 100, bgcolor: "green", rowOccupied: 1 }, tableWgt );
let wgt4 = new GenericWgt( "wgt4", { w: 200, h: 140, x: 400, y: 100, bgcolor: "orange", rowOccupied: 1 }, tableWgt );

// Third row
let wgt5 = new GenericWgt( "wgt5", { w: 100, h: 40, x: 0, y: 240, bgcolor: "gray", rowOccupied: 2 }, tableWgt );
let wgt6 = new GenericWgt( "wgt6", { w: 500, h: 40, x: 100, y: 240, bgcolor: "yellow", rowOccupied: 2 }, tableWgt );

tableWgt.model = model;

