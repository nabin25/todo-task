type TimeUnit = 'minutes' | 'hours' | 'days';

export function getRelativeTime(dueDate: Date | string): string {
  const now = new Date();
  const target = new Date(dueDate);
  const diffMs = target.getTime() - now.getTime();
  const absDiffMs = Math.abs(diffMs);

  const minutes = Math.round(absDiffMs / (1000 * 60));
  const hours = Math.round(absDiffMs / (1000 * 60 * 60));
  const days = Math.round(absDiffMs / (1000 * 60 * 60 * 24));

  let value: number;
  let unit: TimeUnit;

  if (minutes < 60) {
    unit = 'minutes';
    value = minutes;
  } else if (hours < 24) {
    unit = 'hours';
    value = hours;
  } else {
    unit = 'days';
    value = days;
  }

  const label = diffMs >= 0 ? 'Due in' : 'Overdue by';
  return `${label} ${value} ${unit}`;
}
