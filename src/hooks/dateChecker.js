import { differenceInMonths, parseISO } from 'date-fns';

function isOverAYearOld(dateString) {
    // parseISO converts "2025-07-10" to a Date object
    const inputDate = parseISO(dateString);
    const now = new Date();

    const diffInMonths = differenceInMonths(now, inputDate);

    return diffInMonths >= 12;
}




export default isOverAYearOld;
