import TableGeometry from "./TableGeometry.js";
import RowPrototype from "./RowPrototype.js";
import RowPrototypes from "./RowPrototypes.js";
import GenericWgt from "./GenericWgt.js";
import PerfectScrollbar from "../lib/perfect-scrollbar";

export default class TableWgt {
	constructor( id, options ) {
		console.log( "--> construct Table widget !" );

		this.elem = document.getElementById( "tableWgt" );
		this.width = options.width;
		this.height = options.height;
		this.left = options.left;
		this.top = options.top;
		this.id = this.elem.id = id;

		this.rowNumber = options.rowNumber;
		this.rowsProps = options.rowsProps;
		this.clusterSize = 4;

		this.elem.style.width = this.width + "px";
		this.elem.style.height = this.height + "px";
		this.rowPrototypes = [];
		this.globalStrokeWidth = 1;
		
		document.body.appendChild( this.elem );

		// Ref
		this.m_table = new TableGeometry();
		this.m_rowPrototypes = [];

		this.createContentArea();
		pushWidget( this );
	}

	createContentArea() {
		const div = document.createElement( "div" );
		div.id = this.id + "_contentArea";
		this.elem.appendChild( div );
	}

	addScrollbar( scrollbarOptions ) {
		this.scrollbar = new PerfectScrollbar( this.elem );

		this.elem.addEventListener( "ps-scroll-y", () => {
			this.scrollTo( this.elem.scrollTop );
		} );
		this.elem.addEventListener( "ps-scroll-x", () => {
			this.scrollBy( this.elem.scrollLeft );
		} );
	}
	
	/**
	 * @param  {} wgt
	 */
	addWidget( wgt ) {
		if( this.wgts == null )
			this.wgts = [];
		this.wgts.push( wgt );
	}
	
	/**
	 * @param  {} idx
	 */
	getWidgetsOfRow( idx ) {
		let wgts = [];

		for( let i = 0; i < this.wgts.length; i++ ) {
			if( this.wgts[i].rowOccupied == idx ) {
				wgts.push( this.wgts[i] );
			}
		}
		return wgts;	
	}

	defineGeometryAndScrollbar() {
		let rowNumber = this.rowNumber; // from table widget
		let tableModel = this.model;
		let prototypesHeights = [];

		// Init heights
		for( let i = 0; i < rowNumber; i++ ) {
			prototypesHeights.push( this.rowsProps[i] ); // Read it from gridGroupLayour properties
		}

		this.m_table.clear();
		
		let top = 0;
		let totalHeight = 0;

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

			totalHeight += row.height;
		}

		// Modifies contentArea height
		let contentArea = document.getElementById( this.id + "_contentArea" );
		contentArea.style.height = totalHeight + "px";

		if( this.scrollbar == null ) { // add scrollbar
			this.addScrollbar();
		}
	}

	initPrototypesAndGeometry() {
		let rowNumber = this.rowNumber; // from table widget

		this.m_rowPrototypes = [];

		for( let i = 0; i < rowNumber; i++ ) {
			let proto = new RowPrototype();
			let protos = new RowPrototypes();

			this.m_rowPrototypes[i] = protos;

			proto.free = true;
			proto.row = -1;

			let wgts = this.getWidgetsOfRow( i );

			proto.rowWidgets = wgts;
			protos.rows.push( proto ); // in runtime it's used qt "push_back"

			// Store original prototypes
			this.rowPrototypes.push( proto );
		}
	}
	
	/**
	 * @param  {} rows
	 * @param  {} row
	 */
	lowerBound( rows, row ) {
		for( let i = 0; i < rows.length; i++ ) {
			if( rows[i].top > row.top ) {
				return i;
			}
		}  
	}

	/**
	 * @param  {} rowType
	 * @param  {} wgtIdx
	 * @param  {} rowIdx
	 */
	getId( rowType, wgtIdx, rowIdx ) {
		let originalProtoId = this.rowPrototypes[rowType].rowWidgets[wgtIdx].id;
		return rowIdx != 0 ? originalProtoId + rowIdx : originalProtoId; // NB: make sure that is a valid jm4web id
	}

	/**
	 * @param  {} rowType
	 * @param  {} idx
	 */
	cloneRow( rowType, idx, rowProto ) {
		let r = new RowPrototype();
		let wgts = rowProto.rowWidgets;

		for( let i = 0; i < wgts.length; i++ ) {

			let id = this.getId( rowType, i, idx );
			let cl = wgts[i].cl;
			let opt = wgts[i].opt;

			// Hard coded
			if ( cl == "GenericWgt" ) {
				cl = GenericWgt;
			}

			let newInstance = new cl( id, opt, this );
			r.rowWidgets.push( newInstance );
		}
		return r;
	}

	deleteRowElements() {
		let contentArea = document.getElementById( this.id + "_contentArea" );
		let childrenLen = contentArea.childNodes.length;
		for( let i = 0; i < childrenLen; i++ ) {		
			contentArea.removeChild( contentArea.firstChild );
		}
	}

	/**
	 * @param  {} rows
	 */
	renderRowElements( rows ) {
		let contentArea = document.getElementById( this.id + "_contentArea" );
		let fragment = document.createDocumentFragment();

		for( let row in rows ) {
			let proto = rows[row];

			for( let j = 0; j < proto.rowWidgets.length; j++ ) {
				let wgt = proto.rowWidgets[j];

				// bounds
				wgt.elem.style.width = wgt.w + "px";
				wgt.elem.style.height = this.m_table.rows[proto.row].height + "px";
				wgt.elem.style.left = ( this.elem.scrollLeft + wgt.x ) + "px";
				wgt.elem.style.top = ( this.m_table.rows[proto.row].top ) + "px";

				fragment.appendChild( wgt.elem );
			}
		}
		contentArea.appendChild( fragment );
	}

	/**
	 * @param  {} startIndex
	 * @param  {} endIndex
	 */
	checkOutOfViewPrototypes( startIndex, endIndex ) {

		for( let i = 0; i < this.m_rowPrototypes.length; i++ ) { 
			let protos = this.m_rowPrototypes[i];
			for( let j = 0; j < protos.rows.length; ) {
				let row = protos.rows[j];

				if ( row.free ) {
					break;
				}

				if ( row.row < startIndex ) {
					row.free = true;
					row.freeRow() // do nothing by now ?? doubt
					row.row = -1;

					protos.rows.push( row );
					protos.rows.splice( j, 1 );

					continue;
				}

				if ( row.row >= endIndex ) {
					for( let k = j; k < protos.rows.length; k++ ) {
						let row = protos.rows[k];

						row.free = true;
						row.freeRow(); // do nothing by now ?? doubt
						row.row = -1;
					}
					break;
				}
				j++;
			}
			protos.iterator = 0;
		}
	}

	/**
	 * @param  {} startIndex
	 * @param  {} endIndex
	 */
	clonePrototypes( startIndex, endIndex ) {
		let isChanged = false;
		let rowsToRender = [];
		let addClone = false;

		for ( let i = startIndex; i < endIndex; i++ ) {

			let modelRow = this.model[i+1];
			let rowType = parseInt( modelRow["_t"] );
			let protos = this.m_rowPrototypes[rowType];

			if ( protos.iterator == protos.rows.length )  { // scanIterator
				let r = this.cloneRow( rowType, i, protos.rows[0] );

				protos.rows.push( r );
				protos.iterator = protos.rows.length - 1;
			} else {
				let row = protos.rows[protos.iterator];

				if ( !row.free && row.row != i ) {
					let lastRow = protos.rows[protos.rows.length - 1];

					if ( lastRow.free ) {
						let r = this.cloneRow( rowType, i, lastRow );

						// just swap
						protos.rows.splice( protos.iterator, 0, r );
						protos.rows.pop();
					} else {
						let r = this.cloneRow( rowType, i, protos.rows[0] );

						// append a new row
						protos.rows.splice( protos.iterator, 0, r );
					}
				} else {
					addClone = true;
				}
			}

			let row = protos.rows[protos.iterator];

			if ( row.free ) {
				if ( addClone ) {
					row = this.cloneRow( rowType, i, row );
				}

				row.free = false;
				row.row = i;

				if ( addClone ) {
					protos.rows[protos.iterator] = row;
				}

				isChanged = true;
			}

			rowsToRender.push( row );
			protos.iterator++;
		}

		if( isChanged ) {

			// Log
			console.log( "------------- indexes in view:" );
			for( let i = startIndex; i < endIndex; i++ ) {
				console.log( "" +  i );
			}
			console.log( "------------------------------" );
			
			requestAnimationFrame( () => {
				this.deleteRowElements();
				this.renderRowElements( rowsToRender );
			} );
		}
	}
	
	/**
	 * @param  {} scrollXPos
	 * @param  {} scrollYPos
	 */
	scrollBy( scrollXPos, scrollYPos ) {
		console.log( "--> scrollBy() call !!" );

		// do something ...
		// let contentArea = document.getElementById( this.id + "_contentArea" );
		// contentArea.scrollLeft = scrollXPos + "px";

		this.scrollTo( scrollYPos );
	}
	
	/**
	 * @param  {} scrollPos
	 */
	scrollTo( scrollPos ) {
		console.log( "--> scrollTo() call !!" );

		let viewHeight = this.height;
		let tableModel = this.model;
		let lastRow = this.m_table.rows[this.m_table.rows.length-1];

		let startPos = scrollPos - this.globalStrokeWidth; // cpp: qreal startPos = _scrollPos - mo.GetGlobalStrokeWidth() - pagePrecachedSize; ?? doubt
		let endPos = scrollPos + viewHeight;

		let dummyStartRow = { 	  // cpp: TableGeometry::Row& row
			type: null,
			top: 0,
			height: 0
		};
		dummyStartRow.top = startPos;

		let startIndex = this.lowerBound( this.m_table.rows, dummyStartRow ); // cpp: qLowerBound(m_table.rows, dummyStartRow) - m_table.rows.begin();
		let endIndex = startIndex;

		for(;endIndex < this.m_table.rows.length && this.m_table.rows[endIndex].top < endPos; endIndex++) {} // Computes endIndex 

		startIndex = Math.max( startIndex - 1, 0 );

		this.checkOutOfViewPrototypes( startIndex, endIndex );
		this.clonePrototypes( startIndex, endIndex );
	}

	onModelChange() {
		console.log( "--> onModelChange() call !!" );

		this.defineGeometryAndScrollbar();
		this.initPrototypesAndGeometry();
		this.scrollBy( 0, 0 );
	}
}

// Setter/Getter
Object.defineProperty( TableWgt.prototype, "model",
	{
		get: function() {
			return this._model;
		},
		set: function( currentModel ) {
			this._model = currentModel;
			this.onModelChange();
		}
	}
);