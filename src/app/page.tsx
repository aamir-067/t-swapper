"use client";
import { useState, createContext, useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Inputs from "../components/Inputs";
import NavBar from "../components/NavBar";
import { getQuote } from "../utils";

export const userContext = createContext(null);
export default function Home() {
  const [inputToken, setInputToken] = useState({ sign: "", amount: 0 });
  const [outputToken, setOutputToken] = useState({ sign: "", amount: 0 });
  const [refresh, setRefresh] = useState(false);




  const getQuoteAmount = async () => {
    if (refresh) {
      const res = await getQuote(inputToken, outputToken);
      setOutputToken(prev => { return { ...prev, amount: res } });
      setRefresh(false);
    }
  }

  if (refresh) {
    if (inputToken.amount && outputToken.sign !== "" && inputToken.sign !== "") {
      getQuoteAmount();
    }
  }


  return (
    <userContext.Provider value={{ inputToken, setRefresh, setInputToken, outputToken, setOutputToken }}>
      <div className="min-h-screen flex items-center flex-col">
        <button onClick={() => getQuote(inputToken, outputToken)}>click me</button>
        <NavBar />
        <Inputs />
        <Footer />
      </div>
    </userContext.Provider>
  );
}
