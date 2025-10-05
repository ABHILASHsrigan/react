import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "../../hooks/useAuthState";
import { setUsers } from "../../store/slices/usersSlice";
import { setSelectedUser } from "../../store/slices/chatSlice";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list);
  const sel = useSelector((s) => s.chat.selectedUser);
  const { user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
      dispatch(setUsers(arr.filter((u) => u.uid !== user.uid)));
    });
    return () => unsub();
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;
    const updateLastSeen = async () => {
      await updateDoc(doc(db, "users", user.uid), { lastSeen: serverTimestamp() });
    };
    updateLastSeen();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="sidebar">
      <h3>Users</h3>
      <div className="user-list">
        <div className="user-list">
  <div className="user-row"><div className="u-email">Abhilash</div></div>
  <div className="user-row"><div className="u-email">Ravi</div></div>
  <div className="user-row"><div className="u-email">rakesh</div></div>
</div>

        {users.map((u) => (
          <div
            key={u.uid}
            className={`user-row ${sel?.uid === u.uid ? "selected" : ""}`}
            onClick={() => dispatch(setSelectedUser(u))}
          >
            <div>
            

              <div className="u-last">
                Last seen: {u.lastSeen ? new Date(u.lastSeen.seconds * 1000).toLocaleString() : "—"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
