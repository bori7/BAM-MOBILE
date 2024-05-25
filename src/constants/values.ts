// ###############################################################

import {
    DevotionalItemProps,
    GeneralVerseOfTheDayType,
    GivingTransactionDataType,
    NoteProps,
    NotificationsFormSliceType,
    PrayerProps,
    SelectedDevotionalDataType, TermsOfServiceType,
} from "../shared/types/slices";
import {IMAGES} from "./Colors";

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
        datetime: "11:49 AM September 27, 2023",
    },
    {
        uid: "2",
        image: IMAGES.devotionalSample3,
        date: "September 19, 2023",
        title: "BE TRUTHFUL",
        text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
        ticked: false,
        datetime: "11:49 AM September 27, 2023",
    },
    {
        uid: "3",
        image: IMAGES.devotionalSample4,
        date: "September 18, 2023",
        title: "AN EXAMPLE OF PURITY",
        text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
        ticked: true,
        datetime: "11:49 AM September 27, 2023",
    },
    {
        uid: "4",
        image: IMAGES.devotionalSample4,
        date: "September 18, 2023",
        title: "AN EXAMPLE OF PURITY",
        text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
        ticked: true,
        datetime: "11:49 AM September 27, 2023",
    },
    {
        uid: "5",
        image: IMAGES.devotionalSample1,
        date: "September 26, 2023",
        title: "SHARING YOUR FAITH",
        text: "The Apostles went everywhere to share their faith in Christ. They did not go to hide themselves for fear...",
        ticked: true,
        datetime: "11:49 AM September 27, 2023",
    },
];

export const testSelectedDevotional: SelectedDevotionalDataType = {
    uid: "1",
    image: IMAGES.devotionalSample2,
    date: "Friday September 22, 2023",
    title: "Understand Your Identity",
    ticked: true,
    bibleVerse: "Psalm 109 : 21-31",
    keyText:
        "It’s in Christ that we find out who we are and what we are living for. Long before we first heard of Christ and got our hopes up, he had his eye on us, had designs on us for glorious living, part of the overall purpose he is working out in everything and everyone.",
    keyVerse: "Ephesians 1 : 11",
    message:
        "Many struggle with a low self-image. The New Testament answer to this problem is to know who you are in Christ Jesus: ‘It’s in Christ that we find out who we are and what we are living for’ (v.11, MSG). Understand what your identity is in Christ. While you may not have every material blessing you want (Paul was in prison when he wrote this letter), God has blessed you ‘with every spiritual blessing in Christ’ (v.3). This passage lists many of these blessings: You are redeemed through his blood (v.7a; Isaiah 52:3,9).",
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

// ##############################################################################
export const testNotificationsForm: NotificationsFormSliceType = {
    "Verse of the day": {
        timeValue: new Date().toISOString(),
        enable: false,
    },
    "Daily Answer Devotional": {
        timeValue: new Date().toISOString(),
        enable: false,
    },
    "Prayer Reminder": {
        timeValue: new Date().toISOString(),
        enable: false,
    },
};

// ##############################################################################
export const testVerseOfTheDayList: GeneralVerseOfTheDayType[] = [
    {
        verse: "Matthew 5:19 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 27",
    },
    {
        verse: "Matthew 5:10 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 26",
    },
    {
        verse: "Matthew 5:19 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 25",
    },
    {
        verse: "Matthew 5:8 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 24",
    },
    {
        verse: "Matthew 5:2 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 23",
    },
    {
        verse: "Matthew 5:17 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 22",
    },
    {
        verse: "Matthew 5:2 KJV",
        text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
        date: "September 22",
    },
];


// ##############################################################################
export const TermsOfService: TermsOfServiceType[] = [
    {
        subtitle: "Introduction",
        text: "Welcome to The Daily Answer Devotional! By accessing our app, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our app."
    },
    {
        subtitle: "Eligibility",
        text: "You must be at least 13 years old to use our app. By agreeing to these Terms, you represent and warrant that you meet the minimum age requirement."
    },
    {
        subtitle: "Account Registration",
        text: "To access certain features of the app, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
        subtitle: "User Conduct",
        text: "You are solely responsible for your conduct while using our app and for any data, text, information, usernames, graphics, images, photographs, profiles, audio, video, items, and links (collectively, \"Content\") that you submit, post, and display on our app."
    },
    {
        subtitle: "Prohibited Activities",
        text: "You agree not to engage in the following prohibited activities:\n" +
            "Illegal or unauthorized use of our app, including collecting usernames and/or email addresses of members by electronic or other means for the purpose of sending unsolicited email.\n" +
            "Creating user accounts by automated means or under false pretenses.\n" +
            "Transmitting any worms or viruses or any code of a destructive nature.\n" +
            "Intellectual Property\n" +
            "\n" +
            "All content included on the app, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the app, is the property of The Daily Answer Devotional or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.\n"
    },
    {
        subtitle: "Termination",
        text: "We may terminate your access to all or any part of the app at any time, with or without cause, with or without notice, effective immediately."
    },
    {
        subtitle: "Disclaimer of Warranties",
        text: 'The app is provided on an "as is" and "as available" basis. The Daily Answer Devotional makes no representations or warranties of any kind, express or implied, as to the operation of the app or the information, content, materials, or products included on the app.'
    },
    {
        subtitle: "Limitation of Liability",
        text: "The Daily Answer Devotional shall not be liable for any damages of any kind arising from the use of this app, including, but not limited to direct, indirect, incidental, punitive, and consequential damages"
    },
    {
        subtitle: "Changes to the Terms",
        text: "We reserve the right to make changes to these Terms of Service at any time. Your continued use of the app following any changes means that you accept and agree to the changes."
    },
    {
        subtitle: "Contact Information",
        text: "If you have any questions about these Terms of Service, please contact us at: support@thedailyanswer.org"
    },
]

// ##############################################################################
export const PrivacyPolicy: TermsOfServiceType[] = [
    {
        subtitle: "Introduction",
        text: "Welcome to The Daily Answer Devotional! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the app."
    },
    {
        subtitle: "Information Collection and Use",
        text: "Personal Data: We collect personal data that you voluntarily provide to us when registering at the app, expressing an interest in obtaining information about us or our products and services, when participating in activities on the app or otherwise contacting us. The personal data we collect may include your name, email address, phone number, and other contact details." +
            "\n" +
            "\n" +
            "Usage Data: When you access the app, we may also collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.\n" +
            "\n" +
            "\n" +
            "Location Information: We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our mobile application, to provide location-based services.\n"
    },
    {
        subtitle: "Cookies and Tracking Technologies",
        text: "We use cookies and similar tracking technologies to track the activity on our app and hold certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our app."
    },
    {
        subtitle: "Third-Party Service Providers",
        text: "We may employ third-party companies and individuals to facilitate our app (\"Service Providers\"), to provide the app on our behalf, to perform app-related services or to assist us in analyzing how our app is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose."
    },
    {
        subtitle: "Data Security",
        text: "We value your trust in providing us your personal information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security."
    },
    {
        subtitle: "Data Retention",
        text: "We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies."
    },
    {
        subtitle: "Your Data Protection Rights",
        text: "Depending on the jurisdiction, you have certain data protection rights. These may include the right to access, update, or delete the information we have on you. If you wish to exercise any of these rights, please contact us."
    },
    {
        subtitle: "Children's Privacy",
        text: "Our app does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers."
    },
    {
        subtitle: "Changes to This Privacy Policy",
        text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
    },
    {
        subtitle: "Contact Us",
        text: "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@thedailyanswer.org"
    }
]

// ##############################################################################
export const EmailSupport: TermsOfServiceType[] = [
    {
        subtitle: "Contact Us",
        text: "If you need assistance or have any questions, please feel free to contact our support team. We are here to help!"
    },
    {
        subtitle: "Email Us",
        text: "• For Support: support@thedailyanswer.org\n" +
            "• For Feedback: feedback@thedailyanswer.org\n" +
            "• For Partnerships and Business Inquiries: business@thedailyanswer.org"
    },
    {
        subtitle: "What to Include in Your Email",
        text: "Your Name and Contact Information\n" +
            "A detailed description of your issue or feedback\n" +
            "Screenshots or other relevant attachments (if applicable)"
    },
]