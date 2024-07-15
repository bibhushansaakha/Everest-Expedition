export const scoreCalculator = {
    calculateScore: (gameState) => {
      let score = 0;
  
      // Points for altitude reached
      score += Math.floor(gameState.altitude / 100) * 10;
  
      // Points for efficient resource management
      score += (gameState.oxygen + gameState.energy) * 2;
  
      // Points for each day of survival
      score += gameState.day * 5;
  
      // Bonus points for reaching certain milestones
      if (gameState.altitude >= 5000) score += 100;
      if (gameState.altitude >= 7000) score += 250;
      if (gameState.altitude >= 8848) score += 1000; // Summit bonus
  
      // Deductions for altitude sickness
      score -= gameState.altitudeSickness * 5;
  
      // Ensure the score is not negative
      return Math.max(0, score);
    },
  };
  