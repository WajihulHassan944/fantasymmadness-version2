import FrequentAskedQuestions from "@/Components/Footer/FrequentAskedQuestions";

const FAQsPage = ({ faqs }) => {
  return <FrequentAskedQuestions faqs={faqs} />;
};

// ✅ Fetch data on the server before rendering
export const getServerSideProps = async () => {
  try {
    const response = await fetch("https://fantasymmadness-game-server-three.vercel.app/faqs");
    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }
    const data = await response.json();

    return {
      props: { faqs: data.data || [] }, // Ensure it's always an array
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { props: { faqs: [] } }; // Return an empty array on error
  }
};

export default FAQsPage;
