import RobotProfileImage from '../assets/images/robot.png';
import UserProfileImage from '../assets/images/user.png';
import '../style/ChatMessage.css';

function ChatMessage({ message, sender, isLoading }) {
  // const message = props.message;
  // const sender = props.sender;
  // const {message, sender} = props;

  /*  if(sender === 'robot'){
     return (
       <div>
         <img src="robot.png" width="50px"/>
         {message}
       </div>
     ); */
  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage}
          className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {isLoading ? <div className="spinner"></div> : message}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage}
          className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage;