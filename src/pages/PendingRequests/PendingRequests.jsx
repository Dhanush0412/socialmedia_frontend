import { usePendingRequests } from "../../hooks/connection/usePendingRequests";
import RequestCard from "../../components/RequestCard/RequestCard";
import styles from "./PendingRequests.module.css";

function PendingRequests() {
  const { data, isLoading } = usePendingRequests();

  const requests = Array.isArray(data)
    ? data
    : Array.isArray(data?.requests)
    ? data.requests
    : Array.isArray(data?.data)
    ? data.data
    : [];

  console.log(data);

  if (isLoading) {
    return (
      <div className={styles["request-loading"]}>
        Loading requests...
      </div>
    );
  }

  return (
    <div className={styles["requests-page"]}>
      <div className={styles["requests-header"]}>
        <div className={styles["requests-icon"]}>
          👥
        </div>

        <h1>Connection Requests</h1>

        <p>Accept invitations and grow your network</p>
      </div>

      {requests.length > 0 ? (
        <div className={styles["requests-container"]}>
          <div className={styles["request-count"]}>
            {requests.length} New Invitation
            {requests.length > 1 ? "s" : ""}
          </div>

          <div className={styles["requests-list"]}>
            {requests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles["empty-request"]}>
          <div className={styles["empty-icon"]}>
            📭
          </div>

          <h2>No Connection Requests</h2>

          <p>
            When someone sends you a request, it will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default PendingRequests;