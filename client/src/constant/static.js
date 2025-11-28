import {
  Home,
  Members,
  Teams,
  Location,
  Appointment,
  Report,
  Categories,
  SubCategories,
  LabDoctor,
  Taxes,
  Plans,
  Doctor,
  Transactions,
  Profile,
  LabText,
  Patients,
  Vendors,
  TypeSample,
} from "../icons";
import { paths } from "../routers/links";

export const navlinks = [
  {
    id: 0,
    label: "Main Menu",
    children: [
      { id: 1, label: "Dashboard", path: paths.dashboard, icon: Home },
      { id: 2, label: "Locations", path: paths.loactionList, icon: Location },
      { id: 3, label: "Members", path: paths.memberList, icon: Teams },
    ],
  },
  {
    id: 1,
    label: "Manage Appointments",
    children: [
      {
        id: 1,
        label: "Appointments",
        path: paths.appointments,
        icon: Appointment,
      },
      {
        id: 2,
        label: "Available Doctors",
        path: paths.availableDoctor,
        icon: Members,
      },
      { id: 3, label: "Test Reports", path: paths.testReports, icon: Report },
    ],
  },
  {
    id: 2,
    label: "Patients Management",
    children: [
      { id: 1, label: "Patients", path: paths.patientList, icon: Patients },
    ],
  },
  {
    id: 3,
    label: "Doctors Management",
    children: [
      { id: 1, label: "General Doctors", path: paths.doctorList, icon: Doctor },
      {
        id: 2,
        label: "Lab Doctors",
        path: paths.labDoctorList,
        icon: LabDoctor,
      },
    ],
  },
  {
    id: 4,
    label: "All Test Management",
    children: [
      { id: 1, label: "All Tests", path: paths.testList, icon: LabText },
      { id: 2, label: "Vendors", path: paths.vendorsList, icon: Vendors },
    ],
  },
  {
    id: 5,
    label: "Category Management",
    children: [
      {
        id: 1,
        label: "All Categories",
        path: paths.categoryList,
        icon: Categories,
      },
      {
        id: 2,
        label: "Sub Categories",
        path: paths.subCateList,
        icon: SubCategories,
      },
      {
        id: 3,
        label: "Sample Types",
        path: paths.sampleTypeList,
        icon: TypeSample,
      },
      { id: 4, label: "Specialization", path: paths.speclList, icon: Plans },
    ],
  },
  {
    id: 6,
    label: "Bills Management",
    children: [
      { id: 1, label: "Billing", path: paths.billList, icon: Transactions },
      { id: 2, label: "Taxes", path: paths.taxList, icon: Taxes },
    ],
  },
  {
    id: 7,
    label: "Personal Information",
    children: [{ id: 1, label: "Profile", path: paths.profile, icon: Profile }],
  },
];
