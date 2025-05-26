import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  // create quotes generator
  const [quotes, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(false);

  // API request
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const baseURL = "/api/random";
      const response = await fetch(baseURL);

      const data = await response.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      console.log("Fetch error", error);
      setQuote({
        content: "Failed to fetch quote please try again later",
        author: "System",
      });
    } finally {
      setLoading(false);
    }
  };

  //load a quote on a mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className=" font-mono font-bold m-8 rounded-2xl border-4 bg-slate-50 sm:p-14 md:p-16 max-w-xl mx-auto">
      <h1 className="text-center text-2xl mb-8">Quotes Generator</h1>

      {/* quotes generated and loading button */}
      {loading ? (
        <p>Loading..</p>
      ) : (
        <>
          <h3 className="font-light">{quotes.content}</h3>
          <p className="text-right m-2 text-pink-600">{quotes.author}</p>
        </>
      )}

      {/* middle line */}
      <div className="border-t-2 border-neutral-600 my-8 w-full"></div>

      {/* icons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button title="Share on twitter">
            <FontAwesomeIcon
              className="text-xl cursor-pointer"
              icon={faTwitter}
            />
          </button>

          <button title="Copy Quote">
            <FontAwesomeIcon className="text-xl cursor-pointer" icon={faCopy} />
          </button>

          <button title="Play audio">
            <FontAwesomeIcon
              className="text-xl cursor-pointer"
              icon={faVolumeHigh}
            />
          </button>
        </div>
        {/* button to generate quotes and icon */}

        <button
          onClick={fetchQuote}
          className="p-3 rounded-lg transition-shadow shadow-lg hover:shadow-xl"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}
