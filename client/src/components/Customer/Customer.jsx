import PastQueries from "./PastQueries";
import SendQuery from "./SendQuery";

const Customer = () => {
  return (
    <div className="px-9">
      <div className="grid grid-cols-2 gap-20">
        <SendQuery />
        <PastQueries />
      </div>
    </div>
  );
};

export default Customer;
