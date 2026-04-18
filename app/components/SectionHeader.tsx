export default function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: "1.6rem",
        fontWeight: 700,
        marginBottom: "20px",
        color: "var(--accent-blue)",
      }}
    >
      {title}
    </h2>
  );
}