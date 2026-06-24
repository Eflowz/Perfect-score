import api from "./axios";

{/*
export const executeCode = async (payload: ExecutePayload) => {
 const token = getAccessToken();

 const res = await api.post(
 "/ide/execute",
 payload,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );

 console.log("IDE RESPONSE:", res.data);
 return res.data;
};


let socket: WebSocket | null = null;

export const connectIDE = (sessionId: string, token: string) => {
 socket = new WebSocket(
 `wss://perfectb.onrender.com/api/v1/ide/session/${sessionId}?token=${token}`
 );

 socket.onopen = () => {
 console.log("IDE session connected ✅");
 };

 socket.onmessage = (event) => {
 const data = JSON.parse(event.data);
 console.log("Incoming message:", data);
 };

 socket.onerror = (err) => {
 console.log("WebSocket error:", err);
 };

 socket.onclose = () => {
 console.log("IDE session closed ❌");
 };
};


export const sendMessage = (message: any) => {
 if (socket && socket.readyState === WebSocket.OPEN) {
 socket.send(JSON.stringify(message));
 }
};
*/}



let socket: WebSocket | null = null;

export const connectIDE = (sessionId: string, token: string) => {
 if (!token) {
 console.error("No token found");
 return;
 }

 socket = new WebSocket(
 `wss://perfectb.onrender.com/api/v1/ide/session/${sessionId}?token=${token}`
 );

 socket.onopen = () => {

 };

 socket.onmessage = (event) => {
    const data =JSON.parse(event.data)
 console.log("parsed message:", data)


 };
 
 socket.onerror = (err) => {
 console.error("WebSocket error:", err);
 };

 socket.onclose = () => {
 console.log("IDE session closed ❌");
 };
};

/**
 * SEND MESSAGE
 */
export const sendMessage = (payload: any) => {
 if (!socket || socket.readyState !== WebSocket.OPEN) return;

socket.send(JSON.stringify(payload));
};


export const executeCode = async (payload: {
 code: string;
 language: string;
}) => {
 const res = await api.post("/ide/execute", payload);
 return res.data;
};
