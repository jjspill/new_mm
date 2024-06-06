'use client';

// components/LocationPrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  TrainMenuBar,
  Location,
  StationsComponent,
  StationLoadingPlaceholder,
  TrainSymbolsDisplay,
} from './TrainComponents';
import {
  useContinuousCountdown,
  useGeolocation,
  useNearestStations,
  useTrainData,
} from './TrainHooks';

const TrainsContainer: React.FC = () => {
  const [searchRadius, setSearchRadius] = useState<string | number>(0.5);

  // hooks
  const { timer, refreshCounter } = useContinuousCountdown();
  const { location, ipLocation } = useGeolocation();
  const { nearestStations } = useNearestStations(location, searchRadius);

  const refreshData = () => {
    // if (location) {
    //   setNearestStations([]);
    //   setRefreshCounter(refreshCounter + 1);
    // }
  };

  const updateSearchRadius = (radius: string | number) => {
    setSearchRadius(radius);
  };

  const updateLocation = {
    resetNearestStations: () => {
      // setNearestStations([]);
    },
    locations: (newLocation: Location) => {
      // saveLocation(newLocation);
      // setLocation(newLocation);
    },
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-20 bg-black text-center font-bold text-white py-12 font-sans">
        <div className="min-h-[2px] w-[80%] bg-white"></div>
        <div className="flex">
          {/* <TrainSymbolsDisplay side="left" /> */}
          <div className="text-4xl px-4">Subway</div>
          {/* <TrainSymbolsDisplay side="right" /> */}
        </div>
        <TrainSymbolsDisplay />
      </div>
      <div
        style={{
          width: `${(timer / 15) * 100}%`,
          height: '5px',
          backgroundColor: 'rgb(156 163 175)',
          transition: 'width 1s linear',
        }}
      />
      <TrainMenuBar
        radius={searchRadius}
        ipLocation={ipLocation}
        updateSearchRadius={updateSearchRadius}
        onRefresh={refreshData}
        onLocationFetch={updateLocation}
        onError={(error) => {
          console.error('Error getting location: ', error);
        }}
      />
      <div className="w-full p-4 pb-0">
        {location && (
          <StationsComponent
            stations={nearestStations}
            refreshCounter={refreshCounter}
          />
        )}
        {!location && <StationLoadingPlaceholder />}
      </div>
    </div>
  );
};

export default TrainsContainer;
