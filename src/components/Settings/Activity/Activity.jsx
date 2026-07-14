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
  LabelList,
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
          background: "#fff",
          borderRadius: "18px",
          p: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          border: "1px solid #f2f2f2",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            color: "#222",
            mb: 3,
          }}
        >
          📊 Last 7 Days Usage
        </Typography>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={chartData}
            margin={{
              top: 45,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="usageBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFB74D" />
                <stop offset="100%" stopColor="#FB8C00" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#ECECEC"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#555",
                fontSize: 12,
                fontWeight: 600,
              }}
              tickMargin={10}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              width={50}
              tick={{
                fill: "#666",
                fontSize: 12,
                fontWeight: 600,
              }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const minutes = Math.round(value * 60);

                if (minutes < 60) return `${minutes}m`;

                const h = Math.floor(minutes / 60);
                const m = minutes % 60;

                return m === 0 ? `${h}h` : `${h}h ${m}m`;
              }}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,167,38,.08)" }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 6px 18px rgba(0,0,0,.15)",
              }}
              formatter={(value, name, props) => [
                props.payload.duration,
                "Usage",
              ]}
            />

            <Bar
              dataKey="hours"
              fill="url(#usageBar)"
              radius={[12, 12, 0, 0]}
              barSize={30}
            >
              <LabelList
                dataKey="duration"
                position="top"
                offset={5}
                style={{
                  fill: "#333",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default Activity;