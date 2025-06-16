
import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "ur" | "te";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    flights: "Flights",
    manageBookings: "Manage Bookings",
    offers: "Offers",
    support: "Help & Support",
    login: "Login",
    signup: "Sign Up",
    search: "Search",
    from: "From",
    to: "To",
    departDate: "Departure Date",
    returnDate: "Return Date",
    passengers: "Passengers",
    cabinClass: "Cabin Class",
    searchFlights: "Search Flights",
    "Round Trip": "Round Trip",
    "One Way": "One Way",
    chatWithUs: "Chat with Us",
    contactUs: "Contact Us",
    faqs: "FAQs",
    findBooking: "Find Your Booking",
    bookingReference: "Booking Reference",
    lastName: "Last Name",
    emailAddress: "Email Address",
    searchBooking: "Search Booking",
    whyChooseUs: "Why Choose SkyVoyage?",
    specialOffers: "Special Offers & Deals",
    testimonials: "What Our Customers Say",
    // Add more translations as needed
  },
  hi: {
    home: "होम",
    flights: "उड़ानें",
    manageBookings: "बुकिंग प्रबंधित करें",
    offers: "ऑफर",
    support: "सहायता",
    login: "लॉगिन",
    signup: "साइन अप",
    search: "खोजें",
    from: "से",
    to: "तक",
    departDate: "प्रस्थान तिथि",
    returnDate: "वापसी तिथि",
    passengers: "यात्री",
    cabinClass: "केबिन श्रेणी",
    searchFlights: "उड़ानें खोजें",
    "Round Trip": "आने-जाने का टिकट",
    "One Way": "एकतरफा टिकट",
    chatWithUs: "हमसे चैट करें",
    contactUs: "संपर्क करें",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    findBooking: "अपनी बुकिंग खोजें",
    bookingReference: "बुकिंग संदर्भ",
    lastName: "अंतिम नाम",
    emailAddress: "ईमेल पता",
    searchBooking: "बुकिंग खोजें",
    whyChooseUs: "स्काईवॉयेज क्यों चुनें?",
    specialOffers: "विशेष ऑफर और डील",
    testimonials: "हमारे ग्राहक क्या कहते हैं",
    // Add more translations as needed
  },
  ur: {
    home: "ہوم",
    flights: "پروازیں",
    manageBookings: "بکنگ منیج کریں",
    offers: "آفرز",
    support: "مدد",
    login: "لاگ ان",
    signup: "سائن اپ",
    search: "تلاش",
    from: "سے",
    to: "تک",
    departDate: "روانگی کی تاریخ",
    returnDate: "واپسی کی تاریخ",
    passengers: "مسافر",
    cabinClass: "کیبن کلاس",
    searchFlights: "پروازیں تلاش کریں",
    "Round Trip": "آنا جانا",
    "One Way": "ایک طرفہ",
    chatWithUs: "ہم سے بات کریں",
    contactUs: "ہم سے رابطہ کریں",
    faqs: "اکثر پوچھے گئے سوالات",
    findBooking: "اپنی بکنگ تلاش کریں",
    bookingReference: "بکنگ حوالہ",
    lastName: "آخری نام",
    emailAddress: "ای میل ایڈریس",
    searchBooking: "بکنگ تلاش کریں",
    whyChooseUs: "سکائی وویج کو کیوں چنیں؟",
    specialOffers: "خصوصی آفرز اور ڈیلز",
    testimonials: "ہمارے گاہک کیا کہتے ہیں",
    // Add more translations as needed
  },
  te: {
    home: "హోమ్",
    flights: "విమానాలు",
    manageBookings: "బుకింగ్‌లను నిర్వహించండి",
    offers: "ఆఫర్లు",
    support: "సహాయం",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    search: "శోధించు",
    from: "నుండి",
    to: "వరకు",
    departDate: "నిష్క్రమణ తేదీ",
    returnDate: "తిరిగి వచ్చే తేదీ",
    passengers: "ప్రయాణికులు",
    cabinClass: "కేబిన్ తరగతి",
    searchFlights: "విమానాలను శోధించండి",
    "Round Trip": "రౌండ్ ట్రిప్",
    "One Way": "వన్ వే",
    chatWithUs: "మాతో చాట్ చేయండి",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    faqs: "తరచుగా అడిగే ప్రశ్నలు",
    findBooking: "మీ బుకింగ్‌ను కనుగొనండి",
    bookingReference: "బుకింగ్ రిఫరెన్స్",
    lastName: "చివరి పేరు",
    emailAddress: "ఇమెయిల్ చిరునామా",
    searchBooking: "బుకింగ్ శోధించండి",
    whyChooseUs: "స్కైవోయేజ్‌ని ఎందుకు ఎంచుకోవాలి?",
    specialOffers: "ప్రత్యేక ఆఫర్లు మరియు డీల్స్",
    testimonials: "మా కస్టమర్లు ఏమంటున్నారు",
    // Add more translations as needed
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  ur: "اردو",
  te: "తెలుగు",
};

export const getLanguageName = (code: Language) => languageNames[code];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
