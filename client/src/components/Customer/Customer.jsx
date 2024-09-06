import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { host, addQuery, getQueries } from "../../utils/routes";

const Customer = () => {
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([]);

  const socket = useRef();

  // Function to submit the query
  const submitQuery = async (e) => {
    e.preventDefault();
    try {
      const username = JSON.parse(
        localStorage.getItem("branchInternational")
      ).username;
      const response = await axios.post(addQuery, {
        userId: username,
        message: message,
      });
      if (response.data.message === "Query added successfully") {
        socket.current.emit("message", { userId: username, message });
        toast.success("Query submitted successfully");
        setMessage("");
      } else {
        toast.error("Failed to submit query");
      }
    } catch (error) {
      toast.error("Failed to submit query");
    }
  };

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

  // Fetch all the queries using useEffect and socket.io
  useEffect(() => {
    fetchQueries();
    socket.current = io(host);
    if (socket.current) {
      socket.current.on("message", (msg) => {
        setQueries((queries) => [
          ...queries,
          { message: msg.message, timestamp: Date.now() },
        ]);
      });
    }
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="px-9">
      <div className="grid grid-cols-2 gap-20">
        {/* Submit Query */}
        <form className="mt-7" onSubmit={submitQuery}>
          <h1 className="text-lg my-5 font-medium">
            Welcome Customer! You can ask your queries here and we will respond
            to you as soon as possible.
          </h1>
          <div className="flex flex-col gap-5">
            <textarea
              name="query"
              id="query"
              cols="30"
              rows="10"
              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none"
              placeholder="Type your query here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end my-5">
            <button
              className="bg-purple-600 px-5 py-2 text-white rounded-lg hover:bg-purple-500 font-medium"
              onClick={submitQuery}
            >
              Submit
            </button>
          </div>
        </form>

        {/* Past Queries */}
        <div className="mt-7">
          <h1 className="text-lg my-5 font-medium text-center">
            Your Past Queries
          </h1>
          <div className="my-12">
            {queries.length === 0 ? (
              <h1 className="text-center text-md font-medium">
                No queries found
              </h1>
            ) : (
              <>
                {queries.map((query, index) => (
                  <div
                    key={index}
                    className="
                      border-2 border-gray-200 rounded-lg p-3
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
      </div>
    </div>
  );
};

export default Customer;
