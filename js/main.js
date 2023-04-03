let
	// theHeading = document.querySelector("#main-header h1"),
	closet = document.querySelector("#closetCon"),
	closetPieces = document.querySelectorAll(".clothing-piece img"),
	dropBoard = document.querySelector("#dropCon"),
	dropZones = document.querySelectorAll(".drop-zone"),
	// store the dragged piece in a global variable
	// because we need it in the handleDrop function
	draggedPiece;

//audio ref

const	theAudioEl = document.querySelector('audio'),
		playButton = document.querySelector('#playButton'),
		pauseButton = document.querySelector('#pauseButton'),
		rewindButton = document.querySelector('#rewindButton'),
      		resetButton = document.querySelector('#resetButton'),

		volSlider = document.querySelector ('#volumeControl');


// === functions ===
function handleStartDrag() { 
	console.log('started dragging this piece:', this);

	// store a reference to the puzzle piece image that we're dragging
	// so we can use it later and move it to a drop zone
	draggedPiece = this;
}

function handleDragOver(e) { 
	e.preventDefault(); // e is shorthand for event
	// this overrides the default dragover behaviour
	console.log('dragged over me'); 
}

function handleDrop(e) {
	e.preventDefault();
	console.log('dropped something on me');


	let matchClass = draggedPiece.parentNode.classList[1];

	// if (e.target.classList.contains(matchClass) && this.children.length < 0) {
	// 	this.appendChild(draggedPiece);
		
	// 	} else {
	// 		return;
	// 	}
	
	if (e.target.classList.contains(matchClass)) {
		console.log('we are the same');
		
	} else {
		return;
	}
	
	if (this.children.length > 0) {
		console.log('you cannot drop more than one piece in a drop zone');
		return;
	}
	else {
			this.appendChild(draggedPiece);
	}	

// audio functions

function loadAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
    theAudioEl.src = currentSrc
    theAudioEl.load();
    playAudio();
}

function restartAudio() {
    theAudioEl.currentTime = 0;
}
function pauseAudio() {
    theAudioEl.pause();
}
	
function playAudio() {
    theAudioEl.play();
}
	
function resetDrop() {
	window.location.reload();
}

function setVolume() {
    console.log(this.value);
    theAudioEl.volume = this.value/100;
}

// === event listeners ===

closetPieces.forEach(cover => cover.addEventListener('drag', loadAudio));

// add event handling for the custom controls
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
rewindButton.addEventListener('click', restartAudio);
resetButton.addEventListener('click', resetDrop);


volSlider.addEventListener('change', setVolume);
	
}

// add the drag event handling to the puzzle pieces
closetPieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

// add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

