import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { parseDate } from "@internationalized/date";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getParsedLocalDate = (dateString: string) => {
    const utcDate = dayjs.utc(dateString);
    const localDate = utcDate.local().format('YYYY-MM-DD');
    return parseDate(localDate);
};
