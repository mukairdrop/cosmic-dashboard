"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [latest, setLatest] = useState(null);
  const [stats, setStats] = useState(null);

  async function fetchData() {
    try {
      const latestRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/latest`
      );

      const statsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stats`
      );

      const latestData = await latestRes.json();
      const statsData = await statsRes.json();

      setLatest(latestData);
      setStats(statsData);

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ fontSize: "48px" }}>
        🌌 Cosmic Dashboard
      </h1>

      {stats && (
        <div style={{ marginBottom: "20px" }}>
          Total Discoveries:
          {" "}
          {stats.totalDiscoveries}
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
            width: "320px",
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          <h2>{latest.type}</h2>

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
    </main>
  );
}
