import { useState } from "react";

export default function AnnouncementPage() {
  const [text, setText] = useState("");

  const saveAnnouncement = async () => {
    const response = await fetch("/api/announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (data.success) {
      shopify.toast.show("Announcement saved");
      setText("");
    }
  };

  return (
    <s-page heading="Announcement">
      <s-section>
        <s-card heading="Announcement Text">
          <h2 style={{ fontSize: "18px" }}>Enter Announcement Text</h2>
          <div style={{ padding: "16px" }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
              }}
            />

            <div style={{ marginTop: "20px" }}>
              <s-button variant="primary" onClick={saveAnnouncement}>
                Save
              </s-button>
            </div>
          </div>
        </s-card>
      </s-section>
    </s-page>
  );
}
