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
		this.endDate = params.endDate;
		this.HTML = addCountdownToHTML(params); 
		console.log(this.HTML);

		this.update = function() {
			let current = new Date();
			
			// amount of seconds before endDate;
			let	t = ( this.endDate - current ) / 1000;
			
			let time = {
				seconds: Math.floor(t % 60),
				minutes: Math.floor(t / 60) % 60,
				hours: Math.floor( t / 3600 ) % 24,
				days: Math.floor(( t / 3600 ) / 24),
			}
			
			for (const [key, value] of Object.entries(time)) {
				let div = this.HTML.querySelector(`#d-${key}`);
				div.innerHTML = `${value}\n<span>${key}</span>`;
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
	title: "Days Until New Year!",
	endDate: new Date("1 Jan 2022"),
}))
cds.push(new Countdown({
	title: "Days Until My Birthday!",
	endDate: new Date("18 Aug 2022"),
}))

function updateAll() {
	cds.forEach((cd) => {
		cd.update()
	})
}



setInterval(updateAll, 1000)