import Avatar from "@mui/material/Avatar";

import Male from "./GenericMale.png";
import Female from "./GenericFemale.png";

interface ImageProps {
	style: Object;
	u: string;
	i: string;
	g: string;
	alt:string;
}

// console.log(Male);
// console.log(Female);

export default function Image(props: ImageProps) {
	return (
		<Avatar style={props.style} src={`http://home.iitk.ac.in/~${props.u}/dp`}>
		<Avatar style={props.style} src={`https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${props.i}_0.jpg`}>
		<Avatar style={props.style} src={`${props.g === "M" ? Male.src : Female.src}`}>
		</Avatar>
		</Avatar>
		</Avatar>
	);
}