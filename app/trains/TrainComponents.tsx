import React from 'react';

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
