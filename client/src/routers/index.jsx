import { createBrowserRouter } from "react-router-dom";
import { paths } from "./links";

// layouts and error
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { ErrorPage } from "../pages/common/ErrorPage";

// authentication
import { SigninPage } from "../pages/auth/SigninPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { ForgotPassPage } from "../pages/auth/ForgotPass";

// dashboard
import { DashboardPage } from "../pages/main/Dashboard/DashboardPage";

// locations
import { LocationsPage } from "../pages/main/Locations/LocationsPage";
import { LocationList } from "../pages/main/Locations/List";
import { LocationAdd } from "../pages/main/Locations/Add";

// profile
import { ProfilePage } from "../pages/main/Account/Profile/ProfilePage";
import { AccountInfo } from "../pages/main/Account/Profile/AccountInfo";

// members
import { MembersPage } from "../pages/main/Members/MembersPage";
import { MembersList } from "../pages/main/Members/List";

// doctor
import { DoctorsPage } from "../pages/main/Doctors/DoctorsPage";
import { DoctorList } from "../pages/main/Doctors/List";
import { DoctorAdd } from "../pages/main/Doctors/Add";
import { DoctorView } from "../pages/main/Doctors/View";

// lab doctors
import { LabDoctorsPage } from "../pages/main/LabDoctors/LabDoctorsPage";
import { LabDoctorsList } from "../pages/main/LabDoctors/List";

// category
import { CategoryPage } from "../pages/main/Category/CategoryPage";
import { CategoryList } from "../pages/main/Category/List";
import { CategoryAdd } from "../pages/main/Category/Add";
import { CategoryDetails } from "../pages/main/Category/Details";

// sub category
import { SubcategoryPage } from "../pages/main/SubCategory/SubcategoryPage";
import { SubCategoryList } from "../pages/main/SubCategory/List";

// specialization
import { SpecializationPage } from "../pages/main/Specialization/SpecializationPage";
import { SpecializationList } from "../pages/main/Specialization/List";
import { SpecializationAdd } from "../pages/main/Specialization/Add";

// billings
import { BillingsPage } from "../pages/main/Billings/BillingsPage";
import { BillingList } from "../pages/main/Billings/List";

// tests
import { LabTestPage } from "../pages/main/LabTests/LabTestPage";
import { LabTestList } from "../pages/main/LabTests/List";

// patient
import { PatientsPage } from "../pages/main/Patients/PatientsPage";
import { PatientList } from "../pages/main/Patients/List";

// settings
import { SettingsPage } from "../pages/main/Account/Settings";

// sample type
import { SampleTypesPage } from "../pages/main/SampleTypes/SampleTypesPage";
import { SampleTypesList } from "../pages/main/SampleTypes/List";
import { SampleTypeAdd } from "../pages/main/SampleTypes/Add";

// appointment
import { AppointmentsPage } from "../pages/main/Appointments/AppointmentsPage";
import { ListAppointment } from "../pages/main/Appointments/List";

// availbale doctors
import { AvailableDoctorsPage } from "../pages/main/AvailableDoctors/AvailableDoctorsPage";
import { ListAvailableDoctors } from "../pages/main/AvailableDoctors/List";

// vendors
import { VendorsPage } from "../pages/main/Vendors/VendorsPage";
import { ListVendors } from "../pages/main/Vendors/List";

// test reports
import { TestReportsPage } from "../pages/main/TestReports/TestReportsPage";
import { ListTestReports } from "../pages/main/TestReports/List";

// taxes
import { TaxesPage } from "../pages/main/Taxes/TaxesPage";
import { ListTaxes } from "../pages/main/Taxes/List";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SigninPage />,
      },
      {
        path: paths.register,
        element: <SignupPage />,
      },
      {
        path: paths.forgot,
        element: <ForgotPassPage />,
      },
    ],
  },
  {
    path: paths.dashboard,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: paths.loactionList,
        element: <LocationsPage />,
        children: [
          {
            index: true,
            element: <LocationList />,
          },
          {
            path: paths.locationAdd,
            element: <LocationAdd />,
          },
        ],
      },
      {
        path: paths.sampleTypeList,
        element: <SampleTypesPage />,
        children: [
          {
            index: true,
            element: <SampleTypesList />,
          },
          {
            path: paths.sampleTypeAdd,
            element: <SampleTypeAdd />,
          },
        ],
      },
      {
        path: paths.patientList,
        element: <PatientsPage />,
        children: [
          {
            index: true,
            element: <PatientList />,
          },
        ],
      },
      {
        path: paths.doctorList,
        element: <DoctorsPage />,
        children: [
          {
            index: true,
            element: <DoctorList />,
          },
          {
            path: paths.doctorAdd,
            element: <DoctorAdd />,
          },
          {
            path: `:id`,
            element: <DoctorView />,
          },
        ],
      },
      {
        path: paths.labDoctorList,
        element: <LabDoctorsPage />,
        children: [
          {
            index: true,
            element: <LabDoctorsList />,
          },
        ],
      },
      {
        path: paths.categoryList,
        element: <CategoryPage />,
        children: [
          {
            index: true,
            element: <CategoryList />,
          },
          {
            path: paths.categoryAdd,
            element: <CategoryAdd />,
          },
          {
            path: `:id`,
            element: <CategoryDetails />,
          },
          {
            path: `:id`,
            element: <CategoryAdd />,
          },
        ],
      },
      {
        path: paths.subCateList,
        element: <SubcategoryPage />,
        children: [
          {
            index: true,
            element: <SubCategoryList />,
          },
        ],
      },
      {
        path: paths.billList,
        element: <BillingsPage />,
        children: [
          {
            index: true,
            element: <BillingList />,
          },
        ],
      },
      {
        path: paths.speclList,
        element: <SpecializationPage />,
        children: [
          {
            index: true,
            element: <SpecializationList />,
          },
          {
            path: paths.speclAdd,
            element: <SpecializationAdd />,
          },
        ],
      },
      {
        path: paths.testList,
        element: <LabTestPage />,
        children: [
          {
            index: true,
            element: <LabTestList />,
          },
        ],
      },
      {
        path: paths.memberList,
        element: <MembersPage />,
        children: [
          {
            index: true,
            element: <MembersList />,
          },
        ],
      },
      {
        path: paths.profile,
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <AccountInfo />,
          },
        ],
      },
      {
        path: paths.appointments,
        element: <AppointmentsPage />,
        children: [
          {
            index: true,
            element: <ListAppointment />,
          },
        ],
      },
      {
        path: paths.availableDoctor,
        element: <AvailableDoctorsPage />,
        children: [
          {
            index: true,
            element: <ListAvailableDoctors />,
          },
        ],
      },
      {
        path: paths.testReports,
        element: <TestReportsPage />,
        children: [
          {
            index: true,
            element: <ListTestReports />,
          },
        ],
      },
      {
        path: paths.vendorsList,
        element: <VendorsPage />,
        children: [
          {
            index: true,
            element: <ListVendors />,
          },
        ],
      },
      {
        path: paths.taxList,
        element: <TaxesPage />,
        children: [
          {
            index: true,
            element: <ListTaxes />,
          },
        ],
      },
      {
        path: paths.setting,
        element: <SettingsPage />,
      },
    ],
  },
]);
