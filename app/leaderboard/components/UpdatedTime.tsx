'use client';

const convertUTCDateToLocalDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-US', { timeZoneName: 'short' });
};

export function UpdatedTime({ date }: { date: string }) {
  return <span className="text-sm">{convertUTCDateToLocalDate(date)}</span>;
}
