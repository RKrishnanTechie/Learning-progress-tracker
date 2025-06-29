'use client';

import { useState } from 'react';

export function StreakCounter() {
  const [streak, setStreak] = useState(7);

  const incrementStreak = () => {
    setStreak(streak + 1);
    alert(`Great! Your streak is now ${streak + 1} days!`);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 className="font-semibold text-yellow-800 mb-2">Update Your Streak</h3>
      <p className="text-yellow-700 mb-3">Current streak: {streak} days</p>
      <button
        onClick={incrementStreak}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        🔥 Add Day to Streak
      </button>
    </div>
  );
}