import React, { useState } from "react";
import {
  Search,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Save,
  Edit3,
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Mail,
  FileSpreadsheet,
  Scroll
} from "lucide-react";

// ============================================================================
// DATA & MOCKS
// ============================================================================

type Application = {
  id: string;
  studentName: string;
  guardian1: string;
  email: string;
  status: string;
  waitingListNumber: number | null;
  waitingListPosition: number | null;
  submissionDate: string;
};

const mockApplications: Application[] = [
  { id: "1f0", studentName: "Chloe Loftus 1", guardian1: "SANJEEV JAIN", email: "sanjeevjain7010@gmail.com", status: "Complete", waitingListNumber: null, waitingListPosition: null, submissionDate: "2025-01-20" },
  { id: "1C1", studentName: "JIEC 01", guardian1: "marish verma", email: "marish.v@bravo.aas.com", status: "Waiting", waitingListNumber: null, waitingListPosition: null, submissionDate: "2025-01-19" },
  { id: "1C2", studentName: "john-ner one", guardian1: "marish verma", email: "marish.v@bravo.aas.com", status: "Waiting", waitingListNumber: null, waitingListPosition: null, submissionDate: "2025-01-18" },
  { id: "1E3", studentName: "Aarav Sharma", guardian1: "Nishit", email: "nishmitsh421@gmail.com", status: "Applied", waitingListNumber: null, waitingListPosition: null, submissionDate: "2025-01-15" },
  { id: "1E4", studentName: "Sarah Connor", guardian1: "Kyle Reese", email: "kyle.r@future.com", status: "Applied", waitingListNumber: null, waitingListPosition: null, submissionDate: "2025-01-14" },
  { id: "1E5", studentName: "John Doe", guardian1: "Jane Doe", email: "jane.d@email.com", status: "Complete", waitingListNumber: null, waitingListPosition: null, submissionDate: "2025-01-10" },
];

type Enrolment = {
  id: string;
  studentName: string;
  guardian1: string;
  email: string;
  status: string;
  classAssigned: string;
  enrolmentDate: string;
};

const mockEnrolments: Enrolment[] = [
  { id: "E001", studentName: "Emma Wilson", guardian1: "Sarah Wilson", email: "sarah.wilson@email.com", status: "Enrolled", classAssigned: "1st Year", enrolmentDate: "2025-01-15" },
  { id: "E002", studentName: "Liam O'Brien", guardian1: "Michael O'Brien", email: "michael.obrien@email.com", status: "Enrolled", classAssigned: "2nd Year", enrolmentDate: "2025-01-16" },
  { id: "E003", studentName: "Sophie Murphy", guardian1: "Claire Murphy", email: "claire.murphy@email.com", status: "Enrolled", classAssigned: "3rd Year", enrolmentDate: "2025-01-17" },
  { id: "E004", studentName: "Jack Kelly", guardian1: "David Kelly", email: "david.kelly@email.com", status: "Pending", classAssigned: "1st Year", enrolmentDate: "2025-01-18" },
  { id: "E005", studentName: "Olivia Ryan", guardian1: "Mary Ryan", email: "mary.ryan@email.com", status: "Enrolled", classAssigned: "4th Year", enrolmentDate: "2025-01-19" },
  { id: "E006", studentName: "Noah Walsh", guardian1: "John Walsh", email: "john.walsh@email.com", status: "Enrolled", classAssigned: "1st Year", enrolmentDate: "2025-01-20" },
  { id: "E007", studentName: "Ava McCarthy", guardian1: "Patricia McCarthy", email: "patricia.mccarthy@email.com", status: "Withdrawn", classAssigned: "2nd Year", enrolmentDate: "2025-01-21" },
];

// ============================================================================
// ICONS & SHARED
// ============================================================================

const InlineArrowLeft = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto mt-12 mb-6 text-center text-[11px] text-black font-medium space-y-6">
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
        <span>
          Powered by <strong className="font-extrabold">Unique Schools</strong>
        </span>
        <button className="hover:underline text-gray-800 transition-colors">
          Terms and conditions
        </button>
        <button className="hover:underline text-gray-800 transition-colors">
          Privacy Policy
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-1 text-gray-900">
        <span>Need Support - email</span>
        <a
          href="mailto:support@uniqueschools.ie"
          className="text-blue-700 font-bold hover:underline mx-1 transition-colors"
        >
          support@uniqueschools.ie
        </a>
        <span>and a member of the team will respond to you</span>
      </div>
    </footer>
  );
}

// ============================================================================
// MODULE: DASHBOARD
// ============================================================================

// Helper Component for Dotted Row with Status Dot
const StatRow = ({ label, value, valueClass = "text-black", dotColor }: { label: string, value: string | number, valueClass?: string, dotColor?: string }) => (
  <div className="flex items-end justify-between text-sm group">
    <div className="flex items-center gap-2">
      {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />}
      <span className="text-gray-600 font-medium">{label}</span>
    </div>
    <div className="flex-1 mx-2 border-b-2 border-dotted border-gray-200 mb-1.5 opacity-60"></div>
    <span className={`font-bold ${valueClass}`}>{value}</span>
  </div>
);

function DashboardModule({ onNavigate }: { onNavigate: (module: "applications" | "enrolments" | "offers") => void }) {
  const [academicYear, setAcademicYear] = useState("2025/2026");

  // Data hardcoded from user screenshot request
  const offerStats = {
    intake: 60,
    applicants: 145,
    lateApplications: 12,
    applicationsPending: 28,
    applicationsReviewed: 117,
    enrolmentPending: 15,
    enrolmentReviewed: 42,
    totalPlacesAvailable: 60,
    offered: 65,
    accepted: 55,
    declined: 8,
    withdrawals: 2,
    acceptancesRemaining: 5,
    cancelled: 12,
  };

  const reportStats = {
    applicationsReceived: 48,
    intake: 20,
    originalWaitingList: 15,
    finalWaitingList: 0,
    offersSentCriteria: [7, 4, 5, 4, 0, 0],
    offersAcceptedCriteria: [0, 0, 0, 0, 0, 0],
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of your school's admissions performance</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Academic Year Dropdown */}
          <div className="relative bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm cursor-pointer hover:border-gray-300 group">
            <Calendar className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            <span>Academic Year: <strong className="text-black">{academicYear}</strong></span>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-2 group-hover:text-gray-600" />
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
            >
              <option value="2026/2027">2026/2027</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
            </select>
          </div>

          <button className="bg-[#fbbf24] hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Increased gap-5 back to gap-6 for better breathing room */}
        
        {/* LEFT COLUMN: Offers and Acceptances */}
        <div className="space-y-6"> {/* Increased space-y-4 back to space-y-6 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50"> {/* Standardized padding px-6 py-4 */}
              <h3 className="font-bold text-gray-900 text-lg">Offers and acceptances</h3>
            </div>
            
            {/* Hero Stats */}
            <div className="flex divide-x divide-gray-100 border-b border-gray-100 bg-white">
              <div className="flex-1 p-5 text-center"> {/* Standardized p-5 */}
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Intake</div>
                <div className="text-4xl font-extrabold text-gray-900">{offerStats.intake}</div>
              </div>
              <div className="flex-1 p-5 text-center bg-blue-50/30">
                 <div className="text-xs text-blue-500 uppercase font-bold tracking-wider mb-2">Applicants</div>
                 <div className="text-4xl font-extrabold text-blue-600">{offerStats.applicants}</div>
              </div>
            </div>

            {/* Detailed Stats Grid with Dotted Leaders */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 flex-1"> {/* Increased gap-y-2.5 to gap-y-4 for consistent spacing */}
               <StatRow label="Offered" value={offerStats.offered} dotColor="bg-blue-500" />
               <StatRow label="Accepted" value={offerStats.accepted} valueClass="text-green-600" dotColor="bg-green-500" />
               <StatRow label="Declined" value={offerStats.declined} valueClass="text-red-600" dotColor="bg-red-500" />
               <StatRow label="Withdrawals" value={offerStats.withdrawals} dotColor="bg-orange-500" />
               <StatRow label="Acceptances remaining" value={offerStats.acceptancesRemaining} dotColor="bg-purple-500" />
               <StatRow label="Cancelled" value={offerStats.cancelled} valueClass="text-gray-400" dotColor="bg-gray-300" />
               
               {/* Spacer/Divider */}
               <div className="col-span-1 md:col-span-2 border-t border-gray-100 my-2"></div>

               <StatRow label="Late applications" value={offerStats.lateApplications} dotColor="bg-red-400" />
               <StatRow label="Enrolment pending" value={offerStats.enrolmentPending} valueClass="text-yellow-600" dotColor="bg-yellow-500" />
               <StatRow label="Applications pending" value={offerStats.applicationsPending} valueClass="text-yellow-600" dotColor="bg-amber-500" />
               <StatRow label="Enrolment reviewed" value={offerStats.enrolmentReviewed} dotColor="bg-teal-500" />
               <StatRow label="Applications reviewed" value={offerStats.applicationsReviewed} dotColor="bg-indigo-500" />
               <StatRow label="Total places available" value={offerStats.totalPlacesAvailable} dotColor="bg-gray-800" />
            </div>
          </div>

          {/* QUICK ACTIONS CARD */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"> {/* Standardized p-6 */}
             <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-500">Quick Actions</h3>
             <div className="grid grid-cols-3 gap-4">
               {/* Bulk Email Card */}
               <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all group h-24">
                 <div className="p-2 bg-blue-100 rounded-full text-blue-700 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                 </div>
                 <span className="text-xs font-bold text-gray-700 leading-tight">Bulk<br/>Email</span>
               </button>

               {/* Export Card */}
               <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-green-300 hover:shadow-md hover:bg-green-50/30 transition-all group h-24">
                 <div className="p-2 bg-green-100 rounded-full text-green-700 group-hover:scale-110 transition-transform">
                   <FileSpreadsheet className="w-5 h-5" />
                 </div>
                 <span className="text-xs font-bold text-gray-700 leading-tight">Export<br/>Lists</span>
               </button>

               {/* Waiting List Card */}
               <button onClick={() => onNavigate("applications")} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-amber-300 hover:shadow-md hover:bg-amber-50/30 transition-all group h-24">
                 <div className="p-2 bg-amber-100 rounded-full text-amber-700 group-hover:scale-110 transition-transform">
                   <Clock className="w-5 h-5" />
                 </div>
                 <span className="text-xs font-bold text-gray-700 leading-tight">Waiting<br/>List</span>
               </button>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: School admission notice report */}
        <div className="space-y-6"> {/* Standardized space-y-6 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50"> {/* Standardized padding */}
              <h3 className="font-bold text-gray-900 text-lg">School admission notice report</h3>
            </div>
            
            <div className="p-6 space-y-8 flex-1">
              {/* Report Summary */}
              <div className="space-y-4 pb-8 border-b border-gray-100"> {/* Increased spacing for readability */}
                <StatRow label="Applications received" value={reportStats.applicationsReceived} />
                <StatRow label="Intake" value={reportStats.intake} />
                <StatRow label="Original Waiting List" value={reportStats.originalWaitingList} />
                <StatRow label="Final Waiting List" value={reportStats.finalWaitingList} />
              </div>

              {/* Combined Criteria Table */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Criteria Breakdown</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold">
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left">Criteria Name</th>
                        <th className="px-4 py-3 text-center bg-blue-50/30 text-blue-700 border-l border-gray-100">Offers Sent</th>
                        <th className="px-4 py-3 text-center bg-green-50/30 text-green-700 border-l border-gray-100">Accepted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reportStats.offersSentCriteria.map((sent, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-700">Criteria {index + 1}</td>
                          <td className="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50/10">{sent}</td>
                          <td className="px-4 py-3 text-center font-bold text-green-600 bg-green-50/10">
                            {reportStats.offersAcceptedCriteria[index]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// MODULE: ENROLMENTS
// ============================================================================

function AdminEnrolmentsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const totalEnrolments = 42;
  const enrolledCount = 38;
  const pendingCount = 3;
  const withdrawnCount = 1;

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => (
    <div className="inline-flex flex-col ml-1">
      <ChevronUp className={`w-3 h-3 -mb-1 ${sortColumn === column && sortDirection === "asc" ? "text-black" : "text-gray-400"}`} />
      <ChevronDown className={`w-3 h-3 ${sortColumn === column && sortDirection === "desc" ? "text-black" : "text-gray-400"}`} />
    </div>
  );

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-black mb-6">Enrolments</h1>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 className="text-sm font-bold text-black mb-1">Enrolled Students</h2>
        <p className="text-sm text-gray-700">You have <strong>{totalEnrolments}</strong> students enrolled in total</p>
        <div className="flex gap-6 mt-2 text-xs text-gray-600">
          <span>Enrolled: <strong className="text-green-700">{enrolledCount}</strong></span>
          <span>Pending: <strong className="text-yellow-700">{pendingCount}</strong></span>
          <span>Withdrawn: <strong className="text-red-700">{withdrawnCount}</strong></span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div>
              <label className="block text-xs font-bold text-black mb-2">Enrolment Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-200">
                <option>All</option>
                <option>Enrolled</option>
                <option>Pending</option>
                <option>Withdrawn</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-2">Class Year</label>
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-200">
                <option>All</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>5th Year</option>
                <option>6th Year</option>
              </select>
            </div>
            <div className="text-sm text-gray-700 pt-0 md:pt-6">Total filtered: <strong>{totalEnrolments}</strong></div>
          </div>
          <div className="pt-0 md:pt-6">
            <button className="px-6 py-2.5 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto">Export Excel</button>
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Find a student" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["id", "studentName", "guardian1", "email"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-bold text-black">
                    <button onClick={() => handleSort(col)} className="flex items-center hover:text-gray-600 uppercase">
                      {col.replace(/([A-Z])/g, ' $1').trim()}
                      <SortIcon column={col} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-bold text-black">Status</th>
                {["classAssigned", "enrolmentDate"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-bold text-black">
                    <button onClick={() => handleSort(col)} className="flex items-center hover:text-gray-600 uppercase">
                      {col.replace(/([A-Z])/g, ' $1').trim()}
                      <SortIcon column={col} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-bold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEnrolments.map((enrolment, index) => (
                <tr key={enrolment.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-4 py-3 text-sm text-gray-900">{enrolment.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{enrolment.studentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{enrolment.guardian1}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{enrolment.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${enrolment.status === "Enrolled" ? "bg-green-100 text-green-800" : enrolment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {enrolment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{enrolment.classAssigned}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{enrolment.enrolmentDate}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">VIEW</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE: APPLICATION DETAILS (COMPONENTS)
// ============================================================================

type ApplicationHeaderProps = {
  applicationStatus: string;
  setApplicationStatus: (status: string) => void;
  reviewStatus: string;
  setReviewStatus: (status: string) => void;
  onBack: () => void;
};

function ApplicationHeader({ applicationStatus, setApplicationStatus, reviewStatus, setReviewStatus, onBack }: ApplicationHeaderProps) {
  return (
    <div className="mb-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-4">
        <InlineArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Applications</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black mb-2">Chloe Loftus 1</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-gray-700">Application ID: <strong>100</strong></span>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Application Status:</span>
              <select value={applicationStatus} onChange={(e) => setApplicationStatus(e.target.value)} className="px-3 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-200">
                <option>Cancelled</option>
                <option>Complete</option>
                <option>Waiting</option>
                <option>Applied</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Original Pdf
          </button>
          <button className="px-4 py-2 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Pdf
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Application Review Status:</span>
          <select value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)} className="px-3 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-200">
            <option>Not Reviewed</option>
            <option>Under Review</option>
            <option>Reviewed</option>
          </select>
        </div>
        <span className="text-gray-700">Late Application: <strong>No</strong></span>
      </div>
    </div>
  );
}

function SidebarNavigation({ activeSidebarTab, setActiveSidebarTab, items }: { activeSidebarTab: string, setActiveSidebarTab: (t: string) => void, items: {id: string, label: string}[] }) {
  return (
    <div className="w-full md:w-80">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden sticky top-6">
        <div className="p-4 space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSidebarTab(item.id)}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded transition-colors ${activeSidebarTab === item.id ? "bg-[#fbbf24] text-black" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditControls({ isEditing, setIsEditing, onSave }: { isEditing: boolean, setIsEditing: (v: boolean) => void, onSave?: () => void }) {
  return (
    <div className="pt-6 flex gap-4">
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)} className="px-8 py-2.5 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm">
          Edit Details
        </button>
      ) : (
        <>
          <button onClick={() => { if (onSave) onSave(); setIsEditing(false); }} className="px-8 py-2.5 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="px-8 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-black font-bold text-sm rounded-lg transition-colors shadow-sm">
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

// ... (Continuing with form components from AdminApplicationDetail, simplified for brevity but fully functional)

function StudentDetailsForm({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
          <input type="text" defaultValue="Chloe 1" disabled={!isEditing} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
          <input type="text" defaultValue="Loftus" disabled={!isEditing} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Certificate Forename</label>
          <input type="text" defaultValue="FG" disabled={!isEditing} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Certificate Surname</label>
          <input type="text" defaultValue="FG" disabled={!isEditing} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth*</label>
          <input type="text" defaultValue="02/12/2000" disabled={!isEditing} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PPSN</label>
          <input type="text" defaultValue="1" disabled={!isEditing} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="female" disabled={!isEditing} className="w-4 h-4" />
            <span className="text-sm">FEMALE</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="male" defaultChecked disabled={!isEditing} className="w-4 h-4" />
            <span className="text-sm">MALE</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function SiblingDetailsForm({ isEditing }: { isEditing: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">Does your student/child have any siblings in the school *</label>
      <div className="space-y-3">
        {["No", "Yes"].map(opt => (
          <label key={opt} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${!isEditing ? "bg-gray-50 border-gray-200" : "hover:bg-gray-50 border-gray-200"}`}>
            <span className="text-sm font-medium text-gray-900">{opt}</span>
            <input type="radio" name="siblings" value={opt.toLowerCase()} defaultChecked={opt === "No"} disabled={!isEditing} className="w-5 h-5 text-orange-500 focus:ring-orange-500" />
          </label>
        ))}
      </div>
    </div>
  );
}

function DocumentsForm({ isEditing }: { isEditing: boolean }) {
  const [documents, setDocuments] = useState([
    { id: 1, created: "01-11-2025", by: "unknown one", type: "BIRTHCERTIFICATE", document: "BIRTHCERTIFICATE", name: "84fb.jpg" },
    { id: 2, created: "14-01-2025", by: "manish verma", type: "SIGNATURE", document: "SIGNATURE", name: "manish_verma.png" },
  ]);

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-end">
        <button className="px-8 py-2 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm uppercase">Add</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{doc.created}</td>
                <td className="px-6 py-4 text-gray-900">{doc.type}</td>
                <td className="px-6 py-4 text-gray-900">{doc.name}</td>
                <td className="px-6 py-4">
                  <button className="text-gray-600 hover:text-black font-medium">VIEW</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const PlaceholderForm = ({ title }: { title: string }) => (
  <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p>Form content would appear here.</p>
  </div>
);

// ============================================================================
// COMPONENT: ADMIN APPLICATION DETAIL (MAIN)
// ============================================================================

const SIDEBAR_ITEMS: Record<string, { id: string; label: string }[]> = {
  student: [
    { id: "details", label: "Student Details" },
    { id: "sibling", label: "Sibling Details" },
    { id: "address", label: "Student Address" },
    { id: "profile", label: "Student Profile" },
    { id: "emergency", label: "Emergency Contact No" },
  ],
  guardian: [
    { id: "guardian1-details", label: "Guardian 1 Details" },
    { id: "guardian1-address", label: "Guardian 1 Address" },
    { id: "guardian2-details", label: "Guardian 2 Details" },
    { id: "guardian2-address", label: "Guardian 2 Address" },
    { id: "preference", label: "Preference" },
  ],
  criteria: [{ id: "criteria-details", label: "Criteria Details" }],
  "asd-info": [
    { id: "asd-details", label: "ASD details" },
    { id: "asd-documents", label: "ASD Documents" },
  ],
  educational: [
    { id: "primary-school", label: "Primary School" },
    { id: "educational-needs", label: "Educational Needs" },
    { id: "school-offers", label: "School Offers" },
    { id: "subject-choice", label: "Subject Choice" },
    { id: "language-choice", label: "Language Choice" },
  ],
  medical: [
    { id: "medical-info", label: "Medical Info" },
    { id: "medical-history", label: "Medical History" },
  ],
  custody: [{ id: "custody-details", label: "Custody Details" }],
  consents: [{ id: "consents-details", label: "Consents Details" }],
  communications: [{ id: "communications-details", label: "Communications Details" }],
  doc: [{ id: "documents-details", label: "Documents Details" }],
  "application-trail": [{ id: "application-trail-details", label: "Application Trail Details" }],
};

function AdminApplicationDetail({ onBack }: { onBack: () => void }) {
  const [applicationStatus, setApplicationStatus] = useState("Cancelled");
  const [reviewStatus, setReviewStatus] = useState("Not Reviewed");
  const [activeTab, setActiveTab] = useState("student");
  const [activeSidebarTab, setActiveSidebarTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsEditing(false);
    const firstSidebarItem = SIDEBAR_ITEMS[tabId]?.[0]?.id;
    setActiveSidebarTab(firstSidebarItem || "");
  };

  const showSidebar = SIDEBAR_ITEMS[activeTab]?.length > 1;

  const renderContent = () => {
    if (activeTab === "student") {
      if (activeSidebarTab === "details") return <StudentDetailsForm isEditing={isEditing} />;
      if (activeSidebarTab === "sibling") return <SiblingDetailsForm isEditing={isEditing} />;
      return <PlaceholderForm title={SIDEBAR_ITEMS.student.find(i => i.id === activeSidebarTab)?.label || "Form"} />;
    }
    if (activeTab === "doc") return <DocumentsForm isEditing={isEditing} />;
    
    // Default fallback for other tabs
    return <PlaceholderForm title={`${activeTab.toUpperCase()} - ${activeSidebarTab}`} />;
  };

  return (
    <div>
      <ApplicationHeader
        applicationStatus={applicationStatus}
        setApplicationStatus={setApplicationStatus}
        reviewStatus={reviewStatus}
        setReviewStatus={setReviewStatus}
        onBack={onBack}
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className={`flex-1 min-w-0 ${!showSidebar ? "w-full" : ""}`}>
          <div className="bg-white border border-gray-200 rounded-t-lg overflow-x-auto">
            <div className="flex border-b border-gray-200 min-w-max">
              {[
                { id: "student", label: "STUDENT INFORMATION" },
                { id: "guardian", label: "GUARDIAN" },
                { id: "criteria", label: "CRITERIA" },
                { id: "asd-info", label: "ASD INFO" },
                { id: "educational", label: "EDUCATIONAL DETAILS" },
                { id: "medical", label: "MEDICAL DETAILS" },
                { id: "custody", label: "CUSTODY INFO" },
                { id: "consents", label: "CONSENTS" },
                { id: "communications", label: "COMMUNICATIONS" },
                { id: "doc", label: "DOCUMENTS" },
                { id: "application-trail", label: "APPLICATION TRAIL" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-white border-b-2 border-orange-400 text-black"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-6">
            {renderContent()}
            
            {(activeTab === "student" || activeTab === "guardian") && (
              <EditControls isEditing={isEditing} setIsEditing={setIsEditing} />
            )}
          </div>
        </div>

        {showSidebar && (
          <SidebarNavigation
            activeSidebarTab={activeSidebarTab}
            setActiveSidebarTab={setActiveSidebarTab}
            items={SIDEBAR_ITEMS[activeTab] || []}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE: APPLICATIONS LIST
// ============================================================================

function ApplicationsListPage({ onNavigate }: { onNavigate: (view: "list" | "detail", id?: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const totalApplications = 48;

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => (
    <div className="inline-flex flex-col ml-1">
      <ChevronUp className={`w-3 h-3 -mb-1 ${sortColumn === column && sortDirection === "asc" ? "text-black" : "text-gray-400"}`} />
      <ChevronDown className={`w-3 h-3 ${sortColumn === column && sortDirection === "desc" ? "text-black" : "text-gray-400"}`} />
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">Applications</h1>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 className="text-sm font-bold text-black mb-1">Your applicants</h2>
        <p className="text-sm text-gray-700">You have received <strong>{totalApplications}</strong> applications in total</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="block text-xs font-bold text-black mb-2">Application Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-200">
                <option>All</option>
                <option>Complete</option>
                <option>Waiting</option>
                <option>Applied</option>
              </select>
            </div>
            <div className="text-sm text-gray-700 pt-0 md:pt-6">Total filtered applicants: <strong>{totalApplications}</strong></div>
          </div>
          <div className="pt-0 md:pt-6">
            <button className="px-6 py-2.5 bg-[#fbbf24] hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto">Export Excel</button>
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Find an applicant" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["id", "studentName", "guardian1", "email"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-bold text-black">
                    <button onClick={() => handleSort(col)} className="flex items-center hover:text-gray-600 uppercase">
                      {col.replace(/([A-Z])/g, ' $1').trim()}
                      <SortIcon column={col} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-bold text-black">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">WAITING LIST NO.</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">WAITING LIST POS.</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">SUBMISSION DATE</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockApplications.map((app, index) => (
                <tr key={app.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-4 py-3 text-sm text-gray-900">{app.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{app.studentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{app.guardian1}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{app.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{app.status}</span>
                      <Edit3 className="w-3 h-3 text-yellow-500" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">{app.waitingListNumber || "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">{app.waitingListPosition || "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{app.submissionDate}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onNavigate("detail", app.id)} className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">VIEW</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN LAYOUT & NAVIGATION
// ============================================================================

export default function App() {
  const [activeModule, setActiveModule] = useState<"dashboard" | "applications" | "enrolments" | "offers">("dashboard");
  const [applicationView, setApplicationView] = useState<"list" | "detail">("list");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleModuleChange = (module: "dashboard" | "applications" | "enrolments" | "offers") => {
    setActiveModule(module);
    setApplicationView("list");
    setIsSidebarOpen(false);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "enrolments", label: "Enrolments", icon: Users },
    { id: "offers", label: "Offers", icon: Scroll },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans flex text-gray-900">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex flex-col leading-none mb-8">
            <span className="text-[42px] font-black tracking-tighter text-black" style={{ lineHeight: "0.8" }}>US</span>
            <span className="text-[11px] font-bold tracking-wide text-black mt-1">UniqueSchools</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isClickable = true;
              return (
                <button
                  key={item.id}
                  onClick={() => isClickable && handleModuleChange(item.id as any)}
                  disabled={!isClickable}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeModule === item.id 
                      ? "bg-[#fbbf24] text-black" 
                      : isClickable
                        ? "text-gray-600 hover:bg-gray-50 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed opacity-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-black">US</span>
            </div>
            <span className="text-sm font-bold text-gray-500">
               / {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {activeModule === "dashboard" && <DashboardModule onNavigate={(mod) => handleModuleChange(mod)} />}
          
          {activeModule === "applications" && (
            applicationView === "list" ? (
              <ApplicationsListPage onNavigate={(view) => {
                setApplicationView(view);
                window.scrollTo(0,0);
              }} />
            ) : (
              <AdminApplicationDetail onBack={() => {
                setApplicationView("list");
                window.scrollTo(0,0);
              }} />
            )
          )}
          
          {activeModule === "enrolments" && <AdminEnrolmentsList />}

          {activeModule === "offers" && (
             <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
               <Scroll className="w-12 h-12 mb-4 opacity-50" />
               <h2 className="text-xl font-bold text-gray-500">Offers Module</h2>
               <p className="text-sm">Manage offers and acceptance letters here.</p>
             </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}