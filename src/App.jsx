import { Route, Routes } from "react-router-dom";
import ContactDetailsPage from "./components/ContactDetailsPage";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./layouts/Layout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Homepage from "./pages/Homepage";
import LoginPag from "./pages/LoginPag";
import PricingPage from "./pages/PricingPage";
import ServicesPage from "./pages/ServicesPage";
import AccDashboardPage from "./pages/accounts/Dashboard";
import CreateTransaction from "./pages/accounts/bank-transaction/Create";
import BankTransactionListPage from "./pages/accounts/bank-transaction/List";
import CreateExpense from "./pages/accounts/expense/Create";
import ExpenseistPage from "./pages/accounts/expense/List";
import CreateIncome from "./pages/accounts/income/Create";
import IncomeistPage from "./pages/accounts/income/List";
import ReportForm from "./pages/accounts/report/ReportForm";
import CreateSalary from "./pages/accounts/salary/Create";
import SalaryistPage from "./pages/accounts/salary/List";
import DevDashboardPage from "./pages/developer/Dashboard";
import CreateAnnouncementPage from "./pages/developer/announcement/CreateMessagePage";
import AnnouncementList from "./pages/developer/announcement/List";
import DevContactsPage from "./pages/developer/contacts/Messages";
import ListDemoRequests from "./pages/developer/demo-req/List";
import MessageCreatePage from "./pages/developer/message/CreateMessagePage";
import DevMessageDetailsPage from "./pages/developer/message/MessageDetailsPage";
import DevMessagesPage from "./pages/developer/message/Messages";
import DevCreateSchool from "./pages/developer/schools/CreateSchool";
import DevEditSchoolLink from "./pages/developer/schools/EditLink";
import DevEditPermission from "./pages/developer/schools/EditPermission";
import DevEditSchoolPage from "./pages/developer/schools/EditSchool";
import DevListSchools from "./pages/developer/schools/ListSchools";
import ViewSchoolPage from "./pages/developer/schools/ViewSchool";
import DevCreateUser from "./pages/developer/user/CreateUser";
import EditUserPage from "./pages/developer/user/EditUserPage";
import ListUsers from "./pages/developer/user/ListUsers";
import Step_1 from "./pages/install/Step-1";
import Step_2 from "./pages/install/Step-2";
import DashboardPage from "./pages/user/Dashboard";
import AdmissionPreviewPage from "./pages/user/admission-corner/AdmissionPreviewPage";
import RecentApplications from "./pages/user/admission-corner/List";
import CreateAdmissionForm from "./pages/user/admission/CreateAdmissionForm";
import RecentStudents from "./pages/user/admission/RecentStudents";
import ClassesPage from "./pages/user/classes/Page";
import CommitteeProfilePage from "./pages/user/committee/CommitteProfilePage";
import CreateCommitteePage from "./pages/user/committee/CreateCommittee";
import EditCommitteePage from "./pages/user/committee/EditProfilePage";
import ListCommittee from "./pages/user/committee/ListCommittee";
import MessageDetailsPage from "./pages/user/messages/MessageDetailsPage";
import MessagesPage from "./pages/user/messages/MessagesPage";
import NoticeCreatePage from "./pages/user/notice/CreateNoticePage";
import NoticeEditPage from "./pages/user/notice/EditNoticePage";
import NoticeDetailsPage from "./pages/user/notice/NoticeDetailsPage";
import NoticesPage from "./pages/user/notice/NoticePage";
import EditProfilePage from "./pages/user/profile/EditProfile";
import ResultCreatePage from "./pages/user/result/CreateResultPage";
import ListPage from "./pages/user/result/ListPage";
import AdmissionSettingsPage from "./pages/user/settings/AdmissionSettings";
import ChangeInsInfo from "./pages/user/settings/ChangeInsInfo";
import EditAboutPage from "./pages/user/settings/EditAboutPage";
import HeadTeacherBani from "./pages/user/settings/HeadTeacherBani";
import SettingsPage from "./pages/user/settings/Page";
import SchoolPictures from "./pages/user/settings/SchoolPictures";
import SocialMedia from "./pages/user/settings/SocialMedia";
import TestimonialDetails from "./pages/user/settings/testimonials/Details";
import ListTestimonials from "./pages/user/settings/testimonials/List";
import NewTestimonials from "./pages/user/settings/testimonials/Testimonials";
import StaffCreatePage from "./pages/user/staffs/CreatStaffPage";
import EditStaffPage from "./pages/user/staffs/EditProfilePage";
import ListOfficeStaffs from "./pages/user/staffs/ListOfficeStaffs";
import StaffProfilePage from "./pages/user/staffs/StaffProfilePage";
import ByClassStudentsPage from "./pages/user/students/ByClassListStudents";
import ClassCreatePage from "./pages/user/students/CreateClassPage";
import EditStudentPage from "./pages/user/students/EditStudentPage";
import ListStudentsPage from "./pages/user/students/ListStudentsPage";
import StudentDetailsPage from "./pages/user/students/StudentDetailsPage";
import TeacherCreatePage from "./pages/user/teachers/CreateTeacherPage";
import EditTeacherPage from "./pages/user/teachers/EditProfilePage";
import TeacherProfilePage from "./pages/user/teachers/TeacherProfilePage";
import TeachersPage from "./pages/user/teachers/TeachersPage";

function App() {

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPag />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* install app */}
          <Route path="/install" element={<Step_1 />} />
          <Route path="/install/step-2" element={<Step_2 />} />

          {/* /user routes */}
          <Route path="/user/dashboard" element={<DashboardPage />} />
          <Route path="/user/messages" element={<MessagesPage />} />
          <Route path="/user/messages/:id" element={<MessageDetailsPage />} />
          <Route path="/user/notices" element={<NoticesPage />} />
          <Route path="/user/notices/:id" element={<NoticeDetailsPage />} />
          <Route path="/user/notices/create" element={<NoticeCreatePage />} />
          <Route path="/user/notices/edit/:id" element={<NoticeEditPage />} />
          <Route path="/user/teachers" element={<TeachersPage />} />
          <Route path="/user/teachers/create" element={<TeacherCreatePage />} />
          <Route path="/user/teachers/:id" element={<TeacherProfilePage />} />
          <Route path="/user/teachers/edit/:id" element={<EditTeacherPage />} />
          <Route path="/user/students/all" element={<ListStudentsPage />} />
          <Route path="/user/students" element={<ListStudentsPage />} />
          <Route
            path="/user/students/class/create"
            element={<ClassCreatePage />}
          />
          <Route path="/user/students/list" element={<ByClassStudentsPage />} />
          <Route path="/user/students/:id" element={<StudentDetailsPage />} />
          <Route path="/user/students/edit/:id" element={<EditStudentPage />} />
          <Route path="/user/staffs" element={<ListOfficeStaffs />} />
          <Route path="/user/staffs/create" element={<StaffCreatePage />} />
          <Route path="/user/staffs/:id" element={<StaffProfilePage />} />
          <Route path="/user/staffs/edit/:id" element={<EditStaffPage />} />
          <Route path="/user/committee" element={<ListCommittee />} />
          <Route
            path="/user/committee/create"
            element={<CreateCommitteePage />}
          />
          <Route
            path="/user/committee/:id"
            element={<CommitteeProfilePage />}
          />
          <Route
            path="/user/committee/edit/:id"
            element={<EditCommitteePage />}
          />
          <Route path="/user/classes" element={<ClassesPage />} />
          <Route path="/user/results" element={<ListPage />} />
          <Route path="/user/results/create" element={<ResultCreatePage />} />
          <Route path="/user/admission" element={<RecentStudents />} />
          <Route
            path="/user/admission/create"
            element={<CreateAdmissionForm />}
          />
          <Route
            path="/user/application-corner"
            element={<RecentApplications />}
          />
          <Route
            path="/user/application-corner/preview/:id"
            element={<AdmissionPreviewPage />}
          />
          <Route path="/user/settings" element={<SettingsPage />} />
          <Route
            path="/user/settings/change-institute-info"
            element={<ChangeInsInfo />}
          />
          <Route path="/user/settings/edit-about" element={<EditAboutPage />} />
          <Route
            path="/user/settings/admission-settings"
            element={<AdmissionSettingsPage />}
          />
          <Route
            path="/user/settings/head-teacher-bani"
            element={<HeadTeacherBani />}
          />
          <Route
            path="/user/settings/testimonials"
            element={<ListTestimonials />}
          />
          <Route
            path="/user/settings/testimonials/create"
            element={<NewTestimonials />}
          />
          <Route
            path="/user/settings/testimonials/:id"
            element={<TestimonialDetails />}
          />
          <Route
            path="/user/settings/school-pictures"
            element={<SchoolPictures />}
          />
          <Route
            path="/user/settings/social-media"
            element={<SocialMedia />}
          />
          <Route
            path="/user/profile"
            element={<EditProfilePage />}
          />

          {/* account panel */}
          <Route path="/accounts/dashboard" element={<AccDashboardPage />} />
          <Route
            path="/accounts/bank-transaction"
            element={<BankTransactionListPage />}
          />
          <Route
            path="/accounts/bank-transaction/create"
            element={<CreateTransaction />}
          />
          <Route path="/accounts/income" element={<IncomeistPage />} />
          <Route path="/accounts/income/create" element={<CreateIncome />} />
          <Route path="/accounts/expense" element={<ExpenseistPage />} />
          <Route path="/accounts/expense/create" element={<CreateExpense />} />
          <Route path="/accounts/salary" element={<SalaryistPage />} />
          <Route path="/accounts/salary/create" element={<CreateSalary />} />
          <Route path="/accounts/report" element={<ReportForm />} />

          {/* developer mode */}
          <Route path="/developer/dashboard" element={<DevDashboardPage />} />
          <Route path="/developer/messages" element={<DevMessagesPage />} />
          <Route
            path="/developer/messages/create"
            element={<MessageCreatePage />}
          />
          <Route
            path="/developer/messages/:id"
            element={<DevMessageDetailsPage />}
          />
          <Route
            path="/developer/announcement"
            element={<AnnouncementList />}
          />
          <Route
            path="/developer/announcement/:id"
            element={<MessageDetailsPage />}
          />
          <Route
            path="/developer/announcement/create"
            element={<CreateAnnouncementPage />}
          />
          <Route path="/developer/users" element={<ListUsers />} />
          <Route path="/developer/users/create" element={<DevCreateUser />} />
          <Route path="/developer/users/edit/:id" element={<EditUserPage />} />
          <Route path="/developer/schools" element={<DevListSchools />} />
          <Route
            path="/developer/schools/create"
            element={<DevCreateSchool />}
          />
          <Route
            path="/developer/schools/edit/:id"
            element={<DevEditSchoolPage />}
          />
          <Route path="/developer/schools/:id" element={<ViewSchoolPage />} />
          <Route
            path="/developer/schools/edit-link/:id"
            element={<DevEditSchoolLink />}
          />
          <Route
            path="/developer/schools/edit-permission/:id"
            element={<DevEditPermission />}
          />
          <Route path="/developer/contacts" element={<DevContactsPage />} />
          <Route
            path="/developer/contacts/:id"
            element={<ContactDetailsPage />}
          />
          <Route
            path="/developer/demo-requests"
            element={<ListDemoRequests />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
