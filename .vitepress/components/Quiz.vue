<script setup lang="ts">
/* 
Documentation:

Props:
- id: string, the id of the quiz, used to store the selected options in localStorage
- title: string, the title of the quiz, displayed at the top
- options: string[], the options of the quiz, displayed as the choices
- answers: string[], the answers of the quiz, used to check if the submission is correct

Slots:
- description: the description of the quiz, displayed below the title
- solution: the solution of the quiz, displayed when the user clicks the "Show solution" button

Usage:
```vue
<Quiz id="1" title="Quiz 1" :options="['A', 'B', 'C']" :answers="['A']">
  <template #description>
    This is a quiz with one correct answer.
  </template>
  <template #solution>
    The correct answer is A.
  </template>
</Quiz>
```
*/
import { defineProps, ref, computed, watch } from 'vue'

interface Props {
  id: string
  title: string
  options: string[]
  answers: string[]
}
const props = defineProps<Props>()

const localStorageId = `quiz-${props.id}`
const selectedOptions = ref<string[]>([])
// load selectedOptions from localStorage by id and handle JSON parse error
try {
  let selectedOptionsFromLocalStorage = localStorage.getItem(localStorageId)
  if (selectedOptionsFromLocalStorage) {
    // the first character is used to store the submission status
    if (['0', '1'].includes(selectedOptionsFromLocalStorage[0])) {
      selectedOptionsFromLocalStorage = selectedOptionsFromLocalStorage.slice(1)
    }
    const parsedSelectedOptions = JSON.parse(selectedOptionsFromLocalStorage)
    if (Array.isArray(parsedSelectedOptions)) {
      selectedOptions.value = parsedSelectedOptions
    }
  }
} catch (error) {
  console.error(error)
}
// watch selectedOptions and set isSubmitted to false
watch(selectedOptions, () => {
  console.log('selectedOptions changed', JSON.stringify(selectedOptions.value))
  isSubmitted.value = false
})

const inputType = computed(() => props.answers.length === 1 ? 'radio' : 'checkbox')
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    if (inputType.value === 'radio') {
      selectedOptions.value = [target.value]
    } else if (inputType.value === 'checkbox') {
      if (!selectedOptions.value.includes(target.value)) {
        selectedOptions.value = [...selectedOptions.value, target.value]
      }
    }
  } else {
    selectedOptions.value = selectedOptions.value.filter(option => option !== target.value)
  }
}

// if selectedOptions is not empty, set isSubmitted to true
const isSubmitted = ref(selectedOptions.value.length > 0)

// compute if it is allowed to submit
const isSubmitAllowed = computed(() => {
  return selectedOptions.value.length > 0 && !isSubmitted.value
})

const handleSubmission = () => {
  if (!isSubmitAllowed.value) {
    return
  }
  isSubmitted.value = true
  localStorage.setItem(localStorageId, `${isSubmissionCorrect.value ? 1 : 0}${JSON.stringify(selectedOptions.value)}`)
}

// check if a selection is correct, a selection is correct if it is submitted
//   and it is included in the answers no matter it is selected or not.
const isSelectionCorrect = (option: string) => {
  return isSubmitted.value && props.answers.includes(option)
}
// check if a selection is incorrect, a selection is incorrect if it is 
//   submitted and it is not included in the answers but selected.
//   an option in the answers but not selected is not incorrect.
const isSelectionIncorrect = (option: string) => {
  return isSubmitted.value && !props.answers.includes(option) && selectedOptions.value.includes(option)
}
// check if the submission is correct
const isSubmissionCorrect = computed(() => {
  return isSubmitted.value && props.answers.length === selectedOptions.value.length && props.answers.every(answer => selectedOptions.value.includes(answer))
})
// check if the submission is incorrect
const isSubmissionIncorrect = computed(() => {
  return isSubmitted.value && (
    props.answers.length !== selectedOptions.value.length
    || !props.answers.every(answer => selectedOptions.value.includes(answer))
  )
})
</script>

<template>
  <div class="quiz-container custom-block quiz">
    <div class="title">{{ title || '' }}</div>
    <div class="description">
      <slot name="description">No description.</slot>
    </div>
    <div class="options">
      <div v-for="option in options" :key="option" class="option">
        <input :type="inputType" :name="id" :id="`${id}-${option}`" :value="option" :checked="selectedOptions.includes(option)" @input="handleInput" :class="{ correct: isSelectionCorrect(option), incorrect: isSelectionIncorrect(option) }" />
        <label :for="`${id}-${option}`">{{ option }}</label>
      </div>
    </div>
    <div class="submit">
      <button class="btn-submit" @click="handleSubmission" :disabled="!isSubmitAllowed">Submit</button>
      <span v-if="isSubmissionCorrect" class="submission-result">&#9989; Correct answer</span>
      <span v-if="isSubmissionIncorrect" class="submission-result">&#10071; Incorrect answer</span>
    </div>
    <details>
      <summary class="solution-title">Show solution</summary>
      <p class="solution-content">
        <slot name="solution">No solution.</slot>
      </p>
    </details>
  </div>
</template>

<style>
.custom-block.quiz {
  border-color: var(--vp-custom-block-important-border);
  color: var(--vp-custom-block-important-text);
  background-color: var(--vp-custom-block-important-bg);
}

.custom-block.quiz a,
.custom-block.quiz code {
  color: var(--vp-c-important-1);
}

.custom-block.quiz a:hover,
.custom-block.quiz a:hover>code {
  color: var(--vp-c-important-2);

}

.custom-block.quiz code {
  background-color: var(--vp-custom-block-important-code-bg);
}

.custom-block.quiz .title {
  font-size: 14px;
  font-weight: 600;
}

.custom-block.quiz .title,
.custom-block.quiz .description,
.custom-block.quiz .options {
  margin-bottom: 12px;
}

.custom-block.quiz .options {
  display: flex;
  flex-direction: column;
}

.custom-block.quiz .option {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
}

.custom-block.quiz .options input::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  z-index: 1;
}

.custom-block.quiz .options input:hover::before {
  border: 1px solid #ccc;
}

.custom-block.quiz .options input:checked::before {
  border: 1px solid #007BFF;
}

.custom-block.quiz .options input.correct::before {
  border: 1px solid #28a745;
}

.custom-block.quiz .options input.incorrect::before {
  border: 1px solid #dc3545;
}

.custom-block.quiz .option input {
  margin-left: 8px;
  cursor: pointer;
}

.custom-block.quiz .option label {
  flex-grow: 1;
  padding: 6px 8px;
  cursor: pointer;
}

.custom-block.quiz .submit {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-block.quiz .submission-result {
  font-size: 12px;
  font-weight: 600;
}

.custom-block.quiz .btn-submit {
  padding: 6px 12px;
  border: 1px solid #007BFF;
  border-radius: 4px;
  background-color: transparent;
  color: #007BFF;
  font-size: 12px;
  line-height: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.custom-block.quiz .btn-submit:hover {
  background-color: #007bff;
  color: var(--vp-custom-block-important-text);
}

.custom-block.quiz .btn-submit:active {
  background-color: #0056b3;
  color: var(--vp-custom-block-important-text);
}

.custom-block.quiz .btn-submit:disabled {
  cursor: not-allowed;
  border-color: #999;
  color: var(--vp-custom-block-important-text);
}

.custom-block.quiz .btn-submit:disabled:hover {
  background-color: transparent;
}

.custom-block.quiz .solution-title {
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
</style>