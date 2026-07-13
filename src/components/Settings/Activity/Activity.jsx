import React from 'react';
import styles from "./Activity.module.css";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useActivity } from '../../../hooks/useSettings';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Activity() {
  const { data: activityData, isLoading } = useActivity();
  const activities = activityData || [];
  const chartData = activities
    .slice(0, 7)
    .reverse()
    .map((item) => ({
      day: item.date,
      hours: Number((item.totalSeconds / 3600).toFixed(2)),
      duration: item.duration,
    }));

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Loading activity...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Bar Chart */}
      <Box
        sx={{
          width: "100%",
          height: 320,
          background: "#fff",
          borderRadius: "15px",
          p: 2,
          mb: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Last 7 Days Usage
        </Typography>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis
              tickFormatter={(value) => {
                const totalMinutes = value * 60;

                if (totalMinutes < 60) {
                  return `${totalMinutes}m`;
                }

                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;

                if (minutes === 0) {
                  return `${hours}h`;
                }

                return `${hours}h ${minutes}m`;
              }}
              label={{
                value: "Usage Time",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value, name, props) => [
                props.payload.duration,
                "Usage",
              ]}
            />

            <Bar
              dataKey="hours"
              fill="#ff8c00"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default Activity;