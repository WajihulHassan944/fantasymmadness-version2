import React, { useState } from "react";
import "./Faqs.css";

const FrequentAskedQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      title: "Can I watch the fight on YouTube and score it myself?",
      body: "Yes, you can watch the fight on YouTube or any other platform where it is available. The idea is that anyone can participate by viewing the fight and scoring it. However, the fantasy element still plays a role in ensuring the game is balanced and engaging for all participants.",
    },
    {
      title: "How do I score the fight?",
      body: "You will score the fight based on the unique scoring system provided in the platform. For example, in MMA or Boxing, Kickboxing, and Bare-knuckle this could include awarding points for significant strikes, kicks, knees, etc. The exact scoring may vary depending on the rules of the platform, but you'll be able to score the fight in a structured way.",
    },
    {
      title: "What happens if there is no knockout (KO)?",
      body: "If the fight goes the full distance without a knockout, a 500-point bonus is inserted into the fight in one of the rounds added to the fighter's Red or Blue. This helps maintain excitement and rewards those who participate in fights that don't end in a KO.",
    },
    {
      title: "What if there is a knockout (KO)?",
      body: "Even if the fight ends in a knockout, the fight will still be fully scored as if it went the distance (with no KO). This ensures that the scoring remains consistent, even if the fight ends quickly, and prevents the game from feeling too skewed toward those who just happen to pick a knockout.",
    },
    {
      title: "Why would anyone participate if the score is automatically adjusted for knockouts?",
      body: "The scoring system helps level the playing field by adjusting for unpredictable outcomes like knockouts. Even if you choose a fight that ends in a KO, the scoring remains 'full' as if it went the distance, allowing for unexpected twists and keeping the competition relevant.",
    },
    {
      title: "What makes the game 'fantasy' in this context?",
      body: "The 'fantasy' element of the game lies in the point discrepancies created by the bonus and knockout. The fantasy aspect is driven by the unpredictability of the fight outcomes and the scoring system. While watching the fight on your own is possible, the scoring system and the bonus rules create an additional layer of strategy. You can’t just rely on knowing the fighters; you also have to consider the bonus points, potential discrepancies, and other factors in the scoring that make every fight a new chance to win.",
    },
    {
      title: "Can I still win if I score the fight differently from others?",
      body: "Yes, you can still win. The game isn’t purely about matching other users' scores exactly. It's about using the bonuses, fight analysis, and scoring strategy to achieve the highest possible points. Even if your score differs from others, the unique scoring bonuses (like the 500-point bonus) can still make your total competitive.",
    },
    {
      title: "How do the 500-point bonuses work?",
      body: "The 500-point bonus is added to your total if the fight does not end in a knockout only if you pick the correct round and fighter. This means that the non-knockout fights are incentivized with a larger bonus, ensuring that these outcomes are as rewarding as a KO finish. Even in the case of a knockout, the scoring remains 'full' and doesn't leave out important factors like Punching or strategy.",
    },
    {
      title: "Doesthe platform provide a leaderboard showing the current top scorers?",
      body: "Yes, the platform may provide a leaderboard showing the current top scorers based on their fight analyses. You’ll be able to track your score and compare it with others to see how your picks are performing. The fantasy game’s dynamic nature ensures there's always an element of surprise, even late in the competition.",
    },
    {
      title: "Can I participate in every fight or only certain ones?",
      body: "Typically, you'll be able to participate in any fight that is featured in the game. However, there may be specific rules or events tied to certain fights that could affect your eligibility or points. This FAQ aims to clarify how the Fantasy MMadness scoring system works, emphasizing the idea that even if you just watch the fight and score it, the fantasy element ensures the game stays exciting and fair for everyone. The discrepancies in points and bonus points keep things engaging, regardless of how the fight plays out!",
    },
    {
      title: "Is there a way to see who is winning the Fantasy MMadness game?",
      body: "Yes, you can see the person who is winning by clicking on any fight item in the 'Completed fights' section of your dashboard. you will see the respective fight leaderboard with users ranked according to their points. When the fight status is set to finished by admin team, then you will see the fight winner at the bottom of your score cards. ",
    },
 
 
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
