import React, { useState, useEffect } from "react";
import "./Faqs.css";

const FrequentAskedQuestions = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  
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
