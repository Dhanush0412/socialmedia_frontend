import { useEffect, useRef } from "react";
import { useUpdateActivity } from "../../hooks/useSettings";

function ActivityTracker() {
  const { mutate } = useUpdateActivity();
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();

    const sendActivity = () => {
      const endTime = Date.now();

      const seconds = Math.floor(
        (endTime - startTime.current) / 1000
      );

      if (seconds > 0) {
        mutate(
          { seconds },
          {
            onSuccess: () => {
              console.log("Activity Saved");
            },
            onError: (err) => {
              console.log(err);
            },
          }
        );
      }
    };

    window.addEventListener("beforeunload", sendActivity);

    return () => {
      sendActivity();
      window.removeEventListener("beforeunload", sendActivity);
    };
  }, []);

  return null;
}

export default ActivityTracker;