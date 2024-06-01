"use client";
import { useState, createContext, useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Inputs from "../components/Inputs";
import NavBar from "../components/NavBar";
import { getQuote } from "../utils";

export const userContext = createContext(null);
export default function Home() {
  const [inputToken, setInputToken] = useState({ sign: "usdt", amount: 10 });
  const [outputToken, setOutputToken] = useState({ sign: "shib", amount: 0 });


  return (
    <userContext.Provider value={{ inputToken, setInputToken, outputToken, setOutputToken }}>
      <div className="min-h-screen flex items-center flex-col">
        <button onClick={() => getQuote(inputToken, outputToken)}>click me</button>
        <NavBar />
        <Inputs />
        <Footer />
      </div>
    </userContext.Provider>
  );
}
