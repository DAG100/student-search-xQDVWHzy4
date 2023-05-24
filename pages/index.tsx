import Options from "../components/Options";
import Display from "../components/Display";
import Overlay from "../components/Overlay";
import ReactDOM from 'react-dom/client';
import React, {useState, useEffect} from "react";
import {ThemeProvider,createTheme} from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {DarkModeSharp, LightModeRounded, HelpOutlineRounded, MailOutlineRounded} from "@mui/icons-material";
// import {students as STUDENTS, rollToYear} from "../components/student_data_getter.tsx";
import TreeCard from "../components/treeSCard";
import SCard from "../components/SCard";
import {Student as StudentType, Query as QueryType, Options as OptType} from "../components/commontypes";

//start shared search worker
if (!(typeof window === "undefined") && window.Worker) {//only on the client, TODO: find better method - do when dealing w/ SSG
	var searcher = new Worker(new URL("../components/data_worker", import.meta.url));
}





export default function Home(props: Object) {

	const [students, setStudents]:[Array<StudentType>, Function] = useState([]);
	const [darkMode, setDarkMode]=useState(true);
	//initial render doesn't have access to localStorage so start off with true
	const [currDisp, setCurr]:[any, Function] = useState();
	const [loading, setLoading] = useState(true); //loading at the start
	const [listOpts, setOpts]:[OptType, Function] = useState({
		batch:["Loading..."],
		hall:["Loading..."],
		prog:["Loading..."],
		dept:["Loading..."],
		bloodgrp:["Loading..."]
	});
	
	function queryHandler(event: any) {
//		console.log("Query result received");
		if (event.data[0] == "query") {
			setStudents(event.data[1]);
// 			setLoading(false);
		}
	}
	
	function treeHandler(event: any) {
//		console.log("Tree result received");
		if (event.data[0] == "ft") {
// 			document.body.style.overflow = "hidden"; //hotfix
			let [baapu, student, bacchas] = event.data[1];
			setCurr(<TreeCard
				key="open"
				data={student}
				baapu={baapu /*TreeCard'll handle undefined*/}
				bacchas={bacchas}
				displayCard={displayCard}
				clearOverlay={clearOverlay}
			/>);
		}
		
	}
	
	function optsHandler(event: any) {
		if (event.data[0] == "Options") {
			setOpts(event.data[1]);
		}
	}
	
	function errorHandler(event: any) {
		if (event.data === "Error") {
			console.log("Worker has an error");
		}
	}
	
	useEffect(() => {
		//on mount: set up worker handler, wait for it to initialise, and then:
		//1. get list options from it
		//2. set up the handlers for query and treecard
//		console.log("waiting for worker");
		searcher.postMessage("ready?");
		searcher.onmessage = null;
		searcher.onmessage = (event) => {
			if (event.data !== "Worker ready") {
				//error condition
				
			} else {
//				console.log(searcher.onmessage);
//				console.log("Worker should be ready now");
//				console.log("geting options list");
				searcher.onmessage = (event) => {
					if (event.data[0] != "Options") return;
					setLoading(false);
//					console.log("options list gotten");
					setOpts(event.data[1]);
					searcher.onmessage = null; //remove this event handler
					searcher.addEventListener("message", queryHandler);
					searcher.addEventListener("message",treeHandler);
					searcher.addEventListener("message", optsHandler); //when web worker updates, it will send out options again
					searcher.addEventListener("message", errorHandler);
				   
				};
				searcher.postMessage("Options");
			}
		};
		return (() => {searcher.onmessage = null;}); //on unmount: remove all handlers
	},[])
	
	useEffect(() => {
		setDarkMode(localStorage.getItem("darkmode") !== "false")
	},[props]);
	
	useEffect(() => {
		if (darkMode) {
			document.body.style.backgroundColor = "#000";
		} else {
			document.body.style.backgroundColor = "#efefef";
		}
	},[darkMode]);
	//props should only change at start -> shouldn't change afterwards -> this should be good for loading darkmode pref at start 
	
	
	const sendQuery = (query: QueryType)=> {
		searcher.postMessage(query);
//		console.log(query);
// 		setLoading(true);
// 		if (!workerReady) return [];
		
	}

	const clearOverlay = ()=> {
		setCurr(undefined);
// 		document.body.style.overflow = "auto"; //hotfix
	}
	
	const displayElement = (element: any) => {
		clearOverlay();
		setCurr(element);
// 		document.body.style.overflow = "hidden"; //hotfix
	}
	
	const displayCard = (student: StudentType) =>{
		clearOverlay();
// 		document.body.style.overflow = "hidden"; //hotfix
		setCurr(<SCard
			compact={false}
			data={student}
			key="closed"
		>
		<Button
			onClick={() => {displayTree(student);}}
		>Open Family Tree</Button>
		</SCard>);
	}
	
	const displayTree = (student: StudentType) => {
		clearOverlay();
		// if (!workerReady) return;
		searcher.postMessage(["ft", student]);
	}
  
  	return (
    <div>
    <ThemeProvider theme={darkMode 
			? createTheme({
				palette:{
					mode: "dark",
				}
			})
			: createTheme({
				
			})
  	}>
  	<div 
  		className="buttons"
  		style={{
  			zIndex:"9999"
  		}}
  	>
		<Fab
		  onClick={()=>{
					setDarkMode(!darkMode);
					localStorage.setItem("darkmode", String(!darkMode));}}
		>
		{darkMode ?
				<LightModeRounded />
				: <DarkModeSharp />}
		</Fab>
		<Fab
			onClick={() => {
				displayElement(
					<Card
						style={{
							padding:"10px"
						}}
					>
						<h1>Setting a custom DP</h1>
						<p>You can customise the image shown here by placing a custom image in your iitk webhome folder called dp.jpg/dp.png such that going to http://home.iitk.ac.in/~yourusername/dp opens up that particular picture.</p>
						<h1>How do I update the data shown here?</h1>
						<p>{`The data here is scraped from the Office Automation Portal. The data there can be updated via the Login Based Services > Student Profile > PI form . If you have had a branch change, please go to the ID Cell and update your ID Card to update your branch.`}</p>
						<p>The changes if any will be reflected in about a week. </p>
					</Card>
				);
			}}
		>
			<HelpOutlineRounded />
		</Fab>
		<Fab
			style={{
				display:(students.length < 3000 && students.length > 0 ? "" : "none")
			}}
			onClick={() => {
				displayElement(
					<Card
						style={{
							padding:"10px",
							width:"80vw",
							maxWidth:"1200px",
							maxHeight:"1000px"
						}}
					>
						<p>{`Press the 'copy' button to copy all email addresses.`}</p>
						<div
							style={{
								height:"60vh",
								overflow:"auto"
						}}
						>
						{students.filter((el) => (el.u.length > 0)).map((el) => (el.u + "@iitk.ac.in")).join(", ")}
						</div>
						<Button 
							variant="contained"
							onClick={() => {
								navigator.clipboard.writeText(students.filter((el) => (el.u.length > 0)).map((el) => (el.u + "@iitk.ac.in")).join(", "));
							}}
						>Copy</Button>
					</Card>
				);
			}}
		>
			<MailOutlineRounded />
		</Fab>
    </div>
	<Options
    	sendQuery={sendQuery}
    	listOpts={listOpts}
    	loading={loading}
    />
    <br/>
    <Display
    	loading={loading}
    	toShow={students}
    	displayCard={displayCard}
    />
    <Overlay
    	clearOverlay={clearOverlay}
    >
		{currDisp !== undefined
			? currDisp
			: ""}
    </Overlay>
    </ThemeProvider>
    </div>
  );
}


