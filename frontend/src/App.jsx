import { useState } from "react";
import "./App.css";

function App() {
  const [hairType, setHairType] = useState("");
  const [scalpType, setScalpType] = useState("");
  const [concern, setConcern] = useState("");
  const [started, setStarted] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const startChat = () => {
    if (!hairType || !scalpType || !concern) {
      alert("Please select all options first.");
      return;
    }

    setStarted(true);

    setMessages([
      {
        sender: "bot",
        text: `Hi! 👋 I know that you have ${hairType} hair, a ${scalpType} scalp, and your main concern is ${concern.toLowerCase()}. I'm ready to help you with your personalized hair-care routine! 💜`,
      },
    ]);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          hairType,
          scalpType,
          concern,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the HairBuddy server. Please make sure the backend is running.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <span>HairBuddy</span>
        </div>

        <div className="header-badge">
          ✨ AI Hair Care Assistant
        </div>
      </header>

      {!started ? (

        <main className="profile-container">

          <div className="hero">
            <div className="hero-icon">💆‍♀️</div>

            <h1>
              Your Personal
              <span>Hair Care Assistant</span>
            </h1>

            <p>
              Tell us a little about your hair and scalp.
              HairBuddy will create personalized recommendations for you.
            </p>
          </div>

          <div className="form-card">

            <section className="question">
              <h2>What is your hair type?</h2>

              <div className="options">
                {["Straight", "Wavy", "Curly", "Coily"].map((type) => (
                  <button
                    key={type}
                    className={`option ${
                      hairType === type ? "selected" : ""
                    }`}
                    onClick={() => setHairType(type)}
                  >
                    <span className="option-icon">
                      {type === "Straight"
                        ? "〰️"
                        : type === "Wavy"
                        ? "🌊"
                        : type === "Curly"
                        ? "🌀"
                        : "➰"}
                    </span>

                    {type}
                  </button>
                ))}
              </div>
            </section>

            <section className="question">
              <h2>What is your scalp type?</h2>

              <div className="options">
                {["Dry", "Normal", "Oily", "Combination"].map((type) => (
                  <button
                    key={type}
                    className={`option ${
                      scalpType === type ? "selected" : ""
                    }`}
                    onClick={() => setScalpType(type)}
                  >
                    <span className="option-icon">
                      {type === "Dry"
                        ? "🏜️"
                        : type === "Normal"
                        ? "🌿"
                        : type === "Oily"
                        ? "💧"
                        : "✨"}
                    </span>

                    {type}
                  </button>
                ))}
              </div>
            </section>

            <section className="question">
              <h2>What is your main hair concern?</h2>

              <div className="options concerns">
                {[
                  "Frizz",
                  "Hair Fall",
                  "Dandruff",
                  "Dryness",
                  "Damage",
                  "Hair Growth",
                ].map((item) => (
                  <button
                    key={item}
                    className={`option ${
                      concern === item ? "selected" : ""
                    }`}
                    onClick={() => setConcern(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <button className="start-button" onClick={startChat}>
              Start My Hair Care Journey
              <span>→</span>
            </button>

          </div>
        </main>

      ) : (

        <main className="chat-container">

          <div className="chat-header">

            <div className="bot-avatar">✨</div>

            <div>
              <h2>HairBuddy AI</h2>
              <p>Your personalized hair-care assistant</p>
            </div>

            <div className="online">
              <span></span>
              Online
            </div>

          </div>

          <div className="chat-body">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`message ${
                  msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }`}
              >

                {msg.sender === "bot" && (
                  <div className="message-avatar">✨</div>
                )}

                <div className="message-content">

                  {msg.sender === "bot" && (
                    <strong>HairBuddy</strong>
                  )}

                  <p>{msg.text}</p>

                </div>

              </div>

            ))}

            {loading && (
              <div className="message bot-message">

                <div className="message-avatar">
                  ✨
                </div>

                <div className="message-content">
                  <strong>HairBuddy</strong>

                  <p>
                    HairBuddy is thinking... 💭
                  </p>
                </div>

              </div>
            )}

            <div className="suggestions">

              <button
                onClick={() =>
                  setMessage("Give me a personalized hair-care routine.")
                }
              >
                💧 Give me a hair routine
              </button>

              <button
                onClick={() =>
                  setMessage("What type of hair-care products should I use?")
                }
              >
                🧴 Suggest products
              </button>

              <button
                onClick={() =>
                  setMessage("What should I do for my hair today?")
                }
              >
                🌤 Check today's hair care
              </button>

            </div>

          </div>

          <div className="chat-input">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask HairBuddy anything about your hair..."
            />

            <button onClick={sendMessage}>
              ➤
            </button>

          </div>

        </main>

      )}

      <footer>
        HairBuddy AI • Personalized Hair Care Assistant
      </footer>

    </div>
  );
}

export default App;