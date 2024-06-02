// src/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import { ThemeProvider } from "styled-components";
import eveData from "./eve_formatted.json"; // Import the newly formatted JSON file
import "./dashboard.css";
const darkTheme = {
  background: "#2b2b2b",
  color: "#ffffff",
  chartBackground: "#333",
  primary: "#8884d8",
  secondary: "#82ca9d",
  tertiary: "#ff7300",
  quaternary: "#ffbf00",
  quinary: "#ff0000",
};
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(eveData);
  }, []);

  // Prepare data for graphs
  const severityCounts = data.reduce((acc, item) => {
    if (item.alert && item.alert.severity !== undefined) {
      const severity = item.alert.severity;
      acc[severity] = (acc[severity] || 0) + 1;
    }
    return acc;
  }, {});

  const severityData = Object.keys(severityCounts).map((severity) => ({
    name: `Severity ${severity}`,
    value: severityCounts[severity],
  }));

  const protocolCounts = data.reduce((acc, item) => {
    const proto = item.proto;
    acc[proto] = (acc[proto] || 0) + 1;
    return acc;
  }, {});

  const protocolData = Object.keys(protocolCounts).map((proto) => ({
    name: proto,
    value: protocolCounts[proto],
  }));

  const actionCounts = data.reduce((acc, item) => {
    if (item.alert && item.alert.action) {
      const action = item.alert.action;
      acc[action] = (acc[action] || 0) + 1;
    }
    return acc;
  }, {});

  const actionData = Object.keys(actionCounts).map((action) => ({
    name: action,
    value: actionCounts[action],
  }));

  const categoryCounts = data.reduce((acc, item) => {
    if (item.alert && item.alert.category) {
      const category = item.alert.category;
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  const categoryData = Object.keys(categoryCounts).map((category) => ({
    name: category,
    value: categoryCounts[category],
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <p className="title"> Dashboard</p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="src_port" name="Source Port" />
              <YAxis
                type="number"
                dataKey="dest_port"
                name="Destination Port"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter
                name="Port Communication"
                data={data}
                fill={darkTheme.quinary}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={protocolData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={darkTheme.primary}
                label
              >
                {protocolData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={darkTheme.tertiary}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
