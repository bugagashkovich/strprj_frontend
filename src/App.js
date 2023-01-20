import { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");

  const [data, setData] = useState(null);

  let handleQuery = (e) => {
    setQuery(e.target.value);
  };
  let handleBrand = (e) => {
    setBrand(e.target.value);
  };

  const ref = useRef(null);

  let handleSubmit = async (e) => {
    e.preventDefault();
    clearInterval(ref.current);
    let apiData = await axios.get("http://localhost:4000/", {
      params: { name: query },
    });
    ref.current = setInterval(async () => {
      apiData = await axios.get("http://localhost:4000/", {
        params: { name: query },
      });
    }, 30000);
    setData(apiData.data);
  };

  const brandList = data
    ? data.map((br, i) => {
        return (
          <div
            key={i}
            className={
              brand.toLowerCase() === br.toLowerCase()
                ? "bg-green-500 p-3 rounded-md shadow-md text-white"
                : "bg-slate-50 p-3 rounded-md shadow-md"
            }
          >
            {i + 1}. {br}
          </div>
        );
      })
    : null;

  return (
    <div className="container mx-auto">
      <form
        className=" font-semibold flex items-center justify-center space-x-10 mt-4 bg-slate-300 p-5  rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-3">
          <label className="font-semibold">
            Запрос <span></span>
            <input
              className="p-2 border-black rounded-md shadow-md font-normal"
              value={query}
              onChange={handleQuery}
            ></input>
          </label>
          <button
            type="submit"
            className="bg-indigo-500 py-2 px-10 text-white rounded-md shadow-md "
          >
            Поиск
          </button>
        </div>
        <label>
          Бренд <span></span>
          <input
            className="p-2 border-black rounded-md shadow-md font-normal"
            value={brand}
            onChange={handleBrand}
          ></input>
        </label>
      </form>
      <div className="flex flex-col space-y-4 bg-slate-300 mt-4 rounded-lg shadow-md p-5">
        {brandList}
      </div>
    </div>
  );
}

export default App;
