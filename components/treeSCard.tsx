import SCard from "../components/SCard";
import Card from "@mui/material/Card"
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {Student} from "./commontypes";

interface TreeCardProps {
	baapu?: Student;
	bacchas: Array<Student>;
	data: Student;
	displayCard: Function;
	clearOverlay?: Function;
}

function TreeCard(props: TreeCardProps) {
	return (
		<div className="tree-view">
			{ props.baapu != undefined
				? <SCard
					pointer={true}
					compact={"ultra"}
					data={props.baapu}
					onClick={()=>{
						props.displayCard(props.baapu);
					}}
				/>
				: <Card>Not Available :(</Card>
			}
			<SCard 
				pointer={true}
				compact={true}
				data={props.data}
				onClick={()=>{
					props.displayCard(props.data);
				}}
			/>
			<div
				className="bacchas"
			>
			{props.bacchas.length > 0 
			?props.bacchas.map((el) => //this is fine because bacchas is *always* an array, no matter what - if no bacchas then it is an empty array - doQuery in App.js will simply return an empty array
				<SCard
					pointer={true}
					compact={"ultra"}
					data={el}
					key={el.i}
					onClick={(e)=>{
						//smoothly scroll to top
						document.getElementsByClassName("MuiModal-root")[0].scrollTo(0,0);
// 						let start = null;
// 						let scroll = window
// 						window.requestAnimationFrame(function step(currentTime) {
// 							if (!start) start = currentTime;
// 							
// 						});
						//actually show the card
						props.displayCard(el);
					}}
				/>
			)
			: ""
			}
			</div>
		</div>
	);
}

export default TreeCard;
