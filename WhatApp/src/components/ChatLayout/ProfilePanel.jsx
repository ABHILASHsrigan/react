export default function ProfilePanel({ user }) {
  if (!user) {
    return (
      <div
        className="profile-panel"
        style={{
          flex: 1,
          backgroundColor: "#f0f2f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#667781",
          fontSize: "16px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Select a user
      </div>
    );
  }

  return (
    <div
      className="profile-panel"
      style={{
        flex: 1,
        backgroundColor: "#f0f2f5",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#25d366",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "16px",
          textTransform: "uppercase",
        }}
      >
        {(user.displayName || user.email)?.charAt(0)}
      </div>
      <h3 style={{ margin: "0", fontSize: "20px", color: "#111b21" }}>
        {user.displayName || user.email}
      </h3>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "#667781" }}>
        {user.email}
      </p>
    </div>
  );
}
