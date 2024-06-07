// components/LocationPrompt.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  TrainMenuBar,
  Location,
  TrainSymbolsDisplay,
  TrainCarousel,
  AsyncStationComponent,
} from './TrainComponents';
import {
  useContinuousCountdown,
  useGeolocationWithCache,
  useNearestStations,
} from './TrainHooks';

const TrainsContainer: React.FC = () => {
  const [searchRadius, setSearchRadius] = useState<string | number>(0.5);

  // hooks
  const { timer, refreshCounter } = useContinuousCountdown();
  const { location, locationStatus } = useGeolocationWithCache();
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
    <div className="flex justify-center items-start pt-20 px-4 pb-4">
      {/* <div className="bg-white w-[200px] h-[400px]"></div> */}
      <div className="min-h-[100vh] bg-[#FFEDD5] shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col justify-center items-center w-full min-h-20 h-fit bg-black text-center font-bold text-white py-2 font-sans">
          <div className="min-h-[2px] w-[90%] md:w-[80%] bg-white"></div>
          <div className="flex">
            <div className="text-4xl px-4">Subway</div>
          </div>
          <div className="block md:hidden">
            <TrainCarousel />
          </div>
          <div className="hidden md:block">
            <TrainSymbolsDisplay />
          </div>
        </div>
        {/* <div
          style={{
            width: `${(timer / 15) * 100}%`,
            height: '5px',
            backgroundColor: 'rgb(156 163 175)',
            transition: 'width 1s linear',
          }}
        /> */}
        <TrainMenuBar
          radius={searchRadius}
          updateSearchRadius={updateSearchRadius}
          onRefresh={refreshData}
          onLocationFetch={updateLocation}
          onError={(error) => console.error('Error getting location: ', error)}
        />
        <div className="w-full p-4 pb-0">
          {locationStatus === 'ACQUIRING' && (
            <div className="text-center text-gray-500">
              Acquiring location, please hold on...
            </div>
          )}
          {locationStatus === 'NOT_FOUND' && (
            <div className="text-center text-gray-500">
              Location not found. Please enable location services.
            </div>
          )}
          {locationStatus === 'FOUND' &&
            nearestStations.length > 0 &&
            nearestStations.map((station, index) => (
              <AsyncStationComponent
                key={index}
                stationIn={station}
                refreshCounter={refreshCounter}
              />
            ))}
          {locationStatus === 'FOUND' && nearestStations.length === 0 && (
            <div className="text-center text-gray-500">
              No nearby stations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainsContainer;
