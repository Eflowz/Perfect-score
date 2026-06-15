

import { useState } from "react";

import { ToastContext } from "./ToastContext";
import { Toast } from "../components/common/Toast";

import type { Toast as ToastType,
 ToastType as Type} from "../types/toast.types";

export const ToastProvider = ({
 children,
}: {
 children: React.ReactNode;
}) => {


 const [toasts, setToasts] =
 useState<ToastType[]>([]);



 const showToast = (
 message: string,
 type: Type
 ) => {


 const id = Date.now();


 setToasts((prev) => [
 ...prev,
 {
 id,
 message,
 type,
 },
 ]);



 setTimeout(() => {

 setToasts((prev) =>
 prev.filter(
 (toast) =>
 toast.id !== id
 )
 );

 }, 3000);


 };



 return (

 <ToastContext.Provider
 value={{
 showToast,
 }}
 >

 {children}


 <div className="fixed top-5 right-5 space-y-3">

 {
 toasts.map((toast) => (

 <Toast
 key={toast.id}
 {...toast}
 />

 ))
 }

 </div>


 </ToastContext.Provider>

 );
};