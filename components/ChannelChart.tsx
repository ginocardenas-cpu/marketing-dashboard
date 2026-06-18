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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: TimeSeriesPoint; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="max-w-[220px] rounded-lg border border-border bg-card p-3 text-sm shadow-md">
      <p className="font-semibold text-foreground">{point.date}</p>
      <p className="mt-1 tabular-nums text-foreground">{point.value.toLocaleString()}</p>
      {point.annotation && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {point.annotation.direction === "up" ? "↑" : "↓"} {point.annotation.text}
        </p>
      )}
    </div>
  );
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
  const labelColor = point.annotation.direction === "up" ? "text-primary" : "text-destructive";

  return (
    <g>
      <foreignObject
        x={centerX - 72}
        y={y - 58}
        width={144}
        height={54}
        className="overflow-visible"
      >
        <div className="flex flex-col items-center text-center">
          <span className={`text-[11px] font-semibold ${labelColor}`}>
            {point.date} {arrow}
          </span>
          <span className="mt-0.5 line-clamp-3 text-[9px] leading-tight text-muted-foreground">
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
    <div className={`w-full ${hasAnnotations ? "h-[300px]" : "h-[260px]"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: hasAnnotations ? 64 : 8, right: 8, left: 0, bottom: 0 }}
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
          <Tooltip content={<CustomTooltip />} />
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
