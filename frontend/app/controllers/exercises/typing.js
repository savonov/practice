import Controller from "@ember/controller";

export default Controller.extend({
  answers: [],
  wrong: [],
  right: [],
  DefinitalyRightAnswers: [],
  // this controller is working with only one letter
  clearForms() {
    $(".answer").each(function() {
      $(this).val("");
    });
  },
  responseInvisible() {
    $(".response").each(function() {
      if (!$(this).hasClass("d-none")) {
        $(this).addClass("d-none");
      }
    });
    $(".emptyPart").each(function() {
      if ($(this).hasClass("rightInput")) {
        $(this).removeClass("rightInput");
      }
      if ($(this).hasClass("wrongInput")) {
        $(this).removeClass("wrongInput");
      }
    });
  },
  actions: {
    clear() {
      this.clearForms();
      this.set("right", []);
      this.set("wrong", []);
      this.set("answers", []);
      this.responseInvisible();
    },
    check() {
      console.clear();
      this.responseInvisible();
      let answers = this.get("answers");
      this.set("right", []);
      this.set("wrong", []);
      // Add to right/wrong arrays
      answers.forEach(answer => {
        let id = answer.split("-")[0];
        let answer_str = answer.split("-")[1];
        this.get("DefinitalyRightAnswers").forEach(checker => {
          let id_checker = checker.split("-")[0];
          let check_answer_str = checker.split("-")[1];
          if (id == id_checker) {
            if (answer_str == check_answer_str) {
              let right = this.get("right");
              right.pushObject(answer);
              this.set("right", right);
            } else {
              let wrong = this.get("wrong");
              wrong.pushObject(answer);
              this.set("wrong", wrong);
            }
          }
        });
      });
      console.log("Right: " + this.get("right"));
      console.log("Wrong: " + this.get("wrong"));

      // Visualization
      this.get("wrong").forEach(wrong => {
        let id = wrong.split("-")[0];
        let input = $("." + id + "-answer");
        let res = $("#" + id + "-response_wrong");
        input.val("");
        input.addClass("wrongInput");
        res.removeClass("d-none");
        let answ = this.get("answers");
        answ.removeObject(wrong);
        this.set("answers", answ);
      });
      // right
      this.get("right").forEach(right => {
        let id = right.split("-")[0];
        let input = $("." + id + "-answer");
        let res = $("#" + id + "-response_right");
        input.addClass("rightInput");
        res.removeClass("d-none");
      });
    },
    addToAnswers(item) {
      console.clear();
      console.log("inputing");
      console.log("ForCheking: ", this.get("DefinitalyRightAnswers"));
      let beginning = $("." + item.id + "-beginning").text();
      let answer = $("." + item.id + "-answer").val();
      let end = $("." + item.id + "-end").text();
      let word = beginning + answer + end;
      let answers = this.get("answers");
      let pushToAnswer = item.id + "-" + word;
      let double = 0;
      let doublicate = "";
      answers.forEach(answer => {
        let id = Math.floor(answer.split("-")[0]);
        if (id == item.id) {
          doublicate = answer;
          double++;
        }
      });
      if (double == 0) {
        answers.pushObject(pushToAnswer);
      } else {
        answers.removeObject(doublicate);
        double = 0;
      }
      console.log("Answer: " + word);
      console.log(this.get("answers"));
    },
    createTask(value) {
      console.log(value);
    },
    loadAnswers() {
      let answers = [];
      $(".correctness").each(function() {
        let stringAnswer = $(this).attr("id");
        answers.push(stringAnswer);
      });
      this.set("DefinitalyRightAnswers", answers);
    },
    brokeAWord: function(word, id) {
      // console.log(id);
      let word_length = word.length;
      let random_emptyness = Math.floor(Math.random() * word_length);
      let beginning = word.slice(0, random_emptyness);
      let end = word.slice(random_emptyness + 1, word_length);
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
      $("." + id + "-beginning").text(beginning);
      $("." + id + "-end").text(end);
    }
  }
});
