import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const defaultColor = localStorage.getItem('color') || 'gray';
  const [color, setColor] = useState(defaultColor)

  const colors = [
    { name: 'red', label: 'Red' },
    { name: 'green', label: 'Green' },
    { name: 'blue', label: 'Blue' },
    { name: 'yellow', label: 'Yellow' },
    { name: 'purple', label: 'Purple' },
    { name: 'orange', label: 'Orange' },
    { name: 'pink', label: 'Pink' },
    { name: 'teal', label: 'Teal' },
    { name: 'indigo', label: 'Indigo' },
    { name: 'black', label: 'Black' },
  ];


  useEffect(() => {
    localStorage.setItem('color', color);
  }, [color]);

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          {colors.map((color) => (
            <button
              key={color.name}
              className="outline-none px-4 py-2 rounded-full text-white"
              type="button"
              style={{ backgroundColor: color.name }}
              onClick={() => setColor(color.name)}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
