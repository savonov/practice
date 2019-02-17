import Controller from "@ember/controller";

export default Controller.extend({
  answers: [],
  wrong: [],
  right: [],
  DefinitalyRightAnswers: [],
  begin: [],
  end: [],
  done: false,
  actions: {
    clear() {
      this.set("right", []);
      this.set("wrong", []);
      this.set("answers", []);
      this.set("done", false);
      console.clear();
    },
    fullClear() {
      clear();
      this.set("begin", []);
      this.set("end", []);
      this.set("DefinitalyRightAnswers", []);
    },
    check() {
      this.set("right", []);
      this.set("wrong", []);
      let answers = this.get("answers");
      let DefinitalyRightAnswers = this.get("DefinitalyRightAnswers");
      let right = this.get("right");
      let wrong = this.get("wrong");
      answers.forEach((answer, index) => {
        DefinitalyRightAnswers.forEach(check => {
          if (index == check.id) {
            if (answer != "")
              if (answer == check.text) {
                let r = {
                  id: index,
                  text: answer,
                  task_id: check.task_id
                };
                right.push(r);
                this.set("right", right);
              } else {
                let w = {
                  id: index,
                  text: answer,
                  task_id: check.task_id
                };
                wrong.push(w);
                this.set("wrong", wrong);
              }
          }
        });
      });
      if (
        this.get("right").length === this.get("DefinitalyRightAnswers").length
      ) {
        this.set("done", true);
      } else {
        this.set("done", false);
      }
      console.log("Right: ", this.get("right"));
      console.log("Wrong: ", this.get("wrong"));
    },
    brokeAWord: function(word, id, task_id) {
      console.log("task_id: ", task_id);

      let spaceWidth = 1;
      // this controller is working with only one letter
      let word_length = word.length;
      let random_emptyness = Math.floor(Math.random() * word_length);
      let beginning = word.slice(0, random_emptyness);
      let end = word.slice(random_emptyness + spaceWidth, word_length);
      let space = word.slice(random_emptyness, random_emptyness + spaceWidth);
      console.log(
        word +
          " | " +
          word_length +
          " | " +
          random_emptyness +
          " | " +
          beginning +
          "*" +
          end
      );
      // Creating objects for comparing
      let bg = {
        id: id,
        text: beginning,
        task_id: task_id
      };
      let ed = {
        id: id,
        text: end,
        task_id: task_id
      };
      let dra = {
        id: id,
        text: space,
        task_id: task_id
      };
      let _begin = this.get("begin");
      let _end = this.get("end");
      let _definitalyRightAnswers = this.get("DefinitalyRightAnswers");

      _begin.push(bg);
      _end.push(ed);
      _definitalyRightAnswers.push(dra);

      this.set("begin", _begin);
      this.set("end", _end);
      this.set("DefinitalyRightAnswers", _definitalyRightAnswers);
    },
    lolObserver() {
      console.clear();
      console.log("Answers: ", this.get("answers"));
      console.log("Begins: ", this.get("begin"));
      console.log("End: ", this.get("end"));
      console.log("DRA: ", this.get("DefinitalyRightAnswers"));
    }
  }
});
