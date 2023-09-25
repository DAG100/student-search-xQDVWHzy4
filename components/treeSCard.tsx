import React from "react";
import SCard from "../components/SCard";
import Card from "@mui/material/Card";
import { Student } from "./commontypes";
import GuestFooter from "./Treefooter";

interface TreeCardProps {
    baapu?: Student;
    bacchas: Array<Student>;
    data: Student;
    displayCard: Function;
    clearOverlay?: Function;
}

function TreeCard(props: TreeCardProps) {
    return (
        <div className="tree-container" >
            <div className="tree-view">
                {props.baapu != undefined
                    ? <SCard
                        pointer={true}
                        compact={"ultra"}
                        data={props.baapu}
                        onClick={() => {
                            props.displayCard(props.baapu);
                        }}
                    />
                    : <Card>Not Available :(</Card>
                }
                <SCard
                    pointer={true}
                    compact={true}
                    data={props.data}
                    onClick={() => {
                        props.displayCard(props.data);
                    }}
                />
                <div className="bacchas">
                    {props.bacchas.length > 0
                        ? props.bacchas.map((el) =>
                            <SCard
                                pointer={true}
                                compact={"ultra"}
                                data={el}
                                key={el.i}
                                onClick={() => {
                                    props.displayCard(el);
                                }}
                            />
                        )
                        : ""
                    }
                </div>
            </div>
            <div className="footer-absolute">
                <GuestFooter />
            </div>
        </div>
    );
}

export default TreeCard;
