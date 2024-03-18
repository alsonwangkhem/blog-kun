import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="w-full max-w-4xl pt-12">
          <div className="pb-10">
            <input
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter the title here"
            />
          </div>
          <div className="w-full mb-4 border border-gray-300 rounded-lg">
            <div className="px-4 py-2 bg-white w-full">
              <label className="sr-only">Your comment</label>
              <textarea
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                id="comment"
                rows={4}
                className="w-full focus:outline-none text-sm  border-0 p-3"
                placeholder="Write the content here..."
                required
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title: title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className="ml-0 mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
            >
              Publish Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
