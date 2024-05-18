'use client';

import React from 'react';

const convertUTCDateToLocalDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-US', { timeZoneName: 'short' });
};

export function UpdatedTime({ date }: { date: string }) {
  const convertedTime = React.useMemo(
    () => convertUTCDateToLocalDate(date),
    [date],
  );

  return <span className="text-sm">{convertedTime}</span>;
}
