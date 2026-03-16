// ============================================================
// Sidebar.js — Panneau latéral avec la liste des utilisateurs
// ============================================================

import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

function Sidebar({ users, room, show, onClose }) {
    const [activityLog, setActivityLog] = useState([]);
    const socket = useSocket();
    useEffect(() => {

        const handleActivityLog = (activity) => {
            setActivityLog((prev) => {
                const updated = [activity, ...prev];
                return updated.slice(0, 5);
            });
        };

        socket.on("activity_log", handleActivityLog);

        return () => {
            socket.off("activity_log", handleActivityLog);
        };

    }, [socket]);
    return (
        <>
            {/* Fond semi-transparent quand la sidebar est ouverte (mobile) */}
            {show && <div className="sidebarOverlay" onClick={onClose} />}

            <div className={`sidebar ${show ? "open" : ""}`}>
                <div className="sidebarHeader">
                    <h4>#{room}</h4>
                    <button className="closeSidebar" onClick={onClose}>✕</button>
                </div>

                <div className="sidebarSection">
                    <p className="sidebarLabel">
                        PARTICIPANTS ({users.length})
                    </p>

                    {/* 🔹 Afficher chaque utilisateur avec son initiale */}
                    {users.length > 0 ? (
                        users.map((u) => (
                            <div className="userItem" key={u.socketId}>
                                <div className="userAvatar">
                                    {u.username.charAt(0).toUpperCase()}
                                </div>
                                <span>{u.username}</span>
                                {/* Point vert = en ligne */}
                                <span className="onlineDot" />
                            </div>
                        ))
                    ) : (
                        <p className="noUsers">Aucun utilisateur</p>
                    )}
                    <div className="activitySection">
                        <h4>Activité recente</h4>

                        {activityLog.length === 0 && (
                            <p>Aucune activité</p>
                        )}

                        {activityLog.map((act, index) => (
                            <div key={index} className="activityItem">
                                {act.username} {act.action} #{act.room} à {act.time}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
