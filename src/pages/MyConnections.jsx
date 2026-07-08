import { useState, useMemo, useEffect } from "react";
import { useConnections } from "../hooks/connection/useConnections";
import { useUnreadCount } from "../hooks/chat/useUnreadCount";
import ConnectionCard from "../components/ConnectionCard";
import { socket } from "../socket";
import "../Css/MyConnections.css";

function MyConnections() {

  const { data, isLoading } = useConnections();

  const { data: unreadData = [] } = useUnreadCount();

  const [search, setSearch] = useState("");

  useEffect(() => {

    socket.emit(
      "register",
      localStorage.getItem("profileid")
    );

    return () => {

      socket.off("unreadUpdated");

    };

  }, []);

  const friends = useMemo(() => {

    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.connections)) return data.connections;

    if (Array.isArray(data?.data)) return data.data;

    return [];

  }, [data]);

  const unreadMap = useMemo(() => {

    const map = {};

    if (Array.isArray(unreadData)) {

      unreadData.forEach((item) => {

        map[item._id] = item.unreadCount;

      });

    }

    return map;

  }, [unreadData]);

  const uniqueFriends = useMemo(() => {

    return [

      ...new Map(

        friends.map((friend) => [

          friend._id,

          friend

        ])

      ).values()

    ];

  }, [friends]);

  const filteredFriends = useMemo(() => {

    return uniqueFriends.filter((friend) =>

      friend?.user?.username
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [uniqueFriends, search]);

  const sortedFriends = useMemo(() => {

    return [...filteredFriends].sort((a, b) => {

      const unreadA = unreadMap[a._id] || 0;

      const unreadB = unreadMap[b._id] || 0;

      if (unreadA > 0 && unreadB === 0) return -1;

      if (unreadA === 0 && unreadB > 0) return 1;

      return 0;

    });

  }, [filteredFriends, unreadMap]);

  if (isLoading) {

    return (

      <div className="connections-loading">
        Loading friends...
      </div>

    );

  }

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

        sortedFriends.length > 0 ? (

          <div className="friends-list">

            {

              sortedFriends.map((friend) => (

                <ConnectionCard
                  key={friend._id}
                  friend={friend}
                  unreadCount={unreadMap[friend._id] || 0}
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

    </div>

  );

}

export default MyConnections;