import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    data: {
      permission: 'view',
      resource: 'dashboard'
    },
  },
  {
    title: 'Profile',
    icon: 'nb-compose',
    link: '/pages/profile',
    data: {
      permission: 'view',
      resource: 'profile'
    },
  },
  //totalcourse
  {
    title: 'Search Course',
    icon: 'nb-search',
    link: '/pages/totalcourse',
    data: {
      permission: 'view',
      resource: 'totalcourse'
    },
  },
  // {
  //   title: 'Search College/Course',
  //   icon: 'nb-search',
  //icon: 'nb-edit',
  //   link: '/pages/search',
  //   data: {
  //     permission: 'view',
  //     resource: 'search'
  //   },
  // },
  
  /**Admin Menus*/
  {
    title: 'Dashboard',
    icon: 'nb-compose',
    link: '/pages/adminDashboard',
    data: {
      permission: 'view',
      resource: 'adminDashboard'
    },
  },
  {
    title: 'Student Management',
    icon: 'fas fa-user-graduate',
    link: '/pages/studentManagement',
    data: {
      permission: 'view',
      resource: 'studentManagement'
    },
  },
  {
    title: 'Online Entrance Exam',
    icon: 'ion-filing',
    link: '/pages/adminApplication',
    data: {
      permission: 'view',
      resource: 'adminApplication'
    },
  },

  {
    title: 'Personal Interview Exam',
    icon: 'ion-clipboard',
    link: '/pages/adminEligibility',
    data: {
      permission: 'view',
      resource: 'adminEligibility'
    },
  },
  {
    title: 'Update Marks & Seat Allocation',
    icon: 'ion-planet',
    link: '/pages/adminForeignOffice',
    data: {
      permission: 'view',
      resource: 'adminForeignOffice'
    },
  },
  {
    title: 'Institute Management',
    icon: 'far fa-building',
    link: '/pages/adminInstitute',
    data: {
      permission: 'view',
      resource: 'adminInstitute'
    },
  },
  {
    title: 'Reports',
    icon: 'nb-bar-chart',
    link: '/pages/AdminReport',
    data: {
      permission: 'view',
      resource: 'adminReport'
    },
  },

  {
    title: 'My Application',
    icon: 'ion-filing',
    link: '/pages/application',
    data: {
      permission: 'view',
      resource: 'application'
    },
  },   
  {
    title: 'UTILITIES',
    group: true,
    data: {
      permission: 'view',
      resource: 'UTILITIES'
    },
  },
  {
    title: 'Downloads',
    icon: 'fas fa-download',
    link: '/pages/downloads',
    data: {
      permission: 'view',
      resource: 'downloads'
    },
  },
  {
    title: 'FAQ',
    icon: 'ion-help',
    data: {
      permission: 'view',
      resource: 'faq'
    },
  },
  {
    title: 'Help',
    icon: 'ion-help-buoy',
    link: '/pages/help',
    data: {
      permission: 'view',
      resource: 'help'
    },
  },

   /**Institute Menus*/
   {
    title: 'Applications',
    icon: 'ion-filing',
    link: '/pages/institute-application',
    data: {
      permission: 'view',
      resource: 'institute-application'
    },
  },
  {
    title: 'College Management',
    icon: 'nb-compose',
    link: '/pages/college-management',
    data: {
      permission: 'view',
      resource: 'college-management'
    },
  }, 
   {
    title: 'course-list',
    icon: 'nb-compose',
    link: '/pages/course-list',
    data: {
      permission: 'view',
      resource: 'course-list'
    },
  }, 


  {
    title: 'Change Theme',
    icon: 'nb-drops',
    children: [
      {
        title: 'Light',
      },
      {
        title: 'Cosmic',
      },      
      {
        title: 'Corporate',
      },
    ],
    data: {
      permission: 'view',
      resource: 'theme'
    },
  },
    /**Admin Menus*/

    // {
    //   title: 'Admin Application',
    //   icon: 'ion-filing',
    //   link: '/admin/Applications',
    //   data: {
    //     permission: 'view',
    //     resource: 'Applications'
    //   },
    // },

     

];
