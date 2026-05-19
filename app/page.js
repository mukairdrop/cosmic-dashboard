"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [latest, setLatest] = useState(null);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);

  async function fetchData() {
    try {
      const latestRes = await fetch("/api/latest");
      const statsRes = await fetch("/api/stats");
      const historyRes = await fetch("/api/history");

      const latestData = await latestRes.json();
      const statsData = await statsRes.json();
      const historyData = await historyRes.json();

      setLatest(latestData);
      setStats(statsData);
      setHistory(historyData);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  function rarityColor(rarity) {
    if (rarity === "Common") return "white";
    if (rarity === "Rare") return "cyan";
    if (rarity === "Epic") return "orange";
    if (rarity === "Legendary") return "purple";
    if (rarity === "Mythic") return "red";

    return "white";
  }

  return (
    <main
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        🌌 Cosmic Dashboard
      </h1>

      {stats && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "20px"
          }}
        >
          Total Discoveries: {stats.totalDiscoveries}
        </div>
      )}

      {latest && (
        <div
          style={{
            border: `2px solid ${rarityColor(latest.rarity)}`,
            boxShadow:
              `0 0 20px ${rarityColor(latest.rarity)}`,
            borderRadius: "20px",
            padding: "30px",
            maxWidth: "400px",
            margin: "0 auto 40px auto",
            textAlign: "center"
          }}
        >
          <h2>🌟 Latest Discovery</h2>

          <h3>{latest.type}</h3>

          <p>
            <strong>Sector:</strong>
            {" "}
            {latest.sector}
          </p>

          <p>
            <strong>Rarity:</strong>
            {" "}
            {latest.rarity}
          </p>

          <p style={{ fontSize: "12px" }}>
            {latest.timestamp}
          </p>
        </div>
      )}

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        🚀 Live Discovery Feed
      </h2>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        {history.map((item) => (
          <div
            key={item.id}
            style={{
              border: `1px solid ${rarityColor(item.rarity)}`,
              padding: "20px",
              borderRadius: "12px",
              background: "#111",
              boxShadow:
                `0 0 10px ${rarityColor(item.rarity)}`
            }}
          >
            <h3>{item.type}</h3>

            <p>
              <strong>Sector:</strong>
              {" "}
              {item.sector}
            </p>

            <p>
              <strong>Rarity:</strong>
              {" "}
              <span
                style={{
                  color: rarityColor(item.rarity)
                }}
              >
                {item.rarity}
              </span>
            </p>

            <p style={{ fontSize: "12px" }}>
              {item.timestamp}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
