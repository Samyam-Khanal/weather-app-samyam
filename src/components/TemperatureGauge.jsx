const MIN_C = -20;
const MAX_C = 50;
const CENTER_X = 130;
const CENTER_Y = 132;
const RADIUS = 108;
const NEEDLE_RADIUS = 92;

function angleForValue(celsius) {
  const clamped = Math.max(MIN_C, Math.min(MAX_C, celsius));
  const fraction = (clamped - MIN_C) / (MAX_C - MIN_C);
  return Math.PI - fraction * Math.PI;
}

function pointOnArc(angle, radius) {
  return {
    x: CENTER_X + radius * Math.cos(angle),
    y: CENTER_Y - radius * Math.sin(angle),
  };
}

const TICK_VALUES = [-20, -10, 0, 10, 20, 30, 40, 50];

export default function TemperatureGauge({ celsius, loading }) {
  const hasReading = typeof celsius === 'number' && !loading;
  const needleAngle = angleForValue(hasReading ? celsius : MIN_C);
  const needleTip = pointOnArc(needleAngle, NEEDLE_RADIUS);
  const arcStart = pointOnArc(Math.PI, RADIUS);
  const arcEnd = pointOnArc(0, RADIUS);

  return (
    <svg
      viewBox="0 0 260 150"
      role="img"
      aria-label={
        hasReading
          ? `Gauge showing ${Math.round(celsius)} degrees Celsius`
          : 'Temperature gauge, no reading yet'
      }
      className="gauge"
    >
      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${RADIUS} ${RADIUS} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
        className="gauge-track"
        fill="none"
      />
      {TICK_VALUES.map((val) => {
        const angle = angleForValue(val);
        const inner = pointOnArc(angle, RADIUS - 10);
        const outer = pointOnArc(angle, RADIUS);
        const labelPt = pointOnArc(angle, RADIUS - 22);
        return (
          <g key={val}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              className="gauge-tick"
            />
            <text x={labelPt.x} y={labelPt.y} className="gauge-tick-label">
              {val}
            </text>
          </g>
        );
      })}
      <line
        x1={CENTER_X}
        y1={CENTER_Y}
        x2={needleTip.x}
        y2={needleTip.y}
        className={`gauge-needle ${loading ? 'is-loading' : ''}`}
      />
      <circle cx={CENTER_X} cy={CENTER_Y} r="6" className="gauge-hub" />
    </svg>
  );
}