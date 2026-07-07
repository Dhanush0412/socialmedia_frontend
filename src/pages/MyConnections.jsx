import { useState, useEffect } from "react";
import { useConnections } from "../hooks/connection/useConnections";
import { useUnreadCount } from "../hooks/chat/useUnreadCount";
import ConnectionCard from "../components/ConnectionCard";
import { socket } from "../socket";
import "../Css/MyConnections.css";

function MyConnections() {

  const { data, isLoading } = useConnections();

  const { data: unreadData = [] } = useUnreadCount();

  const [search, setSearch] = useState("");

  const [unreadMap, setUnreadMap] = useState({});

  useEffect(() => {

    socket.emit(
      "register",
      localStorage.getItem("profileid")
    );

  }, []);

  useEffect(() => {

    socket.on("unreadUpdated", (data) => {

      setUnreadMap((prev) => ({

        ...prev,

        [data.sender]: data.unreadCount

      }));

    });

    return () => {

      socket.off("unreadUpdated");

    };

  }, []);

  useEffect(() => {

    const obj = {};

    unreadData.forEach((item) => {

      obj[item._id] = item.unreadCount;

    });

    setUnreadMap(obj);

  }, [unreadData]);

  if (isLoading) {

    return (

      <div className="connections-loading">
        Loading friends...
      </div>

    );

  }

  const uniqueFriends = [

    ...new Map(

      (data || []).map((friend) => [

        friend._id,

        friend

      ])

    ).values()

  ];

  const filteredFriends = uniqueFriends.filter((friend) =>

    friend?.user?.username
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  const sortedFriends = [...filteredFriends].sort((a, b) => {

    const unreadA = unreadMap[a._id] || 0;

    const unreadB = unreadMap[b._id] || 0;

    if (unreadA > 0 && unreadB === 0) {

      return -1;

    }

    if (unreadA === 0 && unreadB > 0) {

      return 1;

    }

    return 0;

  });

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
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
                  unreadCount={
                    unreadMap[friend._id] || 0
                  }
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