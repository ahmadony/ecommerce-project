import {useEffect, useRef} from 'react';
import  ChatMessage  from './ChatMessage';
import '../style/ChatMessages.css';

function ChatMessages({ chatMessages }) {

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const contanierElem = chatMessagesRef.current;
    if (contanierElem) {
      contanierElem.scrollTop =
        contanierElem.scrollHeight
    }
  }, [chatMessages])

  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.length === 0 && (
        <div className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox above.
        </div>
      )}

      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            isLoading={chatMessage.isLoading}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;