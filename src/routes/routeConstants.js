// containerPath will always be relative to src

/*
  {
    path: string,
    exact: anyOf([true, false]),
    routeComponentParent: oneOf(["containers", "components", "UIComponents", "common"]),
    routeComponentPath: string,
    isAuthenticated: anyOf([true, false])
  }
*/

const routes = {
  TIMESHEET: {
    path: "/",
    exact: true,
    routeComponentParent: "containers",
    routeComponentPath: "TimeSheetContainer",
  },
  // CONFIRM: {
  //   path: "/confirm",
  //   routeComponentPath: "App"
  // },
  // FORGOT: {
  //   path: "/forgot",
  //   routeComponentPath: "App"
  // },
  // RESET: {
  //   path: "/reset",
  //   routeComponentPath: "App"
  // }
  // /
};

export default routes;
