import React, { useState, useEffect } from "react";
import "./Faqs.css";

const FrequentAskedQuestions = () => {
  const [faqs, setFaqs] = useState([]); // State to store FAQs
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch FAQ data from the server
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/faqs'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div className="faqwrapper">
      <h1>FAQs</h1>
      <div className="faqmain">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div className="faqItem" key={index}>
              <div
                className="faqHeader"
                onClick={() => toggleFAQ(index)}
              >
                <p>{faq.title}</p>
                <i
                  className={`fa ${
                    activeIndex === index ? "fa-angle-up" : "fa-angle-down"
                  } icon`}
                  aria-hidden="true"
                ></i>
              </div>
              <div
                className={`faqBody ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                {faq.description}
              </div>
            </div>
          ))
        ) : (
          <p>Loading FAQs...</p> // Fallback while data is being loaded
        )}
      </div>
    </div>
  );
};

export default FrequentAskedQuestions;
