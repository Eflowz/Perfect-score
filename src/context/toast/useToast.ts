import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {

 const context =
 useContext(ToastContext);


 if (!context) {
 throw new Error(
 "useToast must be inside ToastProvider"
 );
 }


 return context;

};