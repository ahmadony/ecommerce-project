import {useState} from 'react';
import  ChatInput from './components/ChatInput';
import  ChatMessages from './components/ChatMessages';
import './App.css';


function App() {
  const [chatMessages, setChatMessages] = useState([]);
  //   message: 'hello chatbot',
  //   sender: 'user',
  //   id: 'id1'
  // }, {
  //   message: 'Hello! How can I help you?',
  //   sender: 'robot',
  //   id: 'id2'
  // }, {
  //   message: 'Whats today day?',
  //   sender: 'user',
  //   id: 'id3'
  // }, {
  //   message: "Today is June 30",
  //   sender: "robot",
  //   id: 'id4'
  // }]);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  const [isInputOnTop, setIsInputOnTop] = useState(true);
  function toggleInputPosition() {
    setIsInputOnTop(!isInputOnTop);
  }
  return (
    <div className="app-container">

      {isInputOnTop && (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}

      <ChatMessages
        chatMessages={chatMessages}
      />

      {!isInputOnTop && (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}

      <div
        className="toggle-position-link"
        onClick={toggleInputPosition}
      >
        {isInputOnTop
          ? 'Move textbox to bottom'
          : 'Move textbox to top'}
      </div>

    </div>

  );
}

export default App
