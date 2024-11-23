import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { AssessmentResult } from '@/types/assessment';

interface AssessmentReportProps {
  results: AssessmentResult;
}

export const AssessmentReport = ({ results }: AssessmentReportProps) => {
  // Transform the data for the DISC chart
  const discData = [
    {
      dimension: 'D',
      Natural: results.overall_profile.naturalStyle.D,
      Adaptive: results.overall_profile.adaptiveStyle.D
    },
    {
      dimension: 'I',
      Natural: results.overall_profile.naturalStyle.I,
      Adaptive: results.overall_profile.adaptiveStyle.I
    },
    {
      dimension: 'S',
      Natural: results.overall_profile.naturalStyle.S,
      Adaptive: results.overall_profile.adaptiveStyle.S
    },
    {
      dimension: 'C',
      Natural: results.overall_profile.naturalStyle.C,
      Adaptive: results.overall_profile.adaptiveStyle.C
    }
  ];

  // Transform dimensional balance data for the radar chart
  const dimensionalData = [
    {
      attribute: 'Empathy',
      value: results.dimensional_balance.external.empathy
    },
    {
      attribute: 'Practical Thinking',
      value: results.dimensional_balance.external.practicalThinking
    },
    {
      attribute: 'Systems Judgment',
      value: results.dimensional_balance.external.systemsJudgment
    },
    {
      attribute: 'Self Esteem',
      value: results.dimensional_balance.internal.selfEsteem
    },
    {
      attribute: 'Role Awareness',
      value: results.dimensional_balance.internal.roleAwareness
    },
    {
      attribute: 'Self Direction',
      value: results.dimensional_balance.internal.selfDirection
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* DISC Profile */}
      <Card>
        <CardHeader>
          <CardTitle>DISC Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={discData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dimension" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Natural" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="Adaptive" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dimensional Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Dimensional Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dimensionalData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="attribute" />
                <PolarRadiusAxis />
                <Radar
                  name="Balance"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Category Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.scores.map((score, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{score.category}</h3>
                  <span className="text-sm text-gray-500">{score.level}</span>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(score.score / 10) * 100}%` }}
                    />
                  </div>
                  <ul className="text-sm text-gray-600 list-disc pl-5">
                    {score.insights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};