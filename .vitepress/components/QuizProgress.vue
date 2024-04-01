<script setup lang="ts">
/* 
Documentation:

Props:
- ids: string[], the ids of the quizzes, used to get the submission status from localStorage
- titles: string[], the titles of the quizzes, displayed as the links
- relativePaths: string[], the relative paths of the quizzes, used to generate the links, default to the first path

Usage:
```vue
<QuizProgress :ids="['1', '2']" :titles="['Quiz 1', 'Quiz 2']" :relativePaths="['/quiz1/', '/quiz2/']" />
```
*/
import { defineProps, ref, computed } from 'vue'

interface Props {
  ids: string[]
  titles: string[]
  relativePaths: string[]
}
const props = defineProps<Props>()

// load submission status from localStorage by id and handle JSON parse error
const getSubmissionStatus = (id: string) => {
  let submission = ''
  try {
    submission = localStorage.getItem(id) || ''
  } catch (error) {
    console.error(error)
  }
  return submission && ['0', '1'].includes(submission[0]) ? submission[0] : ''
}

const submissionStatus = ref<string[]>(props.ids.map(getSubmissionStatus))

// watch custom quiz-submission event and update submissionStatus
window.addEventListener('quiz-submission', (event) => {
  const id = (event as CustomEvent).detail?.id;
  const index = props.ids.indexOf(id)
  if (index !== -1) {
    submissionStatus.value[index] = getSubmissionStatus(id)
  }
})

// get relative path
const getRelativePath = (index: number) => {
  return props.relativePaths[index] || props.relativePaths[0] || ''
}

const totalQuestions = computed(() => props.ids.length)
const correctQuestions = computed(() => submissionStatus.value.filter((status) => status === '1').length)
const incorrectQuestions = computed(() => submissionStatus.value.filter((status) => status === '0').length)
</script>

<template>
  <div class="custom-block important">
    <div class="summary">
      <span>{{ `Quiz Progress:` }}</span>
      <span v-if="correctQuestions === totalQuestions" style="font-weight: 600;">&nbsp;Completed!</span>
      <span v-else>&nbsp;{{ correctQuestions == 0 && incorrectQuestions == 0 ? 'Not started' : 'In progress' }}</span>
      <span>&nbsp;{{ `(${correctQuestions}/${totalQuestions}) ${(correctQuestions/totalQuestions*100).toFixed(0)}%` }}</span>
    </div>
    <ul>
      <li v-for="(id, index) in props.ids" :key="id">
        <a :href="`${getRelativePath(index)}#${id}`">{{ titles[index] || 'No title.' }}</a>
        <span v-if="submissionStatus[index] === '1'" style="font-size: 12px;">&nbsp;&#9989;</span>
        <span v-else-if="submissionStatus[index] === '0'" style="font-size: 12px;">&nbsp;&#10071;</span>
      </li>
    </ul>
  </div>
</template>

<style></style>
