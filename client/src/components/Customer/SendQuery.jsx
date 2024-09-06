import { useState } from "react";
import { addQuery } from "../../utils/routes";
import { toast } from "react-toastify";
import axios from "axios";

const SendQuery = () => {
  const [message, setMessage] = useState("");

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
        toast.success("Query submitted successfully");
        setMessage("");
      } else {
        toast.error("Failed to submit query");
      }
    } catch (error) {
      toast.error("Failed to submit query");
    }
  };

  return (
    <form className="mt-7" onSubmit={submitQuery}>
      <h1 className="text-lg my-5 font-medium">
        Welcome Customer! You can ask your queries here and we will respond to
        you as soon as possible.
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
  );
};

export default SendQuery;
