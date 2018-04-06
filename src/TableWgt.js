import PerfectScrollbar from "perfect-scrollbar";
import TableGeometry from "./TableGeometry.js";
import RowPrototype from "./RowPrototype.js";
import RowPrototypes from "./RowPrototypes.js";
import GenericWgt from "./GenericWgt.js";


export default class TableWgt {
	constructor( id, options ) {
		console.log( "--> construct Table widget !" );

		this.elem = document.getElementById( "tableWgt" );
		this.width = options.width;
		this.height = options.height;
		this.id = this.elem.id = id;

		this.elem.style.width = this.width + "px";
		this.elem.style.height = this.height + "px";

		this.rowPrototypes = options.rowPrototypes;
		this.globalStrokeWidth = 1;
		
		document.body.appendChild( this.elem );

		// Ref
		this.m_table = new TableGeometry();
		this.m_rowPrototypes = [];
		//this.m_protoClonedWgts = [];

		pushWidget( this );
	}

	addScrollbar( scrollbarOptions ) {
		this.scrollbar = new PerfectScrollbar( this.elem, scrollbarOptions );

		let self = this;
		this.elem.addEventListener( "ps-scroll-y", ( e ) => {
			console.log( "--> attach scrollbar listerner on y axis" );
			self.scrollTo( self.scrollbar.lastScrollTop );
			self.scrollbar.update();
		});
	}

	addWidget( wgt ) {
		if( this.wgts == null )
			this.wgts = [];
		this.wgts.push( wgt );
	}

	getWidgetsOfRow( idx ) {
		let wgts = [];

		for( let i = 0; i < this.wgts.length; i++ ) {
			if( this.wgts[i].rowOccupied == idx ) {
				wgts.push( this.wgts[i] );
			}
		}
		return wgts;	
	}

	renderRowsPrototypes() {
		for( let i = 0; i < this.m_table.rows.length; i++ ) {
			let div = document.createElement( "div" );
			div.classList.add( "row" );

			div.style.top = this.m_table.rows[i].top + "px";
			div.style.height = this.m_table.rows[i].height + "px";
			div.style.width = this.width + "px";

			div.setAttribute( "row-index", i );

			this.elem.appendChild( div );
		}
	}

	defineGeometryAndScrollbar() {
		let rowNumber = this.wgts.length; // from table widget
		let tableModel = this.model;
		let prototypesHeights = [];

		// Init heights
		for( let i = 0; i < rowNumber; i++ ) {
			prototypesHeights.push( this.wgts[i].height );
		}

		this.m_table.clear();
		
		let top = 0;

		// Init rows geometry
		for( let i = 0; i < tableModel.length - 1; i++ ) {
			let type = parseInt( tableModel[i+1]["_t"] );
			let row = {			// cpp: TableGeometry::Row& row
				type: null,
				top: 0,
				height: 0
			};

			row.top = top;
			row.type = type;
			row.height = prototypesHeights[type];
			top += row.height;

			this.m_table.rows.push(row);
		}

		this.renderRowsPrototypes();
		if( this.scrollbar == null ) { // add scrollbar
			this.addScrollbar();
		}
	}

	initPrototypesAndGeometry() {
		let rowNumber = this.wgts.length; // from table widget
		//let tableHeight = this.height;

		this.m_rowPrototypes = []; // eq to clear()

		for( let i = 0; i < rowNumber; i++ ) {
			let proto = new RowPrototype();
			let protos = new RowPrototypes();

			this.m_rowPrototypes[i] = protos;

			proto.free = true;
			proto.row = -1;

			let wgts = this.getWidgetsOfRow( i );

			proto.rowWidgets = wgts;
			protos.rows.push( proto ); // in runtime it's used qt "push_back"
		}

		this.scrollBy( 0 );
		this.scrollTo( 0 );
	}

	lowerBound( rows, row ) {
		for( let i = 0; i < rows.length; i++ ) {
			if( rows[i].top >= row.top ) {
				if ( i == 0 ) {
					return i;
				} else {
					return i-1;
				}
			}
		}  
	}

	checkOutOfViewPrototypes( startIndex, endIndex ) {
		for( let i = 0; i < this.m_rowPrototypes.length; i++ ) { 
			let protos = this.m_rowPrototypes[i];
			for( let j = 0; j < protos.rows.length; ) {
				let row = protos.rows[j];

				if ( row.free ) {
					break;
				}

				if ( row.row < startIndex ) {
					/**
					 *  cpp: row.free = true;
						UninstallRuntimeBackground(row.row);
						row.freeRow(viewController);
						viewController->unregisterDelegate(row.row);
						row.row = -1;

						protos.rows.push_back(row);
						r = protos.rows.erase(r);
						continue;
					 */
					row.free = true;
					row.freeRow();
					//row.unregisterDelegate();
					row.row = -1;
					protos.rows.splice( j, 1, row ); // cpp: protos.rows.push_back(row); ??
													 //      r = protos.rows.erase(r);
					continue;
				}

				if ( row.row >= endIndex ) {
					for( let k = j; k < protos.rows.length; k++ ) {
						let row = protos.rows[k];

						row.free = true;
						row.freeRow();
						//row.unregisterDelegate(); //?
						row.row = -1;
					}
					break;
				}
				j++;
			}
			protos.iterator = 0;
		}
	}

	clone( wgts, idx ) {
		let clones = [];

		console.log( "--> cloning widget !" );

		for( let i = 0; i < wgts.length; i++ ) {
			let id = wgts[i].id + idx;
			let cl = wgts[i].cl;
			let opt = wgts[i].opt;

			if ( cl == "GenericWgt" ) {
				cl = GenericWgt;
			}

			let newInstance = new cl( id, opt, this );
			clones.push( newInstance );
		}
		return clones;
	}

	cloneRow( rowType, idx ) {
		let r = new RowPrototype();
		r.rowWidgets = this.clone( this.rowPrototypes[rowType], idx );
		return r;
	}

	renderRow( row ) {
		console.log( "--> row index: " + row.row );

		for( let i = 0; i < row.rowWidgets.length; i++ ) {
			this.elem.childNodes[row.row].appendChild( row.rowWidgets[i].elem );
		}
	}

	clonePrototypes( startIndex, endIndex ) {
		let protos;
		for ( let i = startIndex; i < endIndex; i++ ) {

			let modelRow = this.model[i+1];
			let rowType = parseInt( modelRow["_t"] );
			protos = this.m_rowPrototypes[rowType];

			if ( protos.iterator == protos.rows.length )  { // scanIterator
				let r = this.cloneRow( rowType, i );

				protos.rows.push( r );
				protos.iterator = protos.rows.length - 1;

			} else {
				let row = protos.rows[protos.iterator];

				if ( !row.free && row.row != i ) {
					let lastRow = protos.rows[protos.rows.length - 1];

					if ( lastRow.free ) {
						protos.rows.splice( i, 0, lastRow );
						protos.rows.pop(); // cpp: protos.rows.removeLast();
					} else {
						let r = this.cloneRow( rowType, i );

						protos.rows.splice( i, 0, r );
					}
				}
			}

			let row = protos.rows[protos.iterator];

			let left = 0; // temp
			let top = this.m_table.rows[i].top;
			let height = this.m_table.rows[i].height;
			let width = this.width;

			let wgts = row.rowWidgets;

			let counter = 0;
			if ( row.free ) {
				row.free = false;
				row.row = i;
				
				let rowIndex = i;

				this.renderRow( row );

				// Activation datalinks, multilanguage etc.
				// ...
			}

			protos.iterator++;
		}
	}

	scrollBy( scrollXPos, scrollYPos ) {
		console.log( "--> scrollBy() call !!" );
	}

	scrollTo( scrollPos ) {
		console.log( "--> scrollTo() call !!" );

		let viewHeight = this.height;
		let tableModel = this.model;
		let lastRow = this.m_table.rows[this.m_table.rows.length-1];

		let startPos = scrollPos - this.globalStrokeWidth; // cpp: qreal startPos = _scrollPos - mo.GetGlobalStrokeWidth() - pagePrecachedSize;
		let endPos = scrollPos + viewHeight;

		let dummyStartRow = { 	  // cpp: TableGeometry::Row& row
			type: null,
			top: 0,
			height: 0
		};
		dummyStartRow.top = startPos;

		let startIndex = this.lowerBound( this.m_table.rows, dummyStartRow ) - 0; // cpp: qLowerBound(m_table.rows, dummyStartRow) - m_table.rows.begin();
		let endIndex = startIndex;

		for(;endIndex < this.m_table.rows.length && this.m_table.rows[endIndex].top < endPos; endIndex++) {} // Computes endIndex

		console.log( "--> startIndex: " + startIndex + " endIndex: " + endIndex );

		startIndex = Math.max( startIndex-1, 0 );

		this.checkOutOfViewPrototypes( startIndex, endIndex );
		this.clonePrototypes( startIndex, endIndex );
	}

	onModelChange() {
		console.log( "--> onModelChange() call !!" );

		this.defineGeometryAndScrollbar();
		this.initPrototypesAndGeometry();
	}
}

// Setter/Getter
Object.defineProperty( TableWgt.prototype, "model",
	{
		get: function() {
			console.log( "--> property get !" ); 
			return this._model;
		},
		set: function( currentModel ) {
			this._model = currentModel;
			console.log( "--> property set ! call onModelChange() method !" );

			this.onModelChange();
		}
	}
);