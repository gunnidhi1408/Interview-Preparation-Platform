import React from 'react';
import Card from '../ui/Card';

const SkillsRadarChart: React.FC = () => {
  // This would typically be replaced with an actual chart library like Chart.js or Recharts
  // For this mockup, we'll create a simple visual representation
  
  const skills = [
    { name: 'Technical Knowledge', value: 80 },
    { name: 'Communication', value: 85 },
    { name: 'Problem Solving', value: 75 },
    { name: 'Confidence', value: 70 },
    { name: 'Relevance', value: 90 },
    { name: 'Adaptability', value: 65 },
  ];

  const maxRadius = 120;
  const centerX = 150;
  const centerY = 150;
  const angleStep = (2 * Math.PI) / skills.length;

  // Calculate polygon points for the skills graph
  const getPolygonPoints = (percentage: number) => {
    const radius = (maxRadius * percentage) / 100;
    
    return skills
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2; // Start at top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Calculate axis endpoints
  const getAxisEndpoints = () => {
    return skills.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start at top
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);
      return { x, y };
    });
  };

  const axisEndpoints = getAxisEndpoints();

  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold mb-4">Skills Assessment</h3>
      
      <div className="flex justify-center mb-4">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Background circles */}
          {[25, 50, 75, 100].map((percentage) => (
            <circle
              key={percentage}
              cx={centerX}
              cy={centerY}
              r={(maxRadius * percentage) / 100}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* Axis lines */}
          {axisEndpoints.map((point, i) => (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Skills polygon */}
          <polygon
            points={getPolygonPoints(100)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          
          <polygon
            points={skills
              .map((skill, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const radius = (maxRadius * skill.value) / 100;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(' ')}
            fill="rgba(10, 36, 99, 0.2)"
            stroke="#0A2463"
            strokeWidth="2"
          />

          {/* Data points */}
          {skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const radius = (maxRadius * skill.value) / 100;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#0A2463"
              />
            );
          })}

          {/* Skill labels */}
          {skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const radius = maxRadius + 20;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            const textAnchor = 
              (angle > Math.PI / 4 && angle < 3 * Math.PI / 4) ? 'start' :
              (angle > -3 * Math.PI / 4 && angle < -Math.PI / 4) ? 'end' : 'middle';
            
            const dy = 
              (angle > -Math.PI / 4 && angle < Math.PI / 4) ? '-0.5em' :
              (angle > 3 * Math.PI / 4 || angle < -3 * Math.PI / 4) ? '1em' : '0.3em';
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={textAnchor}
                dy={dy}
                fontSize="10"
                fontWeight="500"
              >
                {skill.name}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full bg-primary mr-2"
            ></div>
            <div>
              <div className="text-sm font-medium">{skill.name}</div>
              <div className="text-xs text-gray-500">{skill.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkillsRadarChart;