<template>
  <div class="row justify-center">
    <q-card style="max-width: 800px; width: 100%">
      <!-- <q-card-section> -->
      <h4 class="text-center text-primary text-weight-bold">QUIZ</h4>
      <!-- </q-card-section> -->

      <q-card-section v-if="currentQuestion && !quizFinished">
        <p class="text-h6">
          {{ currentQuestion.question_text }}
        </p>
        <q-list bordered class="q-mt-md">
          <q-item
            v-for="(option, index) in options"
            :key="index"
            clickable
            @click="selectAnswer(option.letter)"
            :class="{ 'bg-green-3': selectedAnswer === option.letter }"
          >
            <q-item-section>{{ option.text }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section v-if="showResult && !quizFinished">
        <!-- <p
          class="text-center text-h6"
          :class="isCorrect ? 'text-green' : 'text-red'"
        >
          {{
            isCorrect
              ? "Correct!"
              : `Wrong! Correct answer: ${currentQuestion.correct_answer}`
          }}
        </p> -->
        <q-btn
          v-if="currentIndex < questions.length - 1"
          label="Next Question"
          color="primary"
          @click="nextQuestion"
          class="full-width q-mt-md"
        />
        <q-btn
          v-else
          label="Submit Quiz"
          color="positive"
          @click="submitQuiz"
          class="full-width q-mt-md"
        />
      </q-card-section>

      <q-card-section v-if="quizFinished">
        <h4 class="text-center text-primary">Quiz Completed!</h4>
        <p class="text-center text-h6">
          Your Score: {{ score }}/{{ questions.length }}
        </p>
        <q-list bordered separator class="q-mt-md">
          <q-item v-for="(result, index) in results" :key="index">
            <q-item-section>
              <q-item-label>{{ result.question_text }}</q-item-label>
              <q-item-label caption
                >Your Answer: {{ result.selected_answer }}</q-item-label
              >
              <q-item-label
                :class="result.is_correct ? 'text-green' : 'text-red'"
              >
                {{ result.is_correct ? "Correct" : "Incorrect" }} (Correct:
                {{ result.correct_answer }})
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn
          label="Retake Quiz"
          color="secondary"
          @click="restartQuiz"
          class="full-width q-mt-md"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      questions: [],
      currentIndex: 0,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false,
      quizFinished: false,
      results: [],
      score: 0,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
    options() {
      return this.currentQuestion
        ? [
            { letter: "A", text: this.currentQuestion.option_a },
            { letter: "B", text: this.currentQuestion.option_b },
            { letter: "C", text: this.currentQuestion.option_c },
            { letter: "D", text: this.currentQuestion.option_d },
          ]
        : [];
    },
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await this.$store.dispatch("users/getQuestions");
        this.questions = this.shuffleArray(response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    async submitQuiz() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to submit your quiz?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const payload = {
              module_id: this.questions[0]?.module_id || null,
              answers: this.results, // Array of question answers
              score: this.score, // User's score
            };

            const response = await this.$store.dispatch(
              "users/submitScore",
              payload
            );

            if (response.error) {
              this.$q.notify({
                message: "Something went wrong!",
                position: "top",
                type: "negative",
                timeout: 3000,
              });
              return;
            }

            if (Object.keys(response).length > 0) {
              this.$q.notify({
                message: "Successfully Notify Student!",
                position: "top",
                type: "positive",
                timeout: 3000,
              });
            }

            this.quizFinished = true;
          } catch (error) {
            console.error("Error submitting quiz:", error);
          }
          this.quizFinished = true;
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    selectAnswer(answer) {
      this.selectedAnswer = answer;
      this.isCorrect = answer === this.currentQuestion.correct_answer;
      if (this.isCorrect) this.score++;
      this.results.push({
        question_text: this.currentQuestion.question_text,
        selected_answer: answer,
        is_correct: this.isCorrect,
        correct_answer: this.currentQuestion.correct_answer,
      });
      this.showResult = true;
    },
    nextQuestion() {
      this.currentIndex++;
      this.selectedAnswer = null;
      this.showResult = false;
    },
    restartQuiz() {
      this.currentIndex = 0;
      this.selectedAnswer = null;
      this.showResult = false;
      this.quizFinished = false;
      this.results = [];
      this.score = 0;
    },
  },
  created() {
    this.fetchQuestions();
  },
};
</script>
