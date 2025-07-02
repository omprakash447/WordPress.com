import React, { useState } from "react";

function App() {
  const [Pname, setPname] = useState<string>("");
  const [price, setPrice] = useState<number>();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Pname, price }),
      });

      const data = await response.json();
      console.log(data);
      alert("Product added successfully!");
      setPname("");
      setPrice(undefined);
    } catch (err) {
      console.log(err);
      alert("Error adding product.");
    }
  };

  return (
    <>
      <style>{`
        @keyframes gentleGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          background: "linear-gradient(-45deg, #2c3e50, #4ca1af)",
          backgroundSize: "400% 400%",
          animation: "gentleGradient 20s ease infinite",
        }}
      >
        <form
          className="p-5 rounded shadow"
          style={{
            backgroundColor: "rgba(40, 40, 50, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 4px 30px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            borderRadius: "12px",
            color: "#f0f0f3",
            width: "100%",
            maxWidth: "500px",
          }}
          onSubmit={handleAdd}
        >
          <h2
            className="mb-4 text-center fw-bold"
            style={{
              color: "#f9d342",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "1px",
            }}
          >
            Add New Product
          </h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Product Name
            </label>
            <input
              type="text"
              className="form-control border-0"
              placeholder="e.g. Orange"
              value={Pname}
              onChange={(e) => setPname(e.target.value)}
              required
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Product Price
            </label>
            <input
              type="number"
              step="0.001"
              className="form-control border-0"
              placeholder="e.g. 12.000"
              value={price === undefined ? "" : price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "10px 15px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2"
            style={{
              background: "linear-gradient(90deg, #f9d342, #f39c12)",
              border: "none",
              color: "#333",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(249, 211, 66, 0.4)",
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
