import Layout from "../../components/Layout/Layout";
import styles from "./SearchUsers.module.css";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchUsers } from "../../hooks/connection/useSearchUsers";
import UserCard from "../../components/UserCard/UserCard";
import { FaSearch, FaUserFriends, FaTimes, FaSpinner } from "react-icons/fa";

function SearchUsers() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800);

  const { data = [], isLoading } = useSearchUsers(debouncedSearch);

  return (
    <Layout>
      <div className={styles.searchPageWrapper}>
        <div className={styles.searchUsersContainer}>
          {/* Page Header */}
          <header className={styles.headerSection}>
            <div className={styles.headerIconBadge}>
              <FaSearch />
            </div>
            <h1 className={styles.headerTitle}>Find Friends</h1>
            <p className={styles.headerSubtitle}>
              Search for users by username to build your connection network.
            </p>
          </header>

          {/* Search Bar Wrapper */}
          <div className={styles.searchBarSection}>
            <div className={styles.inputWrapper}>
              <FaSearch className={styles.inputSearchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Type a username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              {search && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearch("")}
                  aria-label="Clear search input"
                  type="button"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Content States */}
          <div className={styles.contentSection}>
            {/* Loading Indicator */}
            {isLoading && debouncedSearch && (
              <div className={styles.statusBox}>
                <FaSpinner className={styles.spinnerIcon} />
                <span>Searching for "{search}"...</span>
              </div>
            )}

            {/* Empty State (No Search Results) */}
            {!isLoading && debouncedSearch && data.length === 0 && (
              <div className={styles.emptyStateBox}>
                <div className={styles.stateIconWrapper}>
                  <FaUserFriends />
                </div>
                <h3>No users found</h3>
                <p>We couldn't find anyone matching "{debouncedSearch}".</p>
              </div>
            )}

            {/* Search Results Display */}
            {!isLoading && debouncedSearch && data.length > 0 && (
              <div className={styles.resultsContainer}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultCountText}>
                    Found <strong>{data.length}</strong> {data.length === 1 ? "user" : "users"}
                  </span>
                </div>

                <div className={styles.resultsGrid}>
                  {data.map((user) => (
                    <UserCard key={user._id} user={user} />
                  ))}
                </div>
              </div>
            )}

            {/* Initial State (Before Typing) */}
            {!debouncedSearch && (
              <div className={styles.placeholderBox}>
                <div className={styles.stateIconWrapper}>
                  <FaUserFriends />
                </div>
                <h3>Start Your Search</h3>
                <p>Enter a username above to search for people on Panda Chat.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchUsers;