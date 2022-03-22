import { Box } from '@chakra-ui/react';
import React from 'react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { ChatState } from '../Context/ChatProvider';
const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
