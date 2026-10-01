import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(async () => {
    await navigator.clipboard.writeText(password);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-center text-2xl font-bold text-white mb-6">
        Password Generator
      </h1>

      <div className="flex rounded-lg overflow-hidden shadow mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-4 text-gray-800 bg-white"
          placeholder="Password"
          readOnly
        />

        <button
          onClick={copyPassword}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 font-semibold transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="flex items-center gap-x-2 mb-4">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="cursor-pointer flex-1"
          id="range"
        />

        <label htmlFor="range" className="text-white">
          Length: {length}
        </label>
      </div>

      <div className="flex items-center gap-x-2 mb-2">
        <input
          type="checkbox"
          id="numberInput"
          checked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
        />

        <label htmlFor="numberInput" className="text-white">
          Numbers
        </label>
      </div>

      <div className="flex items-center gap-x-2 mb-4">
        <input
          type="checkbox"
          id="charInput"
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />

        <label htmlFor="charInput" className="text-white">
          Characters
        </label>
      </div>

      <button
        onClick={passwordGenerator}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition mb-4"
      >
        Generate Password
      </button>

      <p className="text-center text-gray-400 text-sm">
        Generate a secure password and copy it with one click.
      </p>
    </div>
  );
}

export default App;
