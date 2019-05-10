import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchModule } from './search/search.module';
import { ProfileModule } from "./profile/profile.module";
import { DownloadsModule } from "./downloads/downloads.module";
import { ApplicationModule } from "./application/application.module";
import { CartModule } from "./cart/cart.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CollegeinfoModule } from './collegeinfo/collegeinfo.module';
import { TotalCourseModule } from './totalcourse/totalcourse.module';
import { SettingsComponent } from './settings/settings.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { SelectCollegeModule } from "./selectcollege/selectcollege.module";
import { CourseModule } from "./course/course.module";
import { ApplicationStepsModule } from "./application/applicationsteps/applicationsteps.module";
import { PreferencesModule } from './cart/preference/preferences.module';
import { SecondCancelModule } from "./paymentrequests/SecondCancel.module";
import { ThirdCancelModule } from "./paymentrequests/ThirdCancel.module";
import { SecondFailureModule } from "./paymentrequests/SecondFailure.module";
import { ThirdFailureModule } from "./paymentrequests/ThirdFailure.module";
import { searchCourseModule } from "./course/searchCourse/searchCourse.module";
import { FirstSuccessModule } from "./paymentrequests/FirstSuccess.module";
import { HelpModule } from "./help/help.module";
import { Data } from "../shared/data";
import { PeerModule } from "./peers/peers.module";

//institute
import { InstituteApplicationModule } from "../institute/institute-application/institute-application.module";
import { CourseListModule } from "../institute/course-list/course-list.module";
import { CourseManagementModule } from '../institute/course-list/course-management/course-management.module';
import { CollegeManagementModule } from '../institute/college-management/college-management.module';

//Admin
import { AdminDashboardModule } from '../admin/admin-dashboard/admin-dashboard.module';
import { AdminApplicationModule } from "../admin/application/application.module";
import { AdminEligibilityModule } from "../admin/eligibility/eligibility.module";
import { AdminViewModule } from '../admin/view/view.module';
import { AdminErrataModule } from '../admin/errata/errata.module';
import { AdminForeignOfficeModule } from '../admin/foreign_office/foreignoffice.module';
import { AdminReuploadedTranscriptModule } from '../admin/re_Uploaded_Transcript/re_Uploaded_Transcript.module';
import { StudentMgmtModule } from '../admin/student-management/student-management.module';
import { AdminReportModule } from '../admin/report/report.module';
import { InstituteManagementModule } from '../admin/institute-management/institute-management.module';
import { ViewInstituteModule } from '../admin/view-institute/view-institute.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    SearchModule,
    DashboardModule,
    MiscellaneousModule,
    ProfileModule,
    DownloadsModule,
    CartModule,
    ApplicationModule,
    CollegeinfoModule,
    TotalCourseModule,
    NgxUploaderModule,
    SelectCollegeModule,
    CourseModule,
    ApplicationStepsModule,
    InstituteApplicationModule,
    CollegeManagementModule,
    CourseListModule,
    SecondCancelModule,
    SecondFailureModule,
    ThirdCancelModule,
    ThirdFailureModule,
    PreferencesModule,
    searchCourseModule,
    FirstSuccessModule,
    CourseManagementModule,
    HelpModule,
    PeerModule,
    /*########### Admin Modules ############*/
    AdminDashboardModule,
    AdminApplicationModule,
    AdminEligibilityModule,
    AdminViewModule,
    AdminErrataModule,
    AdminForeignOfficeModule,
    AdminReuploadedTranscriptModule,
    StudentMgmtModule,
    AdminReportModule,
    InstituteManagementModule,
    ViewInstituteModule,
  ],
  providers: [Data],
  declarations: [
    ...PAGES_COMPONENTS,
    SettingsComponent,
  ],
  exports: [
    NgxUploaderModule,
  ],
})
export class PagesModule {
}
