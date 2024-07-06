const routes = [
  {
    route: "/user/dashboard",
    name: "Dashboard",
  },
  {
    route: "/user/monthly-dashboard",
    name: "Monthly Dashboard",
  },
  {
    route: "/user/data-entry",
    name: "Data Entry",
    subRoutes: [
      {
        route: "/user/data-entry/production",
        name: "Production",
      },
      {
        route: "/user/data-entry/manpower",
        name: "Manpower",
      },
      {
        route: "/user/data-entry/machines",
        name: "Machines",
      },
      {
        route: "/user/data-entry/machine-production",
        name: "Machine Production",
      },
      {
        route: "/user/data-entry/monthly-target",
        name: "Monthly Target",
      },
      {
        route: "/user/data-entry/down-time",
        name: "Down Time",
      },
    ],
  },
];

export default routes;
