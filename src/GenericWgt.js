export default class GenericWgt {
	constructor( id, options, parentWgt ) {
		this.bgcolor = options.bgcolor;
		this.rowOccupied = options.rowOccupied;
		this.parentWgt = parentWgt;
		
		this.cl = "GenericWgt";
		this.opt = options;

		this.elem = document.createElement( "div" );

		// Bounds
		this.width = options.w;
		this.height = options.h;
		this.x = options.x;
		this.y = options.y;

		this.elem.id = this.id = id;
		this.elem.style.width = options.w + "px";
		this.elem.style.height = options.h + "px";
		this.elem.style.left = options.x + "px";
		this.elem.style.top = options.y + "px";
		this.elem.style.backgroundColor = this.bgcolor;
		this.elem.classList.add( "wgt" );
		this.elem.appendChild( document.createTextNode( "" + this.id ) );

		this.parentWgt.addWidget( this );
	}
}