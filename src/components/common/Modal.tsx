type Props = {
 open: boolean;
 onClose: () => void;
 children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {

 if (!open) return null;

 return (
 <div className="
 fixed inset-0 z-50
 flex items-center justify-center
 bg-black/50
 px-4
 ">

 <div className="
 w-full max-w-xl
 bg-white dark:bg-[#0F2C28]
 rounded-2xl
 p-6
 shadow-xl
 relative
 ">

 {/* CLOSE BUTTON */}
 <button
 onClick={onClose}
 className="
 absolute right-4 top-3
 text-gray-500
 hover:text-red-500
 "
 >
 ✕
 </button>


 {children}

 </div>

 </div>
 );
}