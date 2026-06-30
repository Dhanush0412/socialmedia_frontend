
import styles from "./Dashboard/Dashboard.module.css";
import { useState } from "react";
import { useConnections } from "../hooks/connection/useConnections";
import ConnectionCard from "../components/ConnectionCard";
import "../Css/MyConnections.css";

function MyConnections() {
  const { data, isLoading } = useConnections();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="connections-loading">
        Loading friends...
      </div>
    );
  }

  const filteredFriends = data?.filter((friend) =>
    friend?.user?.username
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    
      <div className="connections-page">
        <div className="connections-header">
          <div className="chat-icon">
            💬
          </div>

          <div>
            <h1>
              Friends List
            </h1>

            <p>
              Start a conversation with your friends
            </p>
          </div>
        </div>

        <div className="chat-search">
          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {
          filteredFriends?.length > 0 ? (
            <div className="friends-list">
              {
                filteredFriends.map((friend) => (
                  <ConnectionCard
                    key={friend._id}
                    friend={friend}
                  />
                ))
              }
            </div>
          ) : (
            <div className="no-friends">
              <div>
                👥
              </div>

              <h2>
                No Friends Found
              </h2>

              <p>
                Try searching another username
              </p>
            </div>
          )
        }
    
    </div >
    
  );
}

export default MyConnections;