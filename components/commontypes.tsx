//common types

export interface Student {
	a: string; //address
	b: string; //blood group
	d: string; //department
	g: string; //gender
	h: string; //hall of residence
	i: string; //roll number
	n: string; //full name
	p: string; //programme
	r: string; //room number
	u: string; //username
	s: string; //roll number of baapu/amma
	c: Array<string> | string; //array containing roll numbers of bacchas (or the words "not available")
}

export interface Query {
	gender: string;
	name: string;
	batch: Array<string>;
	hall: Array<string>;
	prog: Array<string>;
	dept: Array<string>;
	bloodgrp: Array<string>;
	address: string;
}

export interface Options {//type declaration
	 batch: Array<string>;
	 hall: Array<string>;
	 prog: Array<string>;
	 dept: Array<string>;
	 bloodgrp: Array<string>
}