// ###############################################################

import { DevotionalItemProps, NoteProps } from "../shared/types/slices";
import { IMAGES } from "./Colors";

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

export const testDevotional: DevotionalItemProps[] = [
  {
    uid: "1",
    image: IMAGES.devotionalSample2,
    date: "September 20, 2023",
    title: "SOUL MAINTENANCE",
    text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
    ticked: true,
  },
  {
    uid: "2",
    image: IMAGES.devotionalSample3,
    date: "September 19, 2023",
    title: "BE TRUTHFUL",
    text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
    ticked: false,
  },
  {
    uid: "3",
    image: IMAGES.devotionalSample4,
    date: "September 18, 2023",
    title: "AN EXAMPLE OF PURITY",
    text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
    ticked: true,
  },
  {
    uid: "4",
    image: IMAGES.devotionalSample4,
    date: "September 18, 2023",
    title: "AN EXAMPLE OF PURITY",
    text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
    ticked: true,
  },
  {
    uid: "5",
    image: IMAGES.devotionalSample1,
    date: "September 26, 2023",
    title: "SHARING YOUR FAITH",
    text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
    ticked: true,
  },
];
