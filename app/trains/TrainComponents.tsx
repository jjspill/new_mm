import React from 'react';

export interface Location {
  lat: number;
  lng: number;
}

export interface Train {
  arrivalTime: string;
  routeId: string;
  tripId: string;
  stopId: string;
  destination: string;
}

export interface Station {
  stopName: string;
  stopId: string;
  distance: number;
  trains: Train[];
}

export interface ApiResponse {
  message: string;
  stops: Station[];
}

export const StationLoadingPlaceholder = () => (
  <div className="md:grid grid-cols-2 gap-x-4">
    {Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        className="mb-4 p-2 border rounded-md shadow bg-gray-200 animate-pulse"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-full bg-gray-300 rounded h-6"></div>{' '}
          <div className="w-2/3 bg-gray-300 rounded h-4"></div>{' '}
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center"
            >
              <div className="bg-gray-300 rounded-full h-8 w-8"></div>{' '}
              <div className="bg-gray-300 rounded h-4 w-1/4"></div>{' '}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

interface StationComponentProps {
  stations: Station[];
  trainComponentMap: { [key: string]: React.FC };
}

export const StationsComponent: React.FC<StationComponentProps> = ({
  stations,
  trainComponentMap,
}) => {
  return (
    <div className="md:grid grid-cols-2 gap-x-4">
      {stations.map((station, index) => (
        <div key={index}>
          {station.trains.length > 0 && (
            <div key={index} className="mb-4">
              <div className="flex flex-col text-center text-xl font-semibold bg-gray-200 p-2 rounded-md">
                {`${station.stopName} – ${station.stopId.endsWith('N') ? 'Northbound' : 'Southbound'}`}
                <span className="text-sm font-normal">
                  {station.distance.toFixed(2)} miles
                </span>
              </div>
              {station.trains.slice(0, 4).map((train, index) => {
                const TrainComponent = trainComponentMap[train.routeId] || null;

                const isLastTrain =
                  index === station.trains.length - 1 || index === 3;
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center ${!isLastTrain && 'border-b border-gray-300'} py-2`}
                  >
                    <div className="flex items-center pl-1">
                      {TrainComponent && <TrainComponent />}
                      {!TrainComponent && (
                        <UnknownTrainComponent routeId={train.routeId} />
                      )}
                      <div className="pl-2 text-sm">{train.destination}</div>
                    </div>
                    <div className="pr-1">
                      <span
                        className={`${
                          train.arrivalTime === 'arriving'
                            ? 'bg-red-100 text-red-800'
                            : train.arrivalTime.includes('minute') &&
                                parseInt(train.arrivalTime.split(' ')[0], 10) <
                                  5
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        } py-1 px-3 rounded-full text-sm`}
                      >
                        {train.arrivalTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface LocationButtonProps {
  onLocationFetch: {
    resetNearestStations: () => void;
    locations: (newLocation: Location) => void;
  };
  onError: (error: GeolocationPositionError) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  onLocationFetch,
  onError,
}) => {
  const handleFetchLocation = () => {
    onLocationFetch.resetNearestStations();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocationFetch.locations(location);
        },
        (error) => {
          onError(error);
        },
        { timeout: 10000 }, // Optional: Timeout after 10000 ms
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleFetchLocation}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Update Location
    </button>
  );
};

interface TrainMenuBarProps {
  ipLocation: boolean;
  radius: string | number;
  updateSearchRadius: (radius: string | number) => void;
  onRefresh: () => void;
}

export const TrainMenuBar: React.FC<
  TrainMenuBarProps & LocationButtonProps
> = ({
  ipLocation,
  radius,
  updateSearchRadius,
  onLocationFetch,
  onError,
  onRefresh,
}) => {
  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchRadius(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full pt-2">
      <div className="w-fit flex justify-center items-center bg-gray-200 rounded-md p-2 space-x-4">
        {/* <LocationButton onLocationFetch={onLocationFetch} onError={onError} /> */}
        {/* <button
          type="button"
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Refresh Data
        </button> */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-800">
            Search Radius:
          </span>
          <select
            value={radius}
            onChange={handleRadiusChange}
            className="bg-gray-200 rounded focus:outline-none focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none"
            title="Select a radius to search for trains within."
          >
            <option value="0.25">0.25 miles</option>
            <option value="0.5">0.5 miles</option>
            <option value="1">1 mile</option>
            <option value="Demo">Demo</option>
          </select>
        </div>
      </div>
      {ipLocation && radius !== 'Demo' && (
        <div className="text-sm text-gray-500 mt-2 text-center">
          Using IP location. Provide access to location services for more
          accurate results.
        </div>
      )}
      {radius === 'Demo' && (
        <div className="text-sm text-gray-500 mt-2 text-center">
          The demo location is set to Grand Central Terminal with a radius of
          0.25 miles.
        </div>
      )}
    </div>
  );
};

export const NComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">N</div>
  </div>
);

export const QComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">R</div>
  </div>
);

export const RComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">R</div>
  </div>
);

export const WComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">W</div>
  </div>
);

export const BComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">B</div>
  </div>
);

export const DComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">D</div>
  </div>
);

export const FComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">F</div>
  </div>
);

export const MComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">M</div>
  </div>
);

export const OneComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-red-500 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">1</div>
  </div>
);

export const TwoComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-red-500 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">2</div>
  </div>
);

export const ThreeComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-red-500 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">3</div>
  </div>
);

export const FourComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-green-600 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">4</div>
  </div>
);

export const FiveComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-green-600 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">5</div>
  </div>
);

export const SixComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-green-600 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">6</div>
  </div>
);

export const AComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-cyan-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">A</div>
  </div>
);

export const CComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-cyan-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">C</div>
  </div>
);

export const EComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-cyan-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">E</div>
  </div>
);

export const JComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-800 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">J</div>
  </div>
);

export const ZComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-800 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">Z</div>
  </div>
);

export const LComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-slate-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">L</div>
  </div>
);

export const SComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-slate-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">S</div>
  </div>
);

export const SevenComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-violet-400 cursor-pointer transition-all rounded-full">
    <div className="text-white text-2xl">7</div>
  </div>
);

export const UnknownTrainComponent: React.FC<{ routeId: string }> = ({
  routeId,
}) => (
  <div className="bg-slate-400 w-8 h-8 text-white rounded-full shadow-2xl flex justify-center items-center">
    {routeId}
  </div>
);

export const trainComponentMap: { [key: string]: React.FC } = {
  N: NComponent,
  Q: QComponent,
  R: RComponent,
  W: WComponent,
  B: BComponent,
  D: DComponent,
  F: FComponent,
  M: MComponent,
  '1': OneComponent,
  '2': TwoComponent,
  '3': ThreeComponent,
  '4': FourComponent,
  '5': FiveComponent,
  '6': SixComponent,
  A: AComponent,
  C: CComponent,
  E: EComponent,
  J: JComponent,
  Z: ZComponent,
  L: LComponent,
  S: SComponent,
  '7': SevenComponent,
};

export const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
  </div>
);
