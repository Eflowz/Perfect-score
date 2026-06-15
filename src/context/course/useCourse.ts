import {
 useContext
} from "react";

import {
 CourseContext
} from "./CourseContext";


export const useCourse =()=>{

const context =
useContext(CourseContext);


if(!context){

throw new Error(
"useCourse must be inside CourseProvider"
);

}


return context;

};