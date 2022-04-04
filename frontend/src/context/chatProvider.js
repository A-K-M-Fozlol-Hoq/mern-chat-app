import { useHistory } from 'react-router-dom';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const history = useHistory();
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    // const currentURL = window.location.pathname;
    // console.log(history, useHistory, 'history', userInfo, currentURL);
    if (!userInfo) {
      history.push('/');
    }
    console.log(userInfo, history);
  }, [history]);
  if (user) {
    return (
      <ChatContext.Provider
        value={{
          selectedChat,
          setSelectedChat,
          user,
          setUser,
          notification,
          setNotification,
          chats,
          setChats,
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  }
  // else {
  //   return <h1>Login</h1>;
  // }
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
