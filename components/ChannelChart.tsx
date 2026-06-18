"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import type { TimeSeriesPoint } from "@/lib/sites-data";

interface ChannelChartProps {
  data: TimeSeriesPoint[];
  dataKey?: string;
  color?: string;
}

function AnnotationLabel(props: {
  x?: number;
  y?: number;
  width?: number;
  index?: number;
  data: TimeSeriesPoint[];
}) {
  const { x = 0, y = 0, width = 0, index = 0, data } = props;
  const point = data[index];
  if (!point?.annotation) return null;

  const arrow = point.annotation.direction === "up" ? "↑" : "↓";
  const centerX = x + width / 2;

  return (
    <g>
      <foreignObject
        x={centerX - 70}
        y={y - 52}
        width={140}
        height={48}
        className="overflow-visible"
      >
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-primary">
            {point.date} {arrow}
          </span>
          <span className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground">
            {point.annotation.text}
          </span>
        </div>
      </foreignObject>
    </g>
  );
}

export default function ChannelChart({
  data,
  dataKey = "value",
  color,
}: ChannelChartProps) {
  const barColor = color ?? "var(--chart-1)";
  const hasAnnotations = data.some((d) => d.annotation);

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: hasAnnotations ? 56 : 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              fontFamily: "var(--font-sans), sans-serif",
            }}
            formatter={(value: number) => [value.toLocaleString(), "Value"]}
          />
          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={[4, 4, 0, 0]}
            name="Value"
          >
            {hasAnnotations && (
              <LabelList
                content={(props) => (
                  <AnnotationLabel
                    x={typeof props.x === "number" ? props.x : undefined}
                    y={typeof props.y === "number" ? props.y : undefined}
                    width={typeof props.width === "number" ? props.width : undefined}
                    index={props.index}
                    data={data}
                  />
                )}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
