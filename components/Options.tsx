import React, {useState, useCallback, useEffect} from "react";
import {InputLabel, TextField, Select, MenuItem, Paper, FormControl, InputAdornment, IconButton} from "@mui/material"
import {ClearRounded} from "@mui/icons-material"
import MultiSelectField from "./msf";
// import {data as listOpts} from "../components/student_data_getter.tsx";
import debounce from "./debounce"
import {Student, Query, Options as OptionsType} from "./commontypes"

/* options to include:
Year
Gender - simple option menu
Hall
Programme
Dept.
Blood grp.
Hometown - text
Name/username/rollno. - text
Non-text are checkbox option menus
*/

/*MUI:
checkbox option menus: checkmark select
simple option menus: select
rest: text field
*/

interface OptionsProps {
	sendQuery: Function;
	listOpts: OptionsType;
	loading: boolean;
}

function Options(props: OptionsProps) {
// 	const [listOpts, setOpts]:[OptionsType, Function]= useState({
// 		batch:[],
// 		hall:[],
// 		prog:[],
// 		dept:[],
// 		bloodgrp:[]
// 	});

	const [query, setQuery]:[Query, Function] = useState({
		gender:"",
		name:"",
		batch:[],
		hall:[],
		prog:[],
		dept:[],
		bloodgrp:[],
		address:""
	});
// 	const [test, settest] = useState({name:"", foo:"lol"});
	
	const newsendQuery = useCallback(debounce(props.sendQuery, 300),[]);
	
// 	useEffect(() => {
// // 		console.log("Options.tsx mounted");
// // 		const searcher = new SharedWorker(new URL("../components/data_worker", import.meta.url));
// // 		searcher.port.postMessage("Options");
// // 		searcher.port.onmessage = (e) => {
// // // 			console.log("Options.tsx got a response");
// // 			setOpts(e.data);
// 		};
// // 		return (() => {
// // 		console.log("Options.tsx unmounting");
// // 		searcher.terminate();}); //terminate worker on unmount
// 	},[]); //on mount: set up shared worker and ask for options
	// not doing this any more because SharedWorkers don't work on Chrome for android :(
	
	useEffect(() => {newsendQuery(query);}, [query]); //execute sendQuery whenever query changes
	
	return (
		<Paper className="options">
			<div className="row">
				<MultiSelectField 
					disabled={props.loading} 
					query={query}
					name="batch"
					options={props.listOpts.batch}
					setQuery={setQuery}
				/>

				<FormControl variant="filled" disabled={props.loading}>
					<InputLabel id="gender-label">Gender</InputLabel>
					<Select
						className="field"
						labelId="gender-label"
						value={query.gender}
						onChange={(event) => {
							setQuery({...query, gender:event.target.value});
// 							props.sendQuery({...query, gender:event.target.value});
						}}
					>
						<MenuItem value="">Any</MenuItem>
						<MenuItem value="F">Female</MenuItem>
						<MenuItem value="M">Male</MenuItem>
					</Select>
				</FormControl>

				<MultiSelectField 
					disabled={props.loading} 
					query={query}
					name="hall"
					options={props.listOpts.hall}
					setQuery={setQuery}
				/>
			</div>
			<div className="row">
				<MultiSelectField 
					disabled={props.loading} 
					query={query}
					name="prog"
					label="Programme"
					options={props.listOpts.prog}
					setQuery={setQuery}
				/>
			
				<MultiSelectField 
					disabled={props.loading} 
					query={query}
					name="dept"
					label="Department"
					options={props.listOpts.dept}
					setQuery={setQuery}
				/>
			
				<MultiSelectField 
					disabled={props.loading} 
					query={query}
					name="bloodgrp"
					label="Blood group"
					options={props.listOpts.bloodgrp}
					setQuery={setQuery}
				/>
			</div>
			
			<div className="row">
				<FormControl variant="filled" disabled={props.loading}>
					<TextField
						disabled={props.loading}
						className="field home"
						label="Hometown"
						value={query.address}
						onChange={(event) => {
							setQuery({...query, address:event.target.value});
// 							newsendQuery(Object.assign(query,{address:event.target.value}));
						}}
					/>
				</FormControl>
			</div>
			<FormControl variant="filled" disabled={props.loading} className="row">
				<TextField
					disabled={props.loading}
					className="field main-text"
					label="Enter name, username or roll no."
					value={query.name}
					InputProps={{
						endAdornment:(<InputAdornment position="end">
							<IconButton 
								disabled={query.name.length === 0}
								onClick={() => {
									setQuery({...query, name:""});
// 									newsendQuery({...query, name:""});
								}}
							>
								<ClearRounded />
							</IconButton>
						</InputAdornment>),
					}}
					onChange={(event) => {
						setQuery({...query, name:event.target.value});
// 						newsendQuery({...query, name:event.target.value});
					}}
				/>
			</FormControl>
		</Paper>);
}

export default Options;
