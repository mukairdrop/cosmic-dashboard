"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [latest, setLatest] = useState(null);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setLoading(false);

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
        background:
          "radial-gradient(circle at top, #111, #000)",
        color: "white",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "56px",
          marginBottom: "10px"
        }}
      >
        🌌 Cosmic Wayfinder
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.7,
          marginBottom: "40px"
        }}
      >
        SpaceComputer-Powered Galactic Discovery Engine
      </p>

      {loading && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "20px",
            animation: "pulse 1s infinite"
          }}
        >
          🛰️ Scanning Cosmic Sectors...
        </div>
      )}

      {stats && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "40px"
          }}
        >
          <div style={statCardStyle}>
            <h3>Total Discoveries</h3>
            <p>{stats.totalDiscoveries}</p>
          </div>

          {Object.entries(stats.rarityCounts).map(
            ([rarity, count]) => (
              <div
                key={rarity}
                style={{
                  ...statCardStyle,
                  border:
                    `1px solid ${rarityColor(rarity)}`
                }}
              >
                <h3
                  style={{
                    color: rarityColor(rarity)
                  }}
                >
                  {rarity}
                </h3>

                <p>{count}</p>
              </div>
            )
          )}
        </div>
      )}

      {latest && (
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto 50px auto",
            border:
              `2px solid ${rarityColor(latest.rarity)}`,

            boxShadow:
              `0 0 25px ${rarityColor(latest.rarity)}`,

            borderRadius: "24px",
            overflow: "hidden",
            background: "#111"
          }}
        >
          <img
            src={latest.image}
            alt={latest.planetName}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover"
            }}
          />

          <div style={{ padding: "25px" }}>
            <h2
              style={{
                color: rarityColor(latest.rarity),
                fontSize: "38px"
              }}
            >
              {latest.planetName}
            </h2>

            <p>
              <strong>Sector:</strong>
              {" "}
              {latest.sector}
            </p>

            <p>
              <strong>Coordinates:</strong>
              {" "}
              X:
              {latest.coordinates?.x}
              {" "}
              Y:
              {latest.coordinates?.y}
            </p>

            <p>
              <strong>Biome:</strong>
              {" "}
              {latest.biome}
            </p>

            <p>
              <strong>Moons:</strong>
              {" "}
              {latest.moons}
            </p>

            <p>
              <strong>Temperature:</strong>
              {" "}
              {latest.temperature}°C
            </p>

            <p>
              <strong>Danger:</strong>
              {" "}
              {latest.danger}
            </p>

            <p>
              <strong>Rarity:</strong>
              {" "}
              <span
                style={{
                  color: rarityColor(latest.rarity)
                }}
              >
                {latest.rarity}
              </span>
            </p>

            <p
              style={{
                marginTop: "20px",
                fontStyle: "italic",
                opacity: 0.8
              }}
            >
              "{latest.lore}"
            </p>
          </div>
        </div>
      )}

      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px"
        }}
      >
        🚀 Live Discovery Feed
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",

          gap: "20px"
        }}
      >
        {history.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#111",
              borderRadius: "20px",
              overflow: "hidden",

              border:
                `1px solid ${rarityColor(item.rarity)}`,

              boxShadow:
                `0 0 12px ${rarityColor(item.rarity)}`
            }}
          >
            <img
              src={item.image}
              alt={item.planetName}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  color: rarityColor(item.rarity)
                }}
              >
                {item.planetName}
              </h3>

              <p>
                <strong>Sector:</strong>
                {" "}
                {item.sector}
              </p>

              <p>
                <strong>Biome:</strong>
                {" "}
                {item.biome}
              </p>

              <p>
                <strong>Danger:</strong>
                {" "}
                {item.danger}
              </p>

              <p>
                <strong>Rarity:</strong>
                {" "}
                <span
                  style={{
                    color:
                      rarityColor(item.rarity)
                  }}
                >
                  {item.rarity}
                </span>
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  opacity: 0.8
                }}
              >
                {item.lore}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const statCardStyle = {
  background: "#111",
  padding: "20px",
  borderRadius: "18px",
  minWidth: "120px",
  textAlign: "center",
  border: "1px solid #333"
};
