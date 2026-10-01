import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // password generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;':\",./<>?";

    for (let i = 0; i < length - 1; i++){
      let char = Math.floor((Math.random() * str.length + 1));
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
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
            onClick={() => {
              navigator.clipboard.writeText(password);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 font-semibold transition"
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' id="range" onChange={(e) => setLength(e.target.value)} />
            <label htmlFor='range' className='text-white'> length: {length}</label>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="numberInput" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => !prev); }} />
          <label htmlFor="numberInput" className='text-white'>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="charInput" defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => !prev); }} />
          <label htmlFor="charInput" className='text-white'>Characters</label>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Generate a secure password and copy it with one click.
        </p>
      </div>
    </>
  );

}

export default App
