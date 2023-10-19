// ###############################################################

import { NoteProps } from "../shared/types/slices";

export const testNotes: NoteProps[] = [
  {
    uid: "1",
    title: "Understand Your Identity",
    text: "I have been redeemed through his blood. I am chosen...",
    datetime: "11:49 AM September 27, 2023",

    time: "11:49 AM",
    date: "September 27, 2023",
  },
  {
    uid: "2",
    title: "Living in Christ",
    text: "I have been redeemed through his blood. I am chosen...",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
  },
  {
    uid: "3",
    title: "Fruit of the Spirit",
    text: "I have been redeemed through his blood. I am chosen...",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
  },
  {
    uid: "4",
    title: "Be a developer per excellence",
    text: "I have been redeemed through his blood. I am chosen...",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
  },
  {
    uid: "5",
    title: "Be a good engineer",
    text: "I have been redeemed through his blood. I am chosen...",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
  },
];

export const timeOptions = {
  hour: "numeric" as const,
  minute: "numeric" as const,
  hour12: true,
};

export const dateOptions = {
  year: "numeric" as const,
  month: "long" as const,
  day: "numeric" as const,
};
