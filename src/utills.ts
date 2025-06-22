import { Timestamp } from "firebase/firestore";
export const parseDate = (str: string) => {
  const [datePart, timePart] = str.split(", ");
  const [day, month, year] = datePart.split(".");
  return new Date(`${year}-${month}-${day}T${timePart}`);
};

export const formatFireStoreTimestamp = (timestamp: unknown): string => {
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  console.warn("Date is not a Timestamp object:", timestamp);
  return "";
};
