export type ToastType =
 | "success"
 | "error"
 | "warning";


export type Toast = {
 id: number;
 message: string;
 type: ToastType;
};


export type ToastContextType = {
 showToast: (
 message: string,
 type: ToastType
 ) => void;
};