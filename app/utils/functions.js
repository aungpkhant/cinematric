import { format } from "date-fns";

export const formatDateTimeToHumanReadable = (isoDateString) => {
  return format(new Date(isoDateString), "MMM dd yyyy 'at' h:mmaaa");
};
