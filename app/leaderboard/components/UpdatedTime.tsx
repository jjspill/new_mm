'use client';

const convertUTCDateToLocalDate = (date: string): string => {
  const newDate = new Date(date);
  const offset = newDate.getTimezoneOffset();
  const localDate = new Date(newDate.getTime() - offset * 60 * 1000);
  return localDate.toString();
};

export function UpdatedTime({ date }: { date: string }) {
  return <span className="text-sm">{convertUTCDateToLocalDate(date)}</span>;
}
