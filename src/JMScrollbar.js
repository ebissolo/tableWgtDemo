let defaultSettings = () => ({
	handlers: ["keyboard"],
	xRailHeight: 15,
	yRailWidth: 15,
	scrollXPos: 0,
	scrollYPos: 0,
	minScrollbarLength: 30
});

export default class JMScrollbar {

	constructor( element, options ) {
		console.log( "--> scrollbar constructor !" );

		this.container = element;
		this.containerWidth = parseFloat( element.style.width );
		this.containerHeight = parseFloat( element.style.height );

		// Default settings
		this.settings = defaultSettings();

		this.setOptions( options );
		this.appendRailsAndThumbs();
		this.bindEvents();
	}

	bindEvents() {
		for( var key in this.settings.handlers ) {
			switch( this.settings.handlers[key] ) {
				case "keyboard":
					this.bindKeyboardEvent( this );
					break;
			}
		}
	}

	setOptions( options ) {
		for( var opt in options ) {
			this[opt] = options[opt];
		}
	}

	getThumbSize( size ) {
		return parseInt( Math.max( this.settings.minScrollbarLength, size ) );
	}

	setStyles( xRail, yRail, xRailThumb, yRailThumb ) {
		let xRailDim = {
			w: this.containerWidth,
			h: this.settings.xRailHeight,
			left: 0,
			bottom: 0
		};
		let yRailDim = {
			w: this.settings.yRailWidth,
			h: this.containerHeight,
			top: 0,
			right: 0
		};

		// Rails
		xRail.style.width = xRailDim.w + "px";
		xRail.style.height = xRailDim.h + "px";
		xRail.style.left = xRailDim.left + "px"
		xRail.style.bottom = xRailDim.bottom + "px";
		yRail.style.width = yRailDim.w + "px";
		yRail.style.height = yRailDim.h + "px";
		yRail.style.top = yRailDim.top + "px";
		yRail.style.right = yRailDim.right + "px";

		// Thumbs
		xRailThumb.style.width = this.getThumbSize( this.containerWidth * this.containerWidth / this.scrollContentWidth ) + "px";
		xRailThumb.style.height = xRailDim.h + "px";
		yRailThumb.style.width = yRailDim.w + "px";
		yRailThumb.style.height = this.getThumbSize( this.containerHeight * this.containerHeight / this.scrollContentHeight ) + "px";

		this.railX = {
			el: xRail,
			h: xRailDim.h,
			left: xRailDim.left,
			bottom: xRailDim.bottom
		};
		this.railY = {
			el: yRail,
			w: yRailDim.w,
			top: yRailDim.top,
			right: yRailDim.right
		};
		this.thumbX = {
			el: xRailThumb,
			len: parseFloat( xRailThumb.style.width )
		};
		this.thumbY = {
			el: yRailThumb,
			len: parseFloat( yRailThumb.style.height )
		};
	}

	appendRailsAndThumbs() {
		let xRail = document.createElement( "div" );
		let yRail = document.createElement( "div" );
		let xRailThumb = document.createElement( "div" );
		let yRailThumb = document.createElement( "div" );

		xRail.classList.add( "x-rail" );
		yRail.classList.add( "y-rail" );
		xRailThumb.classList.add( "x-rail-thumb" );
		yRailThumb.classList.add( "y-rail-thumb" );

		this.setStyles( xRail, yRail, xRailThumb, yRailThumb );

		xRail.appendChild( xRailThumb );
		yRail.appendChild( yRailThumb );
		this.container.appendChild( xRail );
		this.container.appendChild( yRail );
	}

	updateGeometry( i ) {
		console.log( "--> update geometry" );

		i.railX.el.style.bottom = ( i.railX.bottom - i.container.scrollTop ) + "px";
		i.railX.el.style.left = ( i.railX.left + i.container.scrollLeft ) + "px";
		i.railY.el.style.right = ( i.railY.right - i.container.scrollLeft ) + "px";
		i.railY.el.style.top = ( i.railY.top + i.container.scrollTop ) + "px";

		let scrollbarYTop = i.container.scrollTop * ( i.thumbY.len - this.containerHeight ) / ( i.scrollContentHeight - this.containerHeight );
		let scrollbarXLeft = i.container.scrollLeft * ( i.thumbY.len - this.containerWidth ) / ( i.scrollContentWidth - this.containerWidth );

		i.thumbY.el.style.top = -scrollbarYTop + "px";
		i.thumbX.el.style.left = -scrollbarXLeft + "px";
	}

	bindKeyboardEvent( i ) {
		document.addEventListener( "keydown", ( e ) => {
			e.preventDefault();

			console.log( "--> keycode: " + e.keyCode );

			let deltaX = 0;
			let deltaY = 0;

			switch( e.keyCode ) {
				case 37: // left
					deltaX = -30;
					break;
				case 38: // up
					deltaY = 30;
					break;
				case 39: // right
					deltaX = 30;
					break;
				case 40: // down
					deltaY = -30;
					break;
			}

			this.container.scrollTop -= deltaY;
			this.container.scrollLeft += deltaX;
			this.updateGeometry( i );
		});
	}
}