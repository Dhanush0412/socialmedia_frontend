import Layout from "../components/Layout/Layout";
import styles from "./Dashboard/Dashboard.module.css";
import { useState } from "react";
import { useSearchUsers } from "../hooks/connection/useSearchUsers";
import UserCard from "../components/UserCard";
import "../Css/SearchUsers.css";

function SearchUsers() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSearchUsers(search);

  return (
    <Layout>
    <div className="search-users">
      <div className="search-users__header">
        <div className="search-users__icon">🔍</div>
        <h1 className="search-users__title">Find Friends</h1>
        <p className="search-users__subtitle">Search and connect with people you know</p>
      </div>

      <div className="search-users__input-wrapper">
        <span className="search-users__input-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          className="search-users__input"
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-users__clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {isLoading && search && (
        <div className="search-users__status">
          <div className="search-users__spinner" />
          <span>Searching for "{search}"...</span>
        </div>
      )}

      {!isLoading && data?.length === 0 && search && (
        <div className="search-users__empty">
          <div className="search-users__empty-icon">👤</div>
          <h3>No users found</h3>
          <p>Try a different username</p>
        </div>
      )}

      {search && Array.isArray(data) && data.length > 0 && (
        <>
          <p className="search-users__count">{data.length} result{data.length !== 1 ? "s" : ""} found</p>
          <div className="search-users__results">
            {data.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </>
      )}

      {!search && (
        <div className="search-users__placeholder">
          <div className="search-users__placeholder-icon">👥</div>
          <p>Start typing to search for friends</p>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default SearchUsers;
