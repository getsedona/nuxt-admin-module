import NuxtAdminModule from "..";

export default {
  modules: [
    [
      NuxtAdminModule,
      {
        testKey: "testParamValue"
      }
    ]
  ],

  build: {
    extractCSS: true,
  }
};
