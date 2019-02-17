import Component from "@ember/component";

export default Component.extend({
  title: "null",
  type: "null",
  typing: true,
  matching: true,
  filterParams: ["matching", "typing"],

  init() {
    this._super(...arguments);
    this.filter("").then(allResults => {
      this.set("results", allResults.results);
    });
  },

  actions: {
    filter(sort, search) {
      if (search !== undefined && search !== "") {
        this.set("typing", false);
        this.set("matching", false);
        this.set("filterParams", []);
      }
      if (sort !== "") {
        this.set("search", "");
      }
      let filterParams = this.get("filterParams");
      let filterAction = this.filter;
      filterAction(filterParams, sort, search).then(filterResults => {
        this.set("results", filterResults.results);
      });
    },
    addToFilter(param) {
      let filterParams = this.get("filterParams");
      let double = 0;
      this.set("search", "");

      filterParams.forEach(i => {
        if (i == param) {
          double++;
        }
      });

      if (double == 0) {
        if (param == "matching") this.set("matching", true);
        if (param == "typing") this.set("typing", true);
        filterParams.pushObject(param);
      } else {
        if (param == "matching") this.set("matching", false);
        if (param == "typing") this.set("typing", false);
        filterParams.removeObject(param);
      }
      this.set("filterParams", filterParams);
    },
    filterClear() {
      this.set("typing", false);
      this.set("matching", false);
      this.set("filterParams", []);
    },
  }
});
