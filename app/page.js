"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [latest, setLatest] = useState(null);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedPlanet, setSelectedPlanet] =
    useState(null);

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
        background:
          "radial-gradient(circle at top, #111, #000)",

        color: "white",

        minHeight: "100vh",

        padding: "20px",

        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "10px"
        }}
      >
        🌌 Cosmic Wayfinder
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.7,
          marginBottom: "30px"
        }}
      >
        Interactive Galactic Discovery Engine
      </p>

      {stats && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "25px",
            flexWrap: "wrap"
          }}
        >
          <StatCard
            title="Discoveries"
            value={stats.totalDiscoveries}
          />

          {Object.entries(stats.rarityCounts).map(
            ([rarity, count]) => (
              <StatCard
                key={rarity}
                title={rarity}
                value={count}
                color={rarityColor(rarity)}
              />
            )
          )}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px"
        }}
      >
        <div
          style={{
            background: "#050505",
            border: "1px solid #222",
            borderRadius: "20px",
            height: "800px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(white 1px, transparent 1px)",

              backgroundSize: "50px 50px",

              opacity: 0.08
            }}
          />

          {history.map((planet) => {
            const x =
              (planet.coordinates?.x || 0) % 95;

            const y =
              (planet.coordinates?.y || 0) % 95;

            return (
              <div
                key={planet.id}
                onClick={() =>
                  setSelectedPlanet(planet)
                }
                style={{
                  position: "absolute",

                  left: `${x}%`,

                  top: `${y}%`,

                  width: "14px",

                  height: "14px",

                  borderRadius: "50%",

                  background:
                    rarityColor(planet.rarity),

                  boxShadow:
                    `0 0 15px ${rarityColor(
                      planet.rarity
                    )}`,

                  cursor: "pointer",

                  transition: "0.2s"
                }}
                title={planet.planetName}
              />
            );
          })}
        </div>

        <div
          style={{
            background: "#111",
            borderRadius: "20px",
            padding: "20px",
            border: "1px solid #222"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px"
            }}
          >
            🪐 Planet Details
          </h2>

          {!selectedPlanet && (
            <p
              style={{
                textAlign: "center",
                opacity: 0.7
              }}
            >
              Select a planet from the galaxy map
            </p>
          )}

          {selectedPlanet && (
            <>
              <img
                src={selectedPlanet.image}
                alt={selectedPlanet.planetName}
                style={{
                  width: "100%",
                  borderRadius: "14px",
                  marginBottom: "15px"
                }}
              />

              <h2
                style={{
                  color:
                    rarityColor(
                      selectedPlanet.rarity
                    )
                }}
              >
                {selectedPlanet.planetName}
              </h2>

              <p>
                <strong>Sector:</strong>
                {" "}
                {selectedPlanet.sector}
              </p>

              <p>
                <strong>Coordinates:</strong>
                {" "}
                X:
                {selectedPlanet.coordinates?.x}
                {" "}
                Y:
                {selectedPlanet.coordinates?.y}
              </p>

              <p>
                <strong>Biome:</strong>
                {" "}
                {selectedPlanet.biome}
              </p>

              <p>
                <strong>Moons:</strong>
                {" "}
                {selectedPlanet.moons}
              </p>

              <p>
                <strong>Temperature:</strong>
                {" "}
                {selectedPlanet.temperature}°C
              </p>

              <p>
                <strong>Danger:</strong>
                {" "}
                {selectedPlanet.danger}
              </p>

              <p>
                <strong>Rarity:</strong>
                {" "}
                <span
                  style={{
                    color:
                      rarityColor(
                        selectedPlanet.rarity
                      )
                  }}
                >
                  {selectedPlanet.rarity}
                </span>
              </p>

              <p
                style={{
                  marginTop: "15px",
                  opacity: 0.8,
                  fontStyle: "italic"
                }}
              >
                "{selectedPlanet.lore}"
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  color = "white"
}) {
  return (
    <div
      style={{
        background: "#111",
        padding: "15px",
        borderRadius: "16px",
        border: `1px solid ${color}`,
        minWidth: "110px",
        textAlign: "center"
      }}
    >
      <h3 style={{ color }}>{title}</h3>

      <p>{value}</p>
    </div>
  );
}
