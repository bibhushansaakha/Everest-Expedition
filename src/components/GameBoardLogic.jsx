// GameBoardLogic.jsx
import React, { useState, useEffect } from 'react';
import { gameLogic } from '../utils/gameLogic';
import { weatherGenerator } from '../utils/weatherGenerator';
import { eventGenerator } from '../utils/eventGenerator';
import { scoreCalculator } from '../utils/scoreCalculator';

const initialState = {
  altitude: 0,
  oxygen: 100,
  energy: 100,
  currentDay: 1,
  weatherConditions: weatherGenerator.generateInitialConditions(),
  randomEvents: [],
  selectedRoute: null,
  equippedItems: [],
  encounters: [],
  altitudeSicknessLevel: 0,
  isGameOver: false,
  finalScore: 0,
  gameOverReason: null,
  score: 0,
};

export default function GameBoardLogic({ children }) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    setGameState(initialState);
  }, []);

  useEffect(() => {
    if (!gameState) return;

    const intervalId = setInterval(() => {
      setGameState((prevState) => ({
        ...prevState,
        randomEvents: [...prevState.randomEvents, eventGenerator.generateRandomEvent()],
      }));
    }, 30000);

    return () => clearInterval(intervalId);
  }, [gameState]);

  useEffect(() => {
    if (!gameState) return;

    if (gameState.currentDay % 5 === 0) {
      setGameState((prevState) => ({
        ...prevState,
        weatherConditions: weatherGenerator.updateWeatherConditions(prevState.weatherConditions),
      }));
    }

    const gameOverReason = checkGameOver();
    if (gameOverReason) {
      setGameState((prevState) => ({
        ...prevState,
        isGameOver: true,
        gameOverReason,
        finalScore: scoreCalculator.calculateScore(prevState),
      }));
    }

    setGameState((prevState) => ({
      ...prevState,
      score: scoreCalculator.calculateScore(prevState),
    }));
  }, [gameState?.currentDay, gameState?.altitude, gameState?.oxygen, gameState?.energy]);

  function handleClimb() {
    if (!gameState || gameState.isGameOver) return;

    setGameState((prevState) => {
      const routeInfo = gameLogic.getSelectedRoute(prevState.selectedRoute);
      const { altitudeGain, oxygenConsumption, energyConsumption } = gameLogic.calculateClimbingImpact(
        prevState.weatherConditions,
        routeInfo,
        prevState.equippedItems
      );

      return {
        ...prevState,
        altitude: prevState.altitude + altitudeGain,
        oxygen: Math.max(0, prevState.oxygen - oxygenConsumption),
        energy: Math.max(0, prevState.energy - energyConsumption),
        currentDay: prevState.currentDay + 1,
        altitudeSicknessLevel: gameLogic.calculateAltitudeSickness(prevState.altitude + altitudeGain, prevState.altitudeSicknessLevel),
      };
    });
  }

  function handleRest() {
    if (!gameState || gameState.isGameOver) return;

    setGameState((prevState) => ({
      ...prevState,
      oxygen: Math.min(100, prevState.oxygen + 20),
      energy: Math.min(100, prevState.energy + 20),
      currentDay: prevState.currentDay + 1,
      altitudeSicknessLevel: Math.max(0, prevState.altitudeSicknessLevel - 1),
    }));
  }

  function handleRandomEvent(event) {
    if (!gameState || gameState.isGameOver) return;

    setGameState((prevState) => {
      const updatedState = gameLogic.applyEventEffect(event, prevState);
      return {
        ...updatedState,
        randomEvents: prevState.randomEvents.filter((e) => e !== event),
      };
    });
  }

  function handleRouteSelection(route) {
    if (!gameState) return;

    setGameState((prevState) => ({
      ...prevState,
      selectedRoute: route,
    }));
  }

  function handleEquipmentChange(item, action) {
    if (!gameState) return;

    setGameState((prevState) => {
      let updatedEquippedItems;
      if (action === 'equip') {
        updatedEquippedItems = [...prevState.equippedItems, item];
      } else {
        updatedEquippedItems = prevState.equippedItems.filter((i) => i !== item);
      }

      return {
        ...prevState,
        equippedItems: updatedEquippedItems,
      };
    });
  }

  function checkGameOver() {
    if (!gameState) return null;

    if (gameState.altitude >= 8848) return 'summit_reached';
    if (gameState.oxygen <= 0) return 'out_of_oxygen';
    if (gameState.energy <= 0) return 'exhausted';
    if (gameState.altitudeSicknessLevel >= 10) return 'altitude_sickness';
    return null;
  }

  const handlers = {
    handleClimb,
    handleRest,
    handleRandomEvent,
    handleRouteSelection,
    handleEquipmentChange,
  };

  return children(gameState, handlers);
}
