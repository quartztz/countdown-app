// template for the countdown

const countdownTemplate = `
	<div class="elements">
		<div class="c-element" id="d-days">
			0
			<span>days</span>
		</div>
		<div class="c-element" id="d-hours">
			0
			<span>hours</span>
		</div>
		<div class="c-element" id="d-minutes">
			0
			<span>minutes</span>
		</div>
		<div class="c-element" id="d-seconds">
			0
			<span>seconds</span>
		</div>
	</div>
	`

class Countdown {
	constructor(params) {
		this.title = params.title;
		this.endDate = new Date(params.endDate);
		this.HTML = addCountdownToHTML(params); 
		this.over = false;

		this.formatTime = function(time) {
			return (time < 10) ? `0${time}` : time;
		}

		this.update = function() {
			let current = new Date();
			
			// amount of seconds before endDate;
			let	t = ( this.endDate - current ) / 1000;

			if ( t <= 0 ) {
				
				if (this.HTML.className == "countdown-over") {
					return;
				} else {
					let div = this.HTML;
					let elements = div.querySelector(".elements");
					let p = document.createElement("p");
					p.innerText = `Countdown over! Was set to ${this.endDate.toDateString().slice(3)}.`
					div.className = "countdown-over";
					elements = div.replaceChild(p, elements);
					this.over = true;
				}

			} else {
			
				let time = {
					seconds: Math.floor(t % 60),
					minutes: Math.floor(t / 60) % 60,
					hours: Math.floor( t / 3600 ) % 24,
					days: Math.floor(( t / 3600 ) / 24),
				}
				
				for (const [key, value] of Object.entries(time)) {
					let div = this.HTML.querySelector(`#d-${key}`);
					div.innerHTML = `${this.formatTime(value)}\n<span>${key}</span>`;
				}
			}
		}
	}
}

function addCountdownToHTML(params) {

	let main = document.createElement('div');
	main.className = "countdown-wrapper";
	main.innerHTML = `<h1>${params.title}</h1>`;
	main.innerHTML += countdownTemplate;

	target = document.querySelector(".main-wrapper");
	target.appendChild(main);

	return main;

}

let cds = [];

cds.push(new Countdown({
	title: "A While Ago",
	endDate: new Date("05 Sept 2021"),
}))
cds.push(new Countdown({
	title: "Christmas",
	endDate: new Date("25 Dec 2021"),
}))
cds.push(new Countdown({
	title: "New Year's",
	endDate: new Date("1 Jan 2022"),
}))
cds.push(new Countdown({
	title: "Birthday",
	endDate: new Date("18 Aug 2022"),
}))

function updateAll() {
	cds.forEach((cd) => {
		cd.update()
	})
}

function openForm() {
	form = document.querySelector(".form-wrapper");
	mw = document.querySelector(".main-wrapper");

	mw.className += " blur";
	form.className += " visible";
}

function createNewCountdown(create) {
	
	// creates a countdown if "create" is set. 
	// if it isn't, closes the form.

	if ( create ) {

		// finds the values in the form.

		let title = document.querySelector("#title").value;
		let date = document.querySelector("#date").value;
		console.log(title, date);

		// creates new countdown and pushes it into the 
		// main array.

		cds.push(new Countdown({
			title: title,
			endDate: date,
		}));
	}

	// closes the form.

	form = document.querySelector(".form-wrapper");
	mw = document.querySelector(".main-wrapper");
	
	form.className = "form-wrapper";
	mw.className = "main-wrapper";
	console.log("closed");

}

setInterval(updateAll, 1000);