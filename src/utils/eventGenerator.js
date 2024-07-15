const events = [
    {
      id: 'avalanche',
      title: 'Avalanche Warning',
      description: 'There are signs of potential avalanche activity ahead.',
      effect: 'Proceed cautiously or wait it out?',
    },
    {
      id: 'equipment_failure',
      title: 'Equipment Malfunction',
      description: 'One of your crucial pieces of equipment has malfunctioned.',
      effect: 'Attempt a repair or continue without it?',
    },
    {
      id: 'rescue_mission',
      title: 'Rescue Mission',
      description: 'You encounter a stranded climber in need of assistance.',
      effect: 'Help the climber or continue your ascent?',
    },
    {
      id: 'unexpected_storm',
      title: 'Unexpected Storm',
      description: 'A sudden storm is approaching your location.',
      effect: 'Seek shelter or push through the storm?',
    },
    {
      id: 'altitude_sickness',
      title: 'Altitude Sickness',
      description: 'You are experiencing symptoms of altitude sickness.',
      effect: 'Rest and acclimatize or continue climbing?',
    },
  ];
  
  export const eventGenerator = {
    generateEvent: (gameState) => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      return {
        ...randomEvent,
        id: `${randomEvent.id}_${Date.now()}`, // Ensure unique ID for each event instance
      };
    },
  };
  