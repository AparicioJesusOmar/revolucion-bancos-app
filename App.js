import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQVhJe_CqzsLm9e3AxObZK8kPMegb7xj989gYlpmujsWgYM2Ir2UFkRO4_CrtvZfaWnGx_D_jYHpdkB/pub?gid=2113085739&single=true&output=csv"
      );
      const text = await res.text();
      const rows = text.split("\n").filter((r) => r.trim() !== "");
      const parsed = rows.map((row) => row.split(","));
      setHeaders(parsed[0]);
      setData(parsed.slice(1));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = data.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(lowerSearch))
    );
    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Revolución & Bancos Privados
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 border rounded shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              {headers.map((header, i) => (
                <th key={i} className="border px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                {row.map((cell, j) => (
                  <td key={j} className="border px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
