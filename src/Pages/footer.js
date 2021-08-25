import React, { Component } from "react";
import Affichage_Produit from './Affichage_Produit';
import Pagination from './Pagination'
import { Range } from 'react-range';
import Select from "react-select";

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

class Foot extends Component {
	render() {
		return (
			<footer class="footer">
				<div class="footer_content">
					<div class="container">
						<div class="row">



							<div className="logo col-lg-4  col-12 ">
								<div className=" d-flex flex-column  mt-5  ">
									<div className="title-bot ">Papouf</div>


								</div>
							</div>
							<div class="col-lg-4 footer_col">
								<div class="footer_menu">
									<div class="footer_title">Support</div>
									<ul class="footer_list">
										<li>
											<a href="#"><div>Customer Service</div></a>
										</li>
										<li>
											<a href="#"><div>Return Policy</div></a>
										</li>

										<li>
											<a href="#"><div>Terms and Conditions</div></a>
										</li>
										<li>
											<a href="#"><div>Contact</div></a>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-lg-4 footer_col">
								<div class="footer_contact">
									<div class="footer_title">Stay in Touch</div>
								
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="footer_bar">
					<div class="container">
						<div class="row">
							<div class="col">
								<div class="footer_bar_content d-flex flex-md-row flex-column align-items-center justify-content-start">
									<div class="copyright order-md-1 order-2">
										
</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}
export default Foot
