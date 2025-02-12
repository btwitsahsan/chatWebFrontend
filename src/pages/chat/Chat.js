import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import Conversations from '../../components/conversations/Conversations';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    const socket = useRef();
    const { user } = useSelector((state) => state.auth);
    const scrollRef = useRef();

    // Connect to WebSocket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    // Update Messages State in Real-Time
    useEffect(() => {
        if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage, currentChat]);

    // Add user to socket server
    useEffect(() => {
        if (user) {
            socket.current.emit("addUser", user._id);
            socket.current.on("getUsers", (users) => {
                setOnlineUsers(user.friends.filter((f)=> users.some((u)=> u.userId === f) ))
            });
        }
    }, [user]);

    // Fetch Conversations
    useEffect(() => {
        const getConversations = async () => {
            if (!user) return;
            try {
                const res = await axios.post(`http://localhost:4000/api/conversations/${user._id}`);
                // console.log(res.data);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    }, [user]);

    // Fetch Messages for the Selected Conversation
    useEffect(() => {
        const getMessages = async () => {
            if (!currentChat) return;
            try {
                const res = await axios.post(`http://localhost:4000/api/messages/${currentChat._id}`);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [currentChat]);

    // Send Message
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user._id);

        // Emit message to socket
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("http://localhost:4000/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    // Scroll to latest message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <section>
            <div className="chat">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput" placeholder="Search For Friends" />
                        {conversations.map((c) => (
                            <div key={c._id} onClick={() => setCurrentChat(c)}>
                                <Conversations conversations={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef} key={m._id}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Write Something..."
                                        className="chatMessageInput"
                                    />
                                    <button className="chatSubmitButton" onClick={submitHandler}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to start a chat....</span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentUserId={user?._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chat;
