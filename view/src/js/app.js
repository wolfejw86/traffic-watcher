import React, { Component } from "react";
import { render } from "react-dom";
import Accident from "./components/accident.js";

class Main extends Component {
	constructor() {
		super();
		this.state = {
			accidents: []
		}
		this.accidentsGet();
	}
	async accidentsGet() {
		const response = await fetch("/api/traffic/accidents");
		const accidents = await response.json();
		this.setState(accidents);
	}
	render() {
		{ console.log(this.state.accidents) }
		return (
			<div>
				<div className="outer-container">
					React Working AgAin

				</div>
				<table>
					<thead>
						<tr>
							<th>Time</th>
							<th>Description</th>
							<th>Lat</th>
							<th>Lng</th>
						</tr>
					</thead>
					<tbody>
						{this.state.accidents.map((a, i, arr) => <Accident key={i} accident={a} />)}
					</tbody>

				</table>
			</div>
		);
	}
}

render(<Main />, document.getElementById("app"));