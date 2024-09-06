import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getCurrentCustomerQueries, host } from "../../utils/routes";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const Resolve = () => {
  const [queries, setQueries] = useState([]);

  const username = JSON.parse(
    localStorage.getItem("branchInternational")
  ).username;

  const socket = useRef();

  const fetchQueries = async () => {
    try {
      const response = await axios.post(getCurrentCustomerQueries, {
        userId: username,
      });
      setQueries(response.data.queries);
    } catch (error) {
      toast.error("Failed to fetch queries");
    }
  };

  const updateQueries = (queries, msg) => {
    const objIndex = queries.findIndex((val) => val._id === msg.queryId);
    console.log(objIndex);
    const updatedQueries = [...queries];
    updatedQueries[objIndex].resolved = msg.solution;
    return updatedQueries;
  };

  useEffect(() => {
    fetchQueries();
    socket.current = io(host);
    if (socket.current) {
      socket.current.on("resolve", (msg) => {
        setQueries((queries) => [...updateQueries(queries, msg)]);
      });
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl text-center font-medium text-gray-900 mt-10 mb-5">
        Hi {username}, your queries are resolved by our team
      </h1>
      {queries.length === 0 && (
        <h1 className="text-xl text-center font-medium text-gray-900 mt-10 mb-5">
          No queries resolved yet
        </h1>
      )}
      <div className="overflow-x-auto w-[90vw] mx-auto my-12">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 rounded-lg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Query
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resolved By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asked On
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queries.map((query, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{query.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {query.resolved}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {query.requested}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(query.timestamp).toLocaleDateString() +
                    " " +
                    new Date(query.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resolve;
