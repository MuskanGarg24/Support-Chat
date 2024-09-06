import { useEffect, useState } from "react";
import axios from "axios";
import { getQueries } from "../../utils/routes";
import { toast } from "react-toastify";

const PastQueries = () => {
  const [queries, setQueries] = useState([]);

  // Function to get all the queries
  const fetchQueries = async () => {
    try {
      const username = JSON.parse(
        localStorage.getItem("branchInternational")
      ).username;
      const response = await axios.post(getQueries, {
        userId: username,
      });
      setQueries(response.data.queries);
    } catch (error) {
      toast.error("Failed to fetch queries");
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="mt-7">
      <h1 className="text-lg my-5 font-medium text-center">
        Your Past Queries
      </h1>
      <div className="my-12">
        {queries.length === 0 ? (
          <h1 className="text-center text-md font-medium">No queries found</h1>
        ) : (
          <>
            {queries.map((query) => (
              <div
                className="
                      border-2 border-purple-500 rounded-lg p-3
                      flex justify-between mb-3
                  "
              >
                <p className="text-md">{query.message}</p>
                <p className="text-md text-gray-500">
                  {new Date(query.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PastQueries;
