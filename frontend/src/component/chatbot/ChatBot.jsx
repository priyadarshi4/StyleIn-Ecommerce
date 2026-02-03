import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ChatBot.css";

export default function ChatBot() {
  const history = useHistory();
  const hasWelcomed = useRef(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to StyleIn AI Assistant 👋 How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  /* 🔊 TEXT TO SPEECH */
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  /* 🔔 WELCOME SPEECH (ONCE) */
  useEffect(() => {
    if (!hasWelcomed.current) {
      speak("Welcome to StyleIn AI Assistant");
      hasWelcomed.current = true;
    }
  }, []);

  /* 🎤 VOICE INPUT */
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice assistant not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);

    recognition.start();
  };

  /* 🧠 FALLBACK BRAND Q&A */
  const getBotReply = (msg) => {
    const q = msg.toLowerCase();

    if (q.includes("founder") || q.includes("who started")) {
      return "Style In was founded by Priyadarshi Prince, a passionate entrepreneur and 3rd year B.Tech student at IIT Patna, with a vision to build a modern, youth-focused fashion brand.";
    }

    if (q.includes("who are you") || q.includes("what is style in")) {
      return "Style In is a modern ecommerce fashion brand built for the new generation, focused on affordable, high-quality, trend-driven clothing and lifestyle products.";
    }

    if (q.includes("mission")) {
      return "Our mission is to help you express your individuality through fashion. Style In believes style is about confidence, creativity, and being yourself every day.";
    }

    if (q.includes("vision")) {
      return "Style In’s vision is to redefine fashion ecommerce by blending creativity, technology, and youth culture into a seamless shopping experience.";
    }

    if (q.includes("contact") || q.includes("reach")) {
      return "You can contact Style In through the Contact Us page on our website. Our support team is always happy to help.";
    }

    return "I’m here to help with products, orders, delivery, and brand information. Please ask me anything about Style In 😊";
  };

  /* 🚀 SEND MESSAGE (AI + FALLBACK) */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      const aiReply = data?.reply || getBotReply(userMsg);

      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
      speak(aiReply);

    } catch (error) {
      const fallback = getBotReply(userMsg);
      setMessages((prev) => [...prev, { sender: "bot", text: fallback }]);
      speak(fallback);
    }
  };

  return (
    <div className="chat_page_container">
      <div className="chatbox">

        {/* HEADER */}
        <div className="chat-header">
          <span>🤖 StyleIn AI Assistant</span>
          <button className="chat-close-btn" onClick={() => history.goBack()}>
            ✖
          </button>
        </div>

        {/* BODY */}
        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="chat-footer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Style In, products, delivery..."
          />

          <button
            className={`mic-btn ${listening ? "active" : ""}`}
            onClick={startListening}
            title="Speak"
          >
            🎤
          </button>

          <button onClick={sendMessage}>➤</button>
        </div>

      </div>
    </div>
  );
}
