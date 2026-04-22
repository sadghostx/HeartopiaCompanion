export default function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "4px solid var(--pastel-blue)",
          borderTopColor: "transparent",
          animation: "spin 1s linear infinite",
          margin: "0 auto",
        }}
      />
    </div>
  );
}