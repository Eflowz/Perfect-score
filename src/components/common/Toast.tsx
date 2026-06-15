
import type { Toast as ToastType } from "../../types/toast.types";

export const Toast = ({
 message,
 type,
}: ToastType) => {


 return (

 <div
 className={`
 px-10 py-4 rounded text-white
 ${
 type === "success"
 ? "bg-white border-l-green-400 border-l-rounded-2xl "
 : type === "error"
 ? "bg-red-500"
 : "bg-yellow-500"
 }
 `}
 >

 {message}

 </div>

 );

};

