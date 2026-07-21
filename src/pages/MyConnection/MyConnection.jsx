import { useState, useMemo, useEffect } from "react";
import { useConnections } from "../../hooks/connection/useConnections";
import { useUnreadCount } from "../../hooks/chat/useUnreadCount";
import ConnectionCard from "../../components/ConnectionCard/ConnectionCard";
import { socket } from "../../socket";
import styles from "./MyConnection.module.css";

function MyConnections() {
  const { data, isLoading } = useConnections();

  const { data: unreadData = [] } = useUnreadCount();

  const [search, setSearch] = useState("");

  const [unreadMap, setUnreadMap] = useState({});

  // Initial unread count from API
  useEffect(() => {
    if (!Array.isArray(unreadData)) return;

    const map = {};

    unreadData.forEach((item) => {
      map[item._id] = item.unreadCount;
    });

    setUnreadMap(map);
  }, [unreadData]);

  // Socket connection
  useEffect(() => {
    const profileId = localStorage.getItem("profileid");

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("register", profileId);

    // Someone sent you a new message
    const handleUnreadUpdated = ({
      sender,
      unreadCount,
    }) => {
      setUnreadMap((prev) => ({
        ...prev,
        [sender]: unreadCount,
      }));
    };

    // Messages marked as read
    const handleMessagesRead = ({
      senderId,
    }) => {
      setUnreadMap((prev) => ({
        ...prev,
        [senderId]: 0,
      }));
    };

    socket.on(
      "unreadUpdated",
      handleUnreadUpdated
    );

    socket.on(
      "messagesRead",
      handleMessagesRead
    );

    return () => {
      socket.off(
        "unreadUpdated",
        handleUnreadUpdated
      );

      socket.off(
        "messagesRead",
        handleMessagesRead
      );
    };
  }, []);

  const friends = useMemo(() => {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.connections))
      return data.connections;

    if (Array.isArray(data?.data))
      return data.data;

    return [];
  }, [data]);
    const uniqueFriends = useMemo(() => {
    return [
      ...new Map(
        friends.map((friend) => [
          friend._id,
          friend,
        ])
      ).values(),
    ];
  }, [friends]);

  const filteredFriends = useMemo(() => {
    return uniqueFriends.filter((friend) =>
      friend.user?.username
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [uniqueFriends, search]);

  const sortedFriends = useMemo(() => {
    return [...filteredFriends].sort((a, b) => {
      const unreadA =
        unreadMap[a._id] || 0;

      const unreadB =
        unreadMap[b._id] || 0;

      if (
        unreadA > 0 &&
        unreadB === 0
      )
        return -1;

      if (
        unreadA === 0 &&
        unreadB > 0
      )
        return 1;

      return unreadB - unreadA;
    });
  }, [
    filteredFriends,
    unreadMap,
  ]);

  if (isLoading) {
    return (
      <div
        className={
          styles["connections-loading"]
        }
      >
        Loading friends...
      </div>
    );
  }

  return (
    <div
      className={
        styles["connections-page"]
      }
    >
      <div
        className={
          styles["connections-header"]
        }
      >
        <div
          className={
            styles["chat-icon"]
          }
        >
          💬
        </div>

        <div>
          <h1>
            Friends List
          </h1>

          <p>
            Start a conversation with
            your friends
          </p>
        </div>
      </div>

      <div
        className={
          styles["chat-search"]
        }
      >
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>
            {sortedFriends.length > 0 ? (
        <div className={styles["friends-list"]}>
          {sortedFriends.map((friend) => (
            <ConnectionCard
              key={friend._id}
              friend={friend}
              unreadCount={unreadMap[friend._id] || 0}
            />
          ))}
        </div>
      ) : (
        <div className={styles["no-friends"]}>
          <div>👥</div>

          <h2>No Friends Found</h2>

          <p>
            {search
              ? "No friends match your search."
              : "You don't have any friends yet."}
          </p>
        </div>
      )}
    </div>
  );
}

export default MyConnections;