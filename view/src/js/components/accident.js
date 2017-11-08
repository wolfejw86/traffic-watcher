import React, { Component } from "react";
import moment from "moment";

class Accident extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<tr>
				<td>{moment(this.props.accident.DATETIME_ADD).format('h:mm:ss a')}</td>
				<td>{this.props.accident.EVENT_DESC}</td>
				<td>{this.props.accident.LATITUDE}</td>
				<td>{this.props.accident.LONGITUDE}</td>

			</tr>
		);
	}
}
export default Accident;