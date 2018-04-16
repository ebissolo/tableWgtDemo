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
		this.rowPrototypes = [];

		this.elem.style.width = this.width + "px";
		this.elem.style.height = this.height + "px";
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
	
	/**
	 * @param  {} scrollbarOptions
	 */
	addScrollbar( scrollbarOptions ) {
		this.scrollbar = new PerfectScrollbar( this.elem, { wheelSpeed: 4 } );

		this.elem.addEventListener( "ps-scroll-y", () => {
			this.scrollTo( this.elem.scrollTop );
		} );
	}
	
	/**
	 * @param  {} wgt
	 */
	addWidget( wgt ) {
		if( this.wgts == null )
			this.wgts = {};
		this.wgts[wgt.id] = wgt;
	}
	
	/**
	 * @param  {} idx
	 */
	getWidgetsOfRow( idx ) {
		let wgts = [];

		for( let key in this.wgts ) {
			let wgt = this.wgts[key];
			if( wgt.rowOcc == idx )
				wgts.push( wgt );
		}
		return wgts;
	}

	/**
	 * @param  {} prop
	 * @param  {} value
	 */
	updateContentArea( prop, value ) {
		let contentArea = document.getElementById( this.id + "_contentArea" );

		if ( contentArea.style[prop] != null ) {
			contentArea.style[prop] = value + "px";
		}
	}

	defineGeometryAndScrollbar() {
		let rowNumber = this.rowNumber; // from table widget
		let tableModel = this.model;
		let prototypesHeights = [];
		let top = 0;
		let totalHeight = 0;

		// Init heights
		for( let i = 0; i < rowNumber; i++ ) {
			prototypesHeights.push( this.rowsProps[i] );
		}

		this.m_table.clear();

		// Init rows geometry
		for( let i = 0; i < tableModel.length - 1; i++ ) {
			let type = parseInt( tableModel[i+1]["_t"] );
			let row = {
				type: type,
				top: top,
				height: prototypesHeights[type]
			};

			this.m_table.rows.push(row);
			
			top += row.height;
			totalHeight += row.height;
		}

		this.updateContentArea( "height", totalHeight );

		// Add scrollbar
		if( this.scrollbar == null ) {
			this.addScrollbar();
		}
	}

	initPrototypesAndGeometry() {
		let rowNumber = this.rowNumber; // from table widget

		this.m_rowPrototypes = [];
		this.rowPrototypes = [];

		for( let i = 0; i < rowNumber; i++ ) {
			let proto = new RowPrototype();
			let protos = new RowPrototypes();

			this.m_rowPrototypes[i] = protos;

			proto.free = true;
			proto.row = -1;

			let wgts = this.getWidgetsOfRow( i ); // Diff in jm4web

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
		for( let i = 0; i < rows.length; i++ ) { // qt qLowerBound funct call
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
	 * @param  {} classString
	 */
	getClass( classString ) {
		switch( classString ) {
			case "GenericWgt":
				return GenericWgt;
		}
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
			let newInstance;

			opt.rowOcc = idx;

			// Class name
			cl = this.getClass( "GenericWgt" );

			newInstance = new cl( id, opt, this );
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
					row.freeRow(); // do nothing by now ?? doubt
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

			if ( protos.iterator == protos.rows.length )  {
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

			// Forced clone
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

	getMinMaxIndex( startPos, endPos ) {
		let dummyStartRow = {
			type: null,
			top: startPos,
			height: 0
		};

		let startIndex = this.lowerBound( this.m_table.rows, dummyStartRow );
		let endIndex = startIndex;

		for(;endIndex < this.m_table.rows.length && this.m_table.rows[endIndex].top < endPos; endIndex++) {}

		startIndex = Math.max( startIndex - 1, 0 );

		let clusterSize = endIndex - startIndex + 1;
		let clusterBlock = Math.round( clusterSize / 3 );
		let maxValidRowIndex = this.m_table.rows.length - 1;

		// Before
		console.log( "startIndex: " + startIndex );
		console.log( "endIndex: " + endIndex );

		startIndex = ( ( startIndex - clusterBlock ) >= 0 && ( startIndex - clusterBlock ) < startIndex ) ? ( startIndex - clusterBlock ) : startIndex;
		endIndex = ( ( endIndex + clusterBlock ) <= maxValidRowIndex && ( endIndex + clusterBlock ) > endIndex ) ? ( endIndex + clusterBlock ) : endIndex;

		// After
		console.log( "startIndexInCluster: " + startIndex );
		console.log( "endIndexInCluster: " + endIndex );

		return { startIndex, endIndex };
	}

	/**
	 * @param  {} scrollPos
	 */
	scrollTo( scrollPos ) {
		console.log( "--> scrollTo() call !!" );

		let viewHeight = this.height;
		let startPos = scrollPos - this.globalStrokeWidth;
		let endPos = scrollPos + viewHeight;
		let { startIndex, endIndex } = this.getMinMaxIndex( startPos, endPos );

		this.checkOutOfViewPrototypes( startIndex, endIndex );
		this.clonePrototypes( startIndex, endIndex );
	}

	onModelChange() {
		console.log( "--> onModelChange() call !!" );

		this.defineGeometryAndScrollbar();
		this.initPrototypesAndGeometry();
		this.scrollTo( this.elem.scrollTop );
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