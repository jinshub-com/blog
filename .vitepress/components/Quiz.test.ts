import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import Quiz from './Quiz.vue'

// .quiz-container > .title
const titleSelector = '[class=title]'
// .quiz-container > .description
const descriptionSelector = '[class=description]'
// .quiz-container > .options
const optionsSelector = '[class=options]'
// .quiz-container > .option input
const optionSelector = '[class=option] input'
// .quiz-container > .option label
const optionLabelSelector = '[class=option] label'
// .quiz-container > .submit
const submitSelector = '[class=submit]'
// .quiz-container > .btn-submit
const btnSubmitSelector = '[class=btn-submit]'
// .quiz-container > .submission-result
const submissionResultSelector = '[class=submission-result]'
// .quiz-container > details
const detailsSelector = 'details'
// .quiz-container > details > .solution-title
const solutionTitleSelector = '[class=solution-title]'
// .quiz-container > details > .solution-content
const solutionContentSelector = '[class=solution-content]'

describe('True or False quiz', () => {
  const props = {
    id: '1',
    title: 'Test quiz',
    options: ['True', 'False'],
    answers: ['True'],
  }
  let wrapper = mount(Quiz, { props })
  beforeEach(() => { wrapper = mount(Quiz, { props }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  test('Solution title and content exist', () => {
    expect(wrapper.find(detailsSelector).exists()).toBe(true)
    expect(wrapper.find(solutionTitleSelector).exists()).toBe(true)
    expect(wrapper.find(solutionContentSelector).exists()).toBe(true)
  })

  test('Solution title has correct content', () => {
    expect(wrapper.find(solutionTitleSelector).text()).toBe('Show solution')
  })

  test('Details open and close on summary click', async () => {
    expect(wrapper.find(detailsSelector).element.open).toBe(false)

    await wrapper.find(solutionTitleSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(detailsSelector).element.open).toBe(true)

    await wrapper.find(solutionTitleSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(detailsSelector).element.open).toBe(false)
  })

  // true and false options
  test('Options exist', () => {
    expect(wrapper.find(optionsSelector).exists()).toBe(true)
    expect(wrapper.findAll(optionSelector).length).toBe(2)
    props.options.forEach((option, index) => {
      expect(wrapper.findAll(optionLabelSelector)[index].text()).toBe(option)
    })
  })

  // submit with correct answer
  test('Submit with correct answer', async () => {
    await wrapper.findAll(optionSelector)[0].setValue('True')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Correct')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Incorrect')
  })

  // submit with incorrect answer
  test('Submit with incorrect answer', async () => {
    await wrapper.findAll(optionSelector)[1].setValue('False')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
  })
})

describe('Multiple choice quiz with multiple answers', () => {
  const props = {
    id: '2',
    title: 'Test quiz',
    options: ['A', 'B', 'C', 'D'],
    answers: ['A', 'B'],
  }
  let wrapper = mount(Quiz, { props })
  beforeEach(() => { wrapper = mount(Quiz, { props }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  // multiple choice options
  test('Options exist', () => {
    expect(wrapper.find(optionsSelector).exists()).toBe(true)
    expect(wrapper.findAll(optionSelector).length).toBe(4)
    props.options.forEach((option, index) => {
      expect(wrapper.findAll(optionLabelSelector)[index].text()).toBe(option)
    })
  })

  // submit with correct answer
  test('Submit with correct answer', async () => {
    await wrapper.findAll(optionSelector)[0].setValue('A')
    await wrapper.findAll(optionSelector)[1].setValue('B')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Correct')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Incorrect')
    // correct answers are highlighted with green while selected incorrect answers are highlighted with red
    expect(wrapper.findAll(optionSelector)[0].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[1].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).not.toContain('correct')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('correct')
  })

  // submit with incorrect answer
  test('Submit with incorrect answer', async () => {
    await wrapper.findAll(optionSelector)[0].setValue('A')
    await wrapper.findAll(optionSelector)[1].setValue('B')
    await wrapper.findAll(optionSelector)[2].setValue('C')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
    // correct answers are highlighted with green while selected incorrect answers are highlighted with red
    expect(wrapper.findAll(optionSelector)[0].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[1].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).toContain('incorrect')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('correct')
  })

  // submit with incorrect answer
  test('Submit with incorrect answer', async () => {
    await wrapper.findAll(optionSelector)[2].setValue('C')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
    // correct answers are highlighted with green while selected incorrect answers are highlighted with red
    expect(wrapper.findAll(optionSelector)[0].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[1].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).toContain('incorrect')
    expect(wrapper.findAll(optionSelector)[2].element.classList).not.toContain('correct')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('correct')
  })

  // submit with incorrect answer
  test('Submit with incorrect answer', async () => {
    await wrapper.findAll(optionSelector)[0].setValue('A')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
    // correct answers are highlighted with green while selected incorrect answers are highlighted with red
    expect(wrapper.findAll(optionSelector)[0].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[1].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).not.toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).not.toContain('incorrect')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('correct')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('incorrect')
  })

  // submit with incorrect answer
  test('Submit with incorrect answer', async () => {
    await wrapper.findAll(optionSelector)[1].setValue('B')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
    // correct answers are highlighted with green while selected incorrect answers are highlighted with red
    expect(wrapper.findAll(optionSelector)[0].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[1].element.classList).toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).not.toContain('correct')
    expect(wrapper.findAll(optionSelector)[2].element.classList).not.toContain('incorrect')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('correct')
    expect(wrapper.findAll(optionSelector)[3].element.classList).not.toContain('incorrect')
  })
})

describe('Multiple choice quiz with single answer', () => {
  const props = {
    id: '3',
    title: 'Test quiz',
    options: ['A', 'B', 'C', 'D', 'E'],
    answers: ['A'],
  }
  let wrapper = mount(Quiz, { props })
  beforeEach(() => { wrapper = mount(Quiz, { props }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  // multiple choice options
  test('Options exist', () => {
    expect(wrapper.find(optionsSelector).exists()).toBe(true)
    expect(wrapper.findAll(optionSelector).length).toBe(5)
    props.options.forEach((option, index) => {
      expect(wrapper.findAll(optionLabelSelector)[index].text()).toBe(option)
    })
  })

  // submit with correct answer
  test('Submit with correct answer', async () => {
    await wrapper.findAll(optionSelector)[0].setValue('A')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Correct')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Incorrect')
  })

  // submit with incorrect answer
  test('Submit with incorrect answer', async () => {
    await wrapper.findAll(optionSelector)[1].setValue('B')
    await wrapper.find(btnSubmitSelector).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
  })
})

// description and solution slots
describe('Quiz with description and solution', () => {
  const props = {
    id: '4',
    title: 'Test quiz',
    options: ['A', 'B', 'C', 'D'],
    answers: ['A', 'B'],
  }
  const description = 'This is a test quiz.'
  const solution = 'This is the solution.'
  let wrapper = mount(Quiz, { props, slots: { description, solution } })
  beforeEach(() => { wrapper = mount(Quiz, { props, slots: { description, solution } }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  test('Description and solution slots exist', () => {
    expect(wrapper.find(descriptionSelector).exists()).toBe(true)
    expect(wrapper.find(descriptionSelector).text()).toBe(description)
    expect(wrapper.find(solutionContentSelector).text()).toBe(solution)
  })

  test('Quiz id is set', () => {
    expect(wrapper.attributes('id')).toBe(props.id)
  })

  test('Quiz title is set', () => {
    expect(wrapper.find(titleSelector).text()).toBe(props.title)
  })
})

// without description and solution slots
describe('Quiz without description and solution', () => {
  const props = {
    id: '5',
    title: 'Test quiz',
    options: ['A', 'B', 'C', 'D'],
    answers: ['A', 'B'],
  }
  let wrapper = mount(Quiz, { props })
  beforeEach(() => { wrapper = mount(Quiz, { props }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  test('Description and solution slots do not exist', () => {
    expect(wrapper.find(descriptionSelector).text()).toBe('No description.')
    expect(wrapper.find(solutionContentSelector).text()).toBe('No solution.')
  })

  test('Quiz id is set', () => {
    expect(wrapper.attributes('id')).toBe(props.id)
  })

  test('Quiz title is set', () => {
    expect(wrapper.find(titleSelector).text()).toBe(props.title)
  })
})

// load correct quiz submission from local storage
describe('Load correct quiz submission from local storage', () => {
  const props = {
    id: '6',
    title: 'Test quiz',
    options: ['A', 'B', 'C', 'D'],
    answers: ['A', 'B'],
  }
  const key = '6'
  const submission = ['A', 'B']
  let wrapper = mount(Quiz, { props })
  beforeEach(() => { localStorage.setItem(key, JSON.stringify(submission)), wrapper = mount(Quiz, { props }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  test('Submission loaded from local storage', () => {
    expect(wrapper.find(submissionResultSelector).text()).toContain('Correct')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Incorrect')
  })
})

// load incorrect quiz submission from local storage
describe('Load incorrect quiz submission from local storage', () => {
  const props = {
    id: '7',
    title: 'Test quiz',
    options: ['A', 'B', 'C', 'D'],
    answers: ['A', 'B'],
  }
  const key = '7'
  const submission = ['A', 'C']
  let wrapper = mount(Quiz, { props })
  beforeEach(() => { localStorage.setItem(key, JSON.stringify(submission)), wrapper = mount(Quiz, { props }) })
  afterEach(() => { wrapper.unmount(), localStorage.clear() })

  test('Submission loaded from local storage', () => {
    expect(wrapper.find(submissionResultSelector).text()).toContain('Incorrect')
    expect(wrapper.find(submissionResultSelector).text()).not.toContain('Correct')
  })
})
