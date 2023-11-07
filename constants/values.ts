// ###############################################################

import {
  DevotionalItemProps,
  GivingTransactionDataType,
  NoteProps,
  PrayerProps,
  SelectedDevotionalDataType,
} from "../shared/types/slices";
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

export const testPrayers: PrayerProps[] = [
  {
    uid: "1",
    title: "Lord grant me favour this week",
    text: "Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great.Financial blessings, opportunities, goodness and I am great",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
    answered: false,
  },
  {
    uid: "2",
    title: "Lord grant me favour this week",
    text: "Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great.Financial blessings, opportunities, goodness and I am great",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
    answered: false,
  },
  {
    uid: "3",
    title: "Lord grant me favour this week",
    text: "Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great.Financial blessings, opportunities, goodness and I am great",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
    answered: false,
  },
  {
    uid: "4",
    title: "Lord grant me favour this week",
    text: "Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great.Financial blessings, opportunities, goodness and I am great",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
    answered: false,
  },
  {
    uid: "5",
    title: "Lord grant me favour this week",
    text: "Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great. Financial blessings, opportunities, goodness and I am great.Financial blessings, opportunities, goodness and I am great",
    datetime: "11:49 AM September 27, 2023",
    time: "11:49 AM",
    date: "September 27, 2023",
    answered: false,
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

export const testSelectedDevotional: SelectedDevotionalDataType = {
  uid: "1",
  image: IMAGES.devotionalSample2,
  date: "Friday September 22, 2023",
  title: "Understand Your Identity",
  ticked: true,
  bibleVerse: "Psalm 109 : 21 -31",
  keyText:
    "It’s in Christ that we find out who we are and what we are living for. Long before we first heard of Christ and got our hopes up, he had his eye on us, had designs on us for glorious living, part of the overall purpose he is working out in everything and everyone.",
  keyVerse: "Ephesians 1 : 11",
  message:
    " Many struggle with a low self-image. The New Testament answer to this problem is to know who you are in Christ Jesus: ‘It’s in Christ that we find out who we are and what we are living for’ (v.11, MSG). Understand what your identity is in Christ. While you may not have every material blessing you want (Paul was in prison when he wrote this letter), God has blessed you ‘with every spiritual blessing in Christ’ (v.3). This passage lists many of these blessings: You are redeemed through his blood (v.7a; Isaiah 52:3,9).",
  subMessages: [
    {
      title: "Grace and peace",
      message:
        " Paul starts his greetings with ‘grace and peace’ (v.2). Later he says, ‘The riches of God’s grace... [have been] lavished on us’ (vv.7–8). Grace is love that cares and stoops and rescues. You have peace with God.",
    },
    {
      title: "Chosen, destined and adopted",
      message:
        "‘Even as [in His love] He chose us [actually picked us out for Himself as His own] in Christ before the foundation of the world... He foreordained us (destined us, planned in love for us) to be adopted (revealed) as His own children’ (vv.4–5, AMP; see also v.11).",
    },
    {
      title: "Redeemed, forgiven and free",
      message:
        " ‘Redeemed’ was the word used for the buying back of a slave – a captive set free for a price.",
    },
  ],
  prayer:
    "Lord, I praise you for every spiritual blessing that you have given me in Christ. May the eyes of my heart be enlightened in order that I may know the hope to which you have called me, the riches of your glorious inheritances, and your incomparably great power living within me.(Ephesians 1 : 17-19)",
};

// ##############################################################################
export const testGivingTransactions: GivingTransactionDataType[] = [
  {
    uid: "0",
    currency: "usd",
    amount: "20,000",
    status: "Successful",
    date: "Sep 27, 2023",
    time: "05:42 PM",
    datetime: "",
    paymentMethod: "C",
    reference: "124DJK28DG5",
  },
  {
    uid: "1",
    currency: "ngn",
    amount: "10,000.00",
    status: "Successful",
    date: "Sep 27, 2023",
    time: "05:42 PM",
    datetime: "",
    paymentMethod: "C",
    reference: "124DJK28DG5",
  },
  {
    uid: "2",
    currency: "ngn",
    amount: "10,000.00",
    status: "Pending",
    date: "Sep 27, 2023",
    time: "05:42 PM",
    datetime: "",
    paymentMethod: "C",
    reference: "124DJK28DG5",
  },
  {
    uid: "3",
    currency: "ngn",
    amount: "10,000.00",
    status: "Failed",
    date: "Sep 27, 2023",
    time: "05:42 PM",
    datetime: "",
    paymentMethod: "C",
    reference: "124DJK28DG5",
  },
];
