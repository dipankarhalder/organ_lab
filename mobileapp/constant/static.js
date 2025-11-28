import logoImage from "../assets/images/logo.png";
import slider1 from "../assets/images/sslider-1.png";
import slider2 from "../assets/images/sslider-2.png";
import slider3 from "../assets/images/sslider-3.png";
import topBackground from "../assets/images/bgtop.png";
import phoneImage from "../assets/images/phone.png";
import homeBannerImage from "../assets/images/homebanner.png";
import doctorBannerImage from "../assets/images/doctorbanner.png";

import exp1 from "../assets/images/exp-1.png";
import exp2 from "../assets/images/exp-2.png";
import exp3 from "../assets/images/exp-3.png";
import exp4 from "../assets/images/exp-4.png";
import exp5 from "../assets/images/exp-5.png";
import exp6 from "../assets/images/exp-6.png";
import exp7 from "../assets/images/exp-7.png";
import exp8 from "../assets/images/exp-8.png";
import exp9 from "../assets/images/exp-9.png";
import exp0 from "../assets/images/exp-10.png";

import {
  Home,
  Doctor,
  LabTest,
  Appoint,
  Locations,
  General,
  Neuro,
  Pediatric,
  Radiology,
  Entpscl,
  Ortho,
  Urology,
  Opt,
  Diab,
  Psy,
} from "./icon";

export const logo = logoImage;
export const slides = [
  { id: 1, image: slider1 },
  { id: 2, image: slider2 },
  { id: 3, image: slider3 },
];
export const mainImg = {
  topBg: topBackground,
  phone: phoneImage,
  homeBanner: homeBannerImage,
  doctorBanner: doctorBannerImage,
};
export const tabsInformation = [
  { name: "home", title: "Home", Icon: Home },
  { name: "doctors", title: "Doctors", Icon: Doctor },
  { name: "labtest", title: "Lab Test", Icon: LabTest },
  { name: "appointment", title: "Appointment", Icon: Appoint },
  { name: "locations", title: "Locations", Icon: Locations },
];
export const recomDoctor = [
  {
    id: 1,
    image: exp1,
    name: "Dr. Subhra Roy Choudhary",
    special: "Pediatic",
    exp: 14,
    recom: 95,
    address: "R. N. Bose, Garia Kolkata - 700095",
    rating: "4.8",
    review: "4,278",
  },
  {
    id: 2,
    image: exp2,
    name: "Dr. Arnab Mukharjee",
    special: "General",
    exp: 5,
    recom: 90,
    address: "Dum Dum Road, Kolkata - 700124",
    rating: "3.4",
    review: "2,578",
  },
  {
    id: 3,
    image: exp3,
    name: "Dr. Tapas Das Gupta",
    special: "Dentist",
    exp: 8,
    recom: 87,
    address: "12/A Hazra Road, Kolkata - 700054",
    rating: "4.1",
    review: "1,456",
  },
  {
    id: 4,
    image: exp4,
    name: "Dr. Subhra Roy Choudhary",
    special: "Pediatic",
    exp: 10,
    recom: 91,
    address: "R. N. Bose, Garia Kolkata - 700095",
    rating: "4.8",
    review: "4,278",
  },
  {
    id: 5,
    image: exp5,
    name: "Dr. Arnab Mukharjee",
    special: "General",
    exp: 12,
    recom: 56,
    address: "Dum Dum Road, Kolkata - 700124",
    rating: "3.4",
    review: "2,578",
  },
  {
    id: 6,
    image: exp6,
    name: "Dr. Tapas Das Gupta",
    special: "Dentist",
    exp: 9,
    recom: 45,
    address: "12/A Hazra Road, Kolkata - 700054",
    rating: "4.1",
    review: "1,456",
  },
  {
    id: 7,
    image: exp7,
    name: "Dr. Tapas Das Gupta",
    special: "Dentist",
    exp: 11,
    recom: 98,
    address: "12/A Hazra Road, Kolkata - 700054",
    rating: "4.1",
    review: "1,456",
  },
  {
    id: 8,
    image: exp8,
    name: "Dr. Subhra Roy Choudhary",
    special: "Pediatic",
    exp: 8,
    recom: 89,
    address: "R. N. Bose, Garia Kolkata - 700095",
    rating: "4.8",
    review: "4,278",
  },
  {
    id: 9,
    image: exp9,
    name: "Dr. Arnab Mukharjee",
    special: "General",
    exp: 10,
    recom: 94,
    address: "Dum Dum Road, Kolkata - 700124",
    rating: "3.4",
    review: "2,578",
  },
  {
    id: 10,
    image: exp0,
    name: "Dr. Tapas Das Gupta",
    special: "Dentist",
    exp: 3,
    recom: 90,
    address: "12/A Hazra Road, Kolkata - 700054",
    rating: "4.1",
    review: "1,456",
  },
];
export const tabListItem = [
  { key: "doctors", label: "Available Doctors" },
  { key: "tests", label: "All Lab Tests" },
];
export const docSpeciality = [
  {
    id: 1,
    name: "General",
    Icon: General,
    bgColor: "#ffdce2ff",
    color: "#B00007",
  },
  {
    id: 2,
    name: "Neurologic",
    Icon: Neuro,
    bgColor: "#CAE4FF",
    color: "#000E86",
  },
  {
    id: 3,
    name: "ENT",
    Icon: Entpscl,
    bgColor: "#FFF6C6",
    color: "#D87E00",
  },
  {
    id: 4,
    name: "Pediatric",
    Icon: Pediatric,
    bgColor: "#E6D4FF",
    color: "#5F0092",
  },
  {
    id: 5,
    name: "Radiology",
    Icon: Radiology,
    bgColor: "#C4FFDC",
    color: "#1D9600",
  },
  {
    id: 6,
    name: "Orthopadic",
    Icon: Ortho,
    bgColor: "#E6D4FF",
    color: "#5F0092",
  },
  {
    id: 7,
    name: "Urology",
    Icon: Urology,
    bgColor: "#FFF6C6",
    color: "#D87E00",
  },
  {
    id: 8,
    name: "Opthalmolgy",
    Icon: Opt,
    bgColor: "#CAE4FF",
    color: "#000E86",
  },
  {
    id: 9,
    name: "Diabetology",
    Icon: Diab,
    bgColor: "#C4FFDC",
    color: "#1D9600",
  },
  {
    id: 10,
    name: "Psychiatry",
    Icon: Psy,
    bgColor: "#ffdce2ff",
    color: "#B00007",
  },
];
export const allPackagesCheckup = [
  {
    id: 1,
    title: "Organ prime full body checkup",
    testCount: "12 tests covered",
    price: "2522",
    offerPrice: "994",
    offerPer: "60% off",
    report: "within 36 hours",
  },
  {
    id: 2,
    title: "Organ fever panel complete",
    testCount: "18 tests covered",
    price: "2898",
    offerPrice: "1249",
    offerPer: "56% off",
    report: "within 2 days",
  },
  {
    id: 3,
    title: "Organ urine examination (U001)",
    testCount: "16 tests covered",
    price: "2100",
    offerPrice: "990",
    offerPer: "40% off",
    report: "within 24 hours",
  },
  {
    id: 4,
    title: "Organ kidney panel (Z007)",
    testCount: "16 tests covered",
    price: "3452",
    offerPrice: "1190",
    offerPer: "51% off",
    report: "within 4 days",
  },
  {
    id: 5,
    title: "Organ kidney panel (Z005)",
    testCount: "8 tests covered",
    price: "3622",
    offerPrice: "1756",
    offerPer: "43% off",
    report: "within 4 days",
  },
];
