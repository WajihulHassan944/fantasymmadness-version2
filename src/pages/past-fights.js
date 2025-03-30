import PastFightsNew from "@/Components/PastFightsNew/PastFightsNew";
import { fetchMatchesSSR } from "@/Redux/matchSlice"; // ✅ Corrected Import

const PastFightsPage = ({ pastMatches }) => {
  return <PastFightsNew pastMatches={pastMatches} />;
};

export const getServerSideProps = async () => {
  try {
    const pastMatches = await fetchMatchesSSR();
    return { props: { pastMatches } }; // ✅ Now returning JSON-serializable data
  } catch (error) {
    console.error("Error fetching past matches:", error);
    return { props: { pastMatches: [] } }; // ✅ Prevents page crash
  }
};

export default PastFightsPage;
