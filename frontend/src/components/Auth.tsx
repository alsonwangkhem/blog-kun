import { SignupInput } from "@alsonwangkhem/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`, postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Failed. Try again.")
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <div className="text-3xl font-extrabold text-center px-10">
          {type == "signin" ? "Welcome back." : "Create an account"}
        </div>
        <div className="text-center">
          {type == "signin"
            ? "Don't have an account yet"
            : "Already have an account?"}
          <Link
            className="pl-2 underline text-blue-400"
            to={type == "signin" ? "/signup" : "/signin"}
          >
            {type == "signin" ? "Sign up" : "Login"}
          </Link>
        </div>
        <div>
          {type == "signup" ? (
            <LabelledInput
              title="Name"
              placeholder="Abc Xyz"
              onChange={(event) => {
                setPostInputs({
                  ...postInputs,
                  name: event.target.value,
                });
              }}
            />
          ) : null}
          <LabelledInput
            title="Email"
            placeholder="abc@xyz.com"
            onChange={(event) => {
              setPostInputs({
                ...postInputs,
                username: event.target.value,
              });
            }}
          />
          <LabelledInput
            title="Password"
            type="password"
            placeholder="123abc###"
            onChange={(event) => {
              setPostInputs({
                ...postInputs,
                password: event.target.value,
              });
            }}
          />
          <button
          onClick={sendRequest}
            type="button"
            className="w-full mt-7 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type == "signin" ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface Labels {
  title: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({ title, placeholder, onChange, type }: Labels) {
  return (
    <div>
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-900 text-left">
        {title}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
