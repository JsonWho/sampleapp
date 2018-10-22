import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Listing from '../Listing/Listing';



class Listings extends Component {

	constructor(props) {
		super(props);

		this.state = {



		}



	}




	componentWillMount() {

	}



	componentWillUnmount() {

	}










	render() {


		const listItems = this.props.listings.map((item) => 

			<Link to={'/listing/'+item.id+'/'+ item.name } key={item.id}>
				<div className="listing_container">

				<div className="toprow">
					<div className="image"></div>
					<div className="dsc"><span>{item.desc}</span></div>
					</div>

					<div className="substrip">
						<div className="name">{item.name}</div>
						<div className="pills">
							<div>{item.age}</div>
							<div>{item.bodytype}</div>
							<div>{item.background}</div>
							<div>${item.starting_price}+</div>
							</div>

					<div className="location_container">
						<div className="location">{item.suburb}</div></div></div>
				</div>
			</Link>

			);




		return (

			<div id="listingsroot">

			<div className="listings">
			{listItems}
			</div>

			</div>



			);


	}

}


export default Listings;