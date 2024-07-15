export const gameLogic = {
    climb: (gameState) => {
      const altitudeGain = Math.floor(Math.random() * (300 - 100 + 1) + 100);
      const oxygenLoss = Math.floor(Math.random() * (15 - 5 + 1) + 5);
      const energyLoss = Math.floor(Math.random() * (20 - 10 + 1) + 10);
  
      return {
        altitude: gameState.altitude + altitudeGain,
        oxygen: Math.max(0, gameState.oxygen - oxygenLoss),
        energy: Math.max(0, gameState.energy - energyLoss),
        day: gameState.day + 1,
      };
    },
  
    rest: (gameState) => {
      const oxygenGain = Math.floor(Math.random() * (20 - 10 + 1) + 10);
      const energyGain = Math.floor(Math.random() * (30 - 15 + 1) + 15);
  
      return {
        oxygen: Math.min(100, gameState.oxygen + oxygenGain),
        energy: Math.min(100, gameState.energy + energyGain),
        day: gameState.day + 1,
      };
    },
  
    resolveEvent: (gameState, event) => {
      // Implement event resolution logic here
      // This is a placeholder and should be expanded based on your game's events
      return {
        ...gameState,
        // Apply event effects to gameState
      };
    },
  
    checkGameOver: (gameState) => {
      if (gameState.altitude >= 8848) {
        return { isGameOver: true, reason: 'summit_reached' };
      }
      if (gameState.oxygen <= 0) {
        return { isGameOver: true, reason: 'out_of_oxygen' };
      }
      if (gameState.energy <= 0) {
        return { isGameOver: true, reason: 'exhausted' };
      }
      if (gameState.altitudeSickness >= 100) {
        return { isGameOver: true, reason: 'altitude_sickness' };
      }
      return { isGameOver: false };
    },
  };
  