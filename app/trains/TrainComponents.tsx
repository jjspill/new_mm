import React from 'react';
import { useStation } from './TrainHooks';

export interface Location {
  lat: number;
  lng: number;
}

export interface Train {
  arrival_time: string;
  route_id: string;
  trip_id: string;
  stop_id: string;
  destination: string;
}

export interface Station {
  stopName: string;
  n_headsign: string;
  s_headsign: string;
  stopId: string;
  distance: number;
  n_trains: Train[];
  s_trains: Train[];
}

export interface ApiResponse {
  message: string;
  stops: Station[];
}

// suspense for stations
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

// conjoined station header, for desktop view when stations are grouped horizontally
export const ConjoinedStationDetails = ({ station }: { station: Station }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-col text-center text-xl font-semibold bg-black text-white p-2 rounded-md">
        <div className="flex flex-col justify-center items-center space-x-2">
          <div className="h-[2px] w-full bg-white"></div>
          <span>{station.stopName} Station</span>
          <div className="grid grid-cols-2 gap-x-4 w-full">
            <div className="flex items-center justify-center space-x-2">
              <span>{station.n_headsign}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>{station.s_headsign}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// station header for mobile, north and southbound stations are isolated
const StationDetailsComponent = ({
  stopName,
  headsign,
}: {
  stopName: string;
  headsign: string;
}) => (
  <div className="flex flex-col text-center text-xl font-semibold bg-black text-white p-2 rounded-md">
    <div className="h-[2px] w-full bg-white"></div>
    <span>{stopName}</span>
    <div className="flex items-center justify-center space-x-2">
      <span>{headsign}</span>
    </div>
  </div>
);

interface StationProps {
  stationIn: Station;
  refreshCounter: number;
}

// async station component, fetches train data for a single station
export const AsyncStationComponent: React.FC<StationProps> = ({
  stationIn,
  refreshCounter,
}) => {
  const station = useStation(stationIn, refreshCounter);

  if (
    station === undefined ||
    (station?.n_trains.length === 0 && station?.s_trains.length === 0)
  ) {
    return <StationLoadingPlaceholder />;
  }
  // } else if (station.n_trains.length === 0 && station.s_trains.length === 0) {
  //   return;
  // }

  return (
    <div className="font-sans">
      <div className="block md:hidden">
        <div>
          <StationDetailsComponent
            stopName={station.stopName}
            headsign={station.n_headsign}
          />
          <TrainComponent trains={station.n_trains} />
        </div>
        <div>
          <StationDetailsComponent
            stopName={station.stopName}
            headsign={station.s_headsign}
          />
          <TrainComponent trains={station.s_trains} />
        </div>
      </div>
      <div className="hidden md:block">
        <ConjoinedStationDetails station={station} />
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <TrainComponent trains={station.n_trains} />
          </div>
          <div>
            <TrainComponent trains={station.s_trains} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TrainComponentProps {
  trains: Train[];
  // trainSymbolMap: { [key: string]: React.FC };
}

// train component, displays train data for a single station
export const TrainComponent: React.FC<TrainComponentProps> = ({ trains }) => {
  return trains.slice(0, 4).map((train, index) => {
    const TrainComponent = trainSymbolMap[train.route_id] || null;

    const isLastTrain = index === trains.length - 1 || index === 3;
    return (
      <div
        key={index}
        className={`flex justify-between items-center ${!isLastTrain && 'border-b border-black'} ${isLastTrain && 'pb-4'} py-2`}
      >
        <div className="flex items-center pl-1">
          {TrainComponent && <TrainComponent />}
          {!TrainComponent && (
            <UnknownTrainComponent routeId={train.route_id} />
          )}
          <div className="pl-2 text-sm">{train.destination}</div>
        </div>
        <div className="pr-1">
          <span
            className={`${
              train.arrival_time === 'arriving'
                ? 'bg-red-100 text-red-800'
                : train.arrival_time.includes('minute') &&
                    parseInt(train.arrival_time.split(' ')[0], 10) < 5
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
            } py-1 px-3 rounded-full text-sm`}
          >
            {train.arrival_time}
          </span>
        </div>
      </div>
    );
  });
};

interface StationComponentProps {
  stations: Station[];
  refreshCounter: number;
}

// maps all stations to async station components
export const StationsComponent: React.FC<StationComponentProps> = ({
  stations,
  refreshCounter,
}) => {
  return (
    <div className="">
      {stations &&
        stations.map((station, index) => (
          <AsyncStationComponent
            key={index}
            stationIn={station}
            refreshCounter={refreshCounter}
          />
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
    <div className="flex flex-col items-center w-full">
      {' '}
      {/* pt-2 */}
      {/* <div className="w-fit flex justify-center items-center bg-gray-200 rounded-md p-2 space-x-4">
        <LocationButton onLocationFetch={onLocationFetch} onError={onError} />
        <button
          type="button"
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Refresh Data
        </button>
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
      </div> */}
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
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400  transition-all rounded-full">
    <div className="text-white text-2xl">N</div>
  </div>
);

export const QComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400  transition-all rounded-full">
    <div className="text-white text-2xl">Q</div>
  </div>
);

export const RComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400  transition-all rounded-full">
    <div className="text-white text-2xl">R</div>
  </div>
);

export const WComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-400  transition-all rounded-full">
    <div className="text-white text-2xl">W</div>
  </div>
);

export const BComponent: React.FC = () => (
  <div className="flex items-center justify-center  w-8 h-8 bg-orange-400  transition-all rounded-full">
    <div className="text-white text-2xl">B</div>
  </div>
);

export const DComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400  transition-all rounded-full">
    <div className="text-white text-2xl">D</div>
  </div>
);

export const FComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400  transition-all rounded-full">
    <div className="text-white text-2xl">F</div>
  </div>
);

export const MComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-orange-400  transition-all rounded-full">
    <div className="text-white text-2xl">M</div>
  </div>
);

export const OneComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-red-500  transition-all rounded-full">
    <div className="text-white text-2xl">1</div>
  </div>
);

export const TwoComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-red-500  transition-all rounded-full">
    <div className="text-white text-2xl">2</div>
  </div>
);

export const ThreeComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-red-500  transition-all rounded-full">
    <div className="text-white text-2xl">3</div>
  </div>
);

export const FourComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-green-600  transition-all rounded-full">
    <div className="text-white text-2xl">4</div>
  </div>
);

export const FiveComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-green-600  transition-all rounded-full">
    <div className="text-white text-2xl">5</div>
  </div>
);

export const SixComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-green-600  transition-all rounded-full">
    <div className="text-white text-2xl">6</div>
  </div>
);

export const AComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-cyan-400  transition-all rounded-full">
    <div className="text-white text-2xl">A</div>
  </div>
);

export const CComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-cyan-400  transition-all rounded-full">
    <div className="text-white text-2xl">C</div>
  </div>
);

export const EComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-cyan-400  transition-all rounded-full">
    <div className="text-white text-2xl">E</div>
  </div>
);

export const JComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-800  transition-all rounded-full">
    <div className="text-white text-2xl">J</div>
  </div>
);

export const ZComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-yellow-800  transition-all rounded-full">
    <div className="text-white text-2xl">Z</div>
  </div>
);

export const LComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-slate-400  transition-all rounded-full">
    <div className="text-white text-2xl">L</div>
  </div>
);

export const SComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-slate-400  transition-all rounded-full">
    <div className="text-white text-2xl">S</div>
  </div>
);

export const SevenComponent: React.FC = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-violet-400  transition-all rounded-full">
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

// map of train symbols to components
export const trainSymbolMap: { [key: string]: React.FC } = {
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

export const TrainSymbolsDisplay = ({
  side,
}: {
  side?: string | undefined;
}) => {
  const keys = Object.keys(trainSymbolMap);
  const middleIndex = Math.ceil(keys.length / 2);

  const LeftLogos = keys.slice(0, middleIndex).map((key) => {
    const TrainLogo = trainSymbolMap[key];
    return <TrainLogo key={key} />;
  });

  const RightLogos = keys.slice(middleIndex).map((key) => {
    const TrainLogo = trainSymbolMap[key];
    return <TrainLogo key={key} />;
  });

  if (side === 'left') {
    return <div className="flex items-center">{LeftLogos}</div>;
  } else if (side === 'right') {
    return <div className="flex items-center">{RightLogos}</div>;
  } else {
    return (
      <div className="flex space-x-1">
        <div className="flex items-center space-x-1">{LeftLogos}</div>
        <div className="flex items-center space-x-1">{RightLogos}</div>
      </div>
    );
  }
};

const animationStyle = {
  animation: 'scroll 30s linear infinite',
  '@keyframes scroll': {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
  },
};

export const TrainCarousel: React.FC = () => {
  const TrainComponents = [
    NComponent,
    QComponent,
    RComponent,
    WComponent,
    BComponent,
    DComponent,
    FComponent,
    MComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    FourComponent,
    FiveComponent,
    SixComponent,
    AComponent,
    CComponent,
    EComponent,
    JComponent,
    ZComponent,
    LComponent,
    SComponent,
    SevenComponent,
  ];

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
        `}
      </style>
      <div className="overflow-hidden">
        <div
          className="flex space-x-4 whitespace-nowrap"
          style={{ animation: 'scroll 30s linear infinite' }}
        >
          {TrainComponents.map((Component, index) => (
            <Component key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
