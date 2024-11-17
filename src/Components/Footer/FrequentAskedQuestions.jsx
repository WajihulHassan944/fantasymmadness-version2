import React, { useState } from "react";
import "./Faqs.css";

const FrequentAskedQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      title: "What is FantasyMMAdness?",
      body: "FantasyMMAdness is a prediction game platform for boxing, kickboxing, and bare-knuckle fight fans. Members can participate in live and shadow fight predictions, join leagues, and compete for cash prizes while showcasing their activity on public profiles.",
    },
    {
      title: "How do live fight predictions work?",
      body: "Members predict the outcomes of live fights, such as punch counts, round winners, and methods of victory, before the fight begins. Predictions are scored in real-time by administrators using a live scoring tool, often accompanied by a video stream and chat.",
    },
    {
      title: "What are shadow fights?",
      body: "Shadow fights are pre-recorded or simulated fights where members can predict outcomes. These events are hosted by affiliates who set buy-in options and prize pots. Shadow fights give members another way to compete and win tokens or cash prizes.",
    },
    {
      title: "What rewards can I earn on FantasyMMAdness?",
      body: "Members can win cash prizes (POTS), tokens, and bragging rights by performing well in predictions. Affiliates can also earn profits from hosting successful shadow fights. Members can share their achievements via public profiles.",
    },
    {
      title: "What is the point system for predictions?",
      body: "Points are awarded based on accurate predictions, such as head punches, body punches, round winners, and knockouts. Overestimations are not penalized, but only accurate or lower-than-actual predictions earn points. For example, predicting fewer punches than thrown will still earn points, while predicting more does not.",
    },
    {
      title: "Can I play for free?",
      body: "Yes! FantasyMMAdness offers free-to-play fights for members to test their prediction skills. However, paid fights require tokens as a buy-in. Tokens can be purchased or earned through referrals and site promotions.",
    },
    {
      title: "How do affiliate accounts work?",
      body: "Affiliate users can host and promote shadow fights. They set prize pots, buy-in options, and promote their fights using unique URLs. Affiliates earn a share of profits from successful fights and can request payouts via PayPal, CashApp, or Venmo.",
    },
    {
      title: "What features do administrators have access to?",
      body: "Administrators have full control over the system, including creating, editing, and managing live and shadow fights, affiliate accounts, promotions, memberships, and finances. They also manage the live scoring tool during fights.",
    },
    {
      title: "What are tokens, and how do they work?",
      body: "Tokens are the platform's currency used to participate in paid fights. Members can purchase tokens or earn them by inviting friends to join FantasyMMAdness. Tokens can also be refunded if a fight is canceled due to unmet buy-in requirements.",
    },
    {
      title: "Can I share my public profile?",
      body: "Yes! Members can share their public profiles, which display their fight predictions, scores, and achievements. Public profiles are not listed on the site but can be shared via a unique link for social media and other platforms.",
    },
    {
      title: "Is FantasyMMAdness available worldwide?",
      body: "FantasyMMAdness is accessible to users globally. However, specific features, rewards, or payment options may vary depending on your location.",
    },
  ];
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div className="faqwrapper">
      <h1>FAQs</h1>
      <div className="faqmain">
  {faqData.map((faq, index) => (
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
        {faq.body}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default FrequentAskedQuestions;
