import React, { useState } from "react";
import "./App.css";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatMessage = ({ message, onLike }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
    onLike();
  };

  return (
    <div className="message">
      <div className="user">{(message.user).substring(0, 1)}</div>
      <div className="info">
        <div className="name">{(message.user)}</div>
        <div className="msg">{message.text}</div>
      </div>
      <div className="thumb"><AiOutlineLike onClick={handleLike}/></div>
      <span>{likes}</span>
    </div>
  );
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [mentionedUsers, setMentionedUsers] = useState([]);

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      const randomUser =
        user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = { user: randomUser, text: inputText };
      setMessages([...messages, newMessage]);
      setInputText("");
      setMentionedUsers([]);
    }
  };

  const insertEmoji = (emojiObject) => {
    setInputText(inputText + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (text.endsWith("@")) {
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };

  const handleMention = (username) => {
    setInputText(inputText + `${username} `);
    setShowUserList(false);
    setMentionedUsers([...mentionedUsers, username]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} onLike={() => {}} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <BsEmojiSmileFill onClick={toggleEmojiPicker} />
        {showEmojiPicker && (<EmojiPicker onEmojiClick={insertEmoji} />)}
        <IoMdSend onClick={sendMessage}/>
      </div>
      {showUserList && (
        <div className="user-list">
          {user_list.map((user, index) => (
            <div
              key={index}
              onClick={() => {
                handleMention(user);
              }}
            >
              @{user}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatApp;
