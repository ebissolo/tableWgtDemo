export default function( instance ) {
	console.log( "--> update geometry" );

	let scrollbarYTop = instance.container.scrollTop * ( instance.thumbY.len - instance.containerHeight ) / ( instance.scrollContentHeight - instance.containerHeight );
	let scrollbarXLeft = instance.container.scrollLeft * ( instance.thumbY.len - instance.containerWidth ) / ( instance.scrollContentWidth - instance.containerWidth );

	instance.thumbY.el.style.top = -scrollbarYTop + "px";
	instance.thumbX.el.style.left = -scrollbarXLeft + "px";
};

