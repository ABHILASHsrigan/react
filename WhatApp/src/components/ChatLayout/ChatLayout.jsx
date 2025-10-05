import Sidebar from "../SideBar/Sidebar";
import ChatWindow from "../ChatLayout/ChatWindow";
import ProfilePanel from "../ChatLayout/ProfilePanel";
import { useSelector } from "react-redux";

export default function ChatLayout() {
  const sel = useSelector((s) => s.chat.selectedUser);

  return (
    <div className="app-grid">
      <Sidebar />
      <ChatWindow />
      <ProfilePanel user={sel} />
    </div>
  );
}
