import React from "react";
import { useHistory } from "react-router-dom";
import "./ChatBot.css";

const FloatingBot = () => {
  const history = useHistory();

  return (
    <div
      className="floating_bot"
      onClick={() => history.push("/chatbot")}
      title="Chat with AI"
    >
      🤖
    </div>
  );
};

export default FloatingBot;
