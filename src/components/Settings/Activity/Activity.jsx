import React from 'react';
import styles from "./Activity.module.css";
import {
  Box,
  Typography,
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
        <CircularProgress sx={{ color: '#2563eb' }} />
        <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
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
          background: "#ffffff",
          borderRadius: "18px",
          p: 3,
          boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            color: "#0f172a",
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
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#64748b",
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
                fill: "#64748b",
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
              cursor={{ fill: "rgba(37, 99, 235, 0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.1)",
                backgroundColor: "#ffffff",
                color: "#0f172a",
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
                  fill: "#334155",
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