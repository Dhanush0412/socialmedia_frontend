import Layout from "../../components/Layout/Layout";
import dashboardStyles from "../Dashboard/Dashboard.module.css";
import styles from "./SearchUsers.module.css";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchUsers } from "../../hooks/connection/useSearchUsers";
import UserCard from "../../components/UserCard/UserCard";

function SearchUsers() {

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);

  const { data = [], isLoading } =
    useSearchUsers(debouncedSearch);

  return (
    <Layout>

      <div className={styles["search-users"]}>

        <div className={styles["search-users__header"]}>

          <div className={styles["search-users__icon"]}>
            🔍
          </div>

          <h1 className={styles["search-users__title"]}>
            Find Friends
          </h1>

          <p className={styles["search-users__subtitle"]}>
            Search and connect with people you know
          </p>

        </div>

        <div className={styles["search-users__input-wrapper"]}>

          <span className={styles["search-users__input-icon"]}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>

          <input
            className={styles["search-users__input"]}
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          {search && (

            <button
              className={styles["search-users__clear"]}
              onClick={()=>setSearch("")}
            >
              ✕
            </button>

          )}

        </div>

        {isLoading && debouncedSearch && (

          <div className={styles["search-users__status"]}>

            <div className={styles["search-users__spinner"]}/>

            <span>
              Searching for "{search}"...
            </span>

          </div>

        )}

        {!isLoading &&
          debouncedSearch &&
          data.length===0 && (

          <div className={styles["search-users__empty"]}>

            <div className={styles["search-users__empty-icon"]}>
              👤
            </div>

            <h3>No users found</h3>

            <p>
              Try a different username
            </p>

          </div>

        )}

        {debouncedSearch &&
          data.length>0 && (

          <>

            <p className={styles["search-users__count"]}>

              {data.length}
              {" "}
              result
              {data.length!==1 ? "s" : ""}
              {" "}
              found

            </p>

            <div className={styles["search-users__results"]}>

              {data.map((user)=>(

                <UserCard
                  key={user._id}
                  user={user}
                />

              ))}

            </div>

          </>

        )}

        {!debouncedSearch && (

          <div className={styles["search-users__placeholder"]}>

            <div className={styles["search-users__placeholder-icon"]}>
              👥
            </div>

            <p>
              Start typing to search for friends
            </p>

          </div>

        )}

      </div>

    </Layout>
  );

}

export default SearchUsers;