const router = require("./ContactsRouter");

describe("Contacts Router", () => {
  test("it defines the three post routes", () => {
    const routes = [
      { path: "/addContact", method: "post" },
      { path: "/getList", method: "post" },
      { path: "/getRecentList", method: "post" },
    ];
    routes.forEach((route) => {
      const match = router.stack.find(
        (item) =>
          item.route.path === route.path && item.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
