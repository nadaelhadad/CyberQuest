import React from 'react';
import { motion } from 'framer-motion';

// Extended mesh: more nodes on the left and more edges for completeness
const nodes = [
  // Row 0 (upper left corner)
  { x: 0, y: 0 }, { x: 30, y: 5 }, { x: 60, y: 0 },
  // Row 1
  { x: 10, y: 20 }, { x: 50, y: 15 }, { x: 90, y: 30 }, { x: 130, y: 18 }, { x: 170, y: 25 }, { x: 210, y: 10 }, { x: 250, y: 22 }, { x: 290, y: 12 }, { x: 330, y: 28 }, { x: 350, y: 20 },
  // Row 2
  { x: 0, y: 45 }, { x: 30, y: 60 }, { x: 70, y: 55 }, { x: 110, y: 70 }, { x: 150, y: 60 }, { x: 190, y: 75 }, { x: 230, y: 55 }, { x: 270, y: 65 }, { x: 310, y: 60 }, { x: 340, y: 70 },
  // Row 3
  { x: 0, y: 90 }, { x: 20, y: 110 }, { x: 60, y: 100 }, { x: 100, y: 120 }, { x: 140, y: 110 }, { x: 180, y: 130 }, { x: 220, y: 105 }, { x: 260, y: 120 }, { x: 300, y: 110 }, { x: 340, y: 120 },
  // Row 4
  { x: 0, y: 140 }, { x: 40, y: 160 }, { x: 80, y: 150 }, { x: 120, y: 170 }, { x: 160, y: 160 }, { x: 200, y: 175 }, { x: 240, y: 150 }, { x: 280, y: 170 }, { x: 320, y: 160 }, { x: 350, y: 170 },
  // Row 5
  { x: 0, y: 190 }, { x: 10, y: 210 }, { x: 50, y: 200 }, { x: 90, y: 220 }, { x: 130, y: 210 }, { x: 170, y: 230 }, { x: 210, y: 205 }, { x: 250, y: 220 }, { x: 290, y: 210 }, { x: 330, y: 225 }, { x: 350, y: 210 },
  // Row 6 (bottom left)
  { x: 0, y: 250 }, { x: 20, y: 270 }, { x: 60, y: 260 }, { x: 100, y: 285 }, { x: 140, y: 275 }, { x: 180, y: 295 }, { x: 220, y: 265 }, { x: 260, y: 290 }, { x: 300, y: 275 }, { x: 340, y: 295 }, { x: 355, y: 280 },
  // Row 7 (very bottom)
  { x: 0, y: 320 }, { x: 10, y: 340 }, { x: 50, y: 330 }, { x: 90, y: 350 }, { x: 130, y: 340 }, { x: 170, y: 355 }, { x: 210, y: 335 }, { x: 250, y: 350 }, { x: 290, y: 340 }, { x: 330, y: 355 }, { x: 350, y: 340 },
];

const edges: number[][] = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Increase threshold for leftmost and bottom nodes
    const isLeft = nodes[i].x === 0 || nodes[j].x === 0;
    const isBottom = nodes[i].y > 250 || nodes[j].y > 250;
    let threshold = 55;
    if (isLeft) threshold = 70;
    if (isBottom) threshold = Math.max(threshold, 85);
    if (dist < threshold) {
      edges.push([i, j]);
    }
  }
}

const width = 360;
const height = 370;

const MeshBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Animated lines */}
        {edges.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="#7dd3fc"
            strokeWidth="1.1"
            strokeOpacity={0.28}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 2.5 + (i % 5), repeat: Infinity, repeatType: 'reverse', delay: i * 0.07 }}
          />
        ))}
        {/* Animated dots */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={2.5}
            fill="#7dd3fc"
            fillOpacity={0.45}
            initial={{ r: 2.5, opacity: 0.45 }}
            animate={{ r: [2.5, 4, 2.5], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, repeatType: 'reverse', delay: i * 0.09 }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-cyber-dark/80" />
    </div>
  );
};

export default MeshBackground; 