import { useEffect, useState } from "react";
import {
 MdNotificationsNone,
 MdClose,
 MdCircle,
} from "react-icons/md";
import { getNotifications, deleteNotification, markNotificationRead } from "../../api/notifications.api";
const dummyNotifications = [
 {
 id: "1",
 message: "New course has been added",
 read: false,
 createdAt: "2 mins ago",
 },
 {
 id: "2",
 message: "Project workspace has been upgraded",
 read: false,
 createdAt: "10 mins ago",
 },
 {
 id: "3",
 message: "You completed a new lesson",
 read: false,
 createdAt: "1 hour ago",
 },
 {
 id: "4",
 message: "Certificate is now available",
 read: false,
 createdAt: "3 hours ago",
 },
];


const NotificationDropdown = () => {
const [notifications, setNotifications] = useState<any[]>(
 dummyNotifications
);

const [loading, setLoading] = useState(true);

const [open,setOpen] = useState(false);



const removeNotification = async (id: string) => {

 setNotifications(prev =>
 prev.filter(item => item.id !== id)
 );

 try {
 await deleteNotification(id);
 } catch (error) {
 console.log("Backend delete failed", error);
 }
};

const openNotification = async(id:string)=>{


try{


await markNotificationRead(id);



setNotifications(prev=>

prev.map(item=>

item.id === id

?

{
...item,
read:true
}

:

item

)

);



}catch(error){

console.log(error);

}


};
useEffect(()=>{

const loadNotifications = async()=>{

try{

const data = await getNotifications();

if (data && data.length > 0) {
 setNotifications(data);
}

}catch(error:any){

console.log(
"Using dummy notifications"
);
console.error(
"Failed to fetch notifications",
error.message
);

}finally{

setLoading(false);

}


};


loadNotifications();


},[]);

const unreadCount = notifications.filter(
item=>!item.read
).length;


if(loading){
    return(
    <div className="space-y-3 p-3">

<div className="h-16 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse"/>

<div className="h-16 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse"/>

<div className="h-16 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse"/>

</div>
    )
}
/*
if(notifications.length === 0){
    return(
    <div
className="
flex
flex-col
items-center
justify-center

py-10
px-6

text-center
"
>

<div
className="
w-14
h-14

rounded-2xl

flex
items-center
justify-center

bg-gray-100
dark:bg-white/10

text-gray-400
dark:text-gray-500

mb-4

"
>

<MdNotificationsNone size={28}/>

</div>


<h4
className="
text-sm
font-semibold

text-gray-700
dark:text-gray-200
"
>
No notifications yet
</h4>


<p
className="
mt-1

text-xs

text-gray-400
dark:text-gray-500

max-w-[220px]
"
>
You're all caught up. New updates and announcements will appear here.
</p>


</div>
    )
}
 */
return (

<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
relative
p-2
rounded-xl

text-gray-400
dark:text-gray-400

hover:bg-gray-100
dark:hover:bg-white/5

hover:text-[#16423C]
dark:hover:text-white

transition
"

>


<MdNotificationsNone size={22}/>



{
unreadCount > 0 && (

<span

className="
absolute
-top-0
-right-0

min-w-[18px]
h-[18px]

px-1

flex
items-center
justify-center

rounded-full

bg-[#16423C]
dark:bg-[#E2FB6C]

text-white
dark:text-[#16423C]

text-[10px]

font-bold

ring-2
ring-white
dark:ring-gray-950

"

>

{unreadCount}

</span>

)

}


</button>






{
open && (

<div

className="
absolute
right-0

mt-3

w-80

rounded-2xl

bg-white
dark:bg-[#0F2C28]

border
border-gray-200
dark:border-white/10

shadow-2xl

overflow-hidden

z-50

animate-in
fade-in
slide-in-from-top-2

duration-200

"

>



<div

className="
px-4
py-3

border-b
border-gray-100
dark:border-white/10

flex
justify-between
items-center

"

>


<h3

className="
font-bold
text-sm

text-gray-900
dark:text-white

"

>

Notifications

</h3>


<button
onClick={() => setOpen(false)}
className="
w-7
h-7

rounded-full

flex
items-center
justify-center

text-gray-400
dark:text-gray-300

hover:bg-gray-100
dark:hover:bg-white/10

hover:text-red-500

transition
"
>
<MdClose size={18}/>
</button>

</div>







<div

className="
max-h-80

overflow-y-auto

p-3

space-y-2

"

>


{
notifications.length === 0 ?

(

<p
className="
text-center
text-sm
text-gray-400
py-8
"
>

No notifications

</p>

)

:

notifications.map(notification=>(


<div
key={notification.id}

onClick={()=>openNotification(notification.id)}

className="
group
cursor-pointer

flex
items-start
justify-between
gap-3

p-3

rounded-xl

bg-gray-50
dark:bg-white/5

hover:bg-[#16423C]/5

transition

"
>


<div className="flex gap-2">


<MdCircle

size={8}

className="
mt-2

text-[#16423C]
dark:text-[#E2FB6C]

"

/>


<div>


<p

className="
text-sm

font-medium

text-gray-800
dark:text-white

"

>

{notification.message}

</p>


<p

className="
text-xs
text-gray-400
mt-1

"

>

{notification.createdAt}

</p>


</div>


</div>





<button

onClick={(e)=>{
    e.stopPropagation()
    removeNotification(notification.id)
}}

className="

opacity-100

w-7
h-7

rounded-full

flex
items-center
justify-center

bg-white
dark:bg-white/10

text-gray-400

hover:text-red-500

transition

"

>

<MdClose size={16}/>

</button>



</div>


))

}


</div>



</div>

)

}


</div>

);

};


export default NotificationDropdown;