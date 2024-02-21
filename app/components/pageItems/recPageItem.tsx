export default function RecPageItem({ bgColor = 'bg-gray-100' }) {
  return (
    <div className="flex flex-grow min-h-40">
      <div
        className={`flex flex-col w-full py-4 px-2 my-2 ${bgColor} shadow-lg rounded-2xl`}
      >
        <h1>Rec Page Item</h1>
      </div>
    </div>
  );
}
