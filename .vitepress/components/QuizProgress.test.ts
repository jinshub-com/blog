import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import QuizProgress from './QuizProgress.vue'

const summarySelector = '[class="summary"]'

describe('QuizProgress', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(QuizProgress, {
      props: {
        ids: ['quiz-sample1', 'quiz-sample2', 'quiz-sample3'],
        titles: [
          'Sample Question 1: True or False',
          'Sample Question 2: Multiple Choice',
          'Sample Question 3: Multiple Choice with Multiple Answers',
        ],
        relativePaths: ['introduction'],
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
    localStorage.clear()
  })

  test('renders a list of quiz progress', () => {
    const progressItems = wrapper.findAll('li')
    expect(progressItems.length).toBe(3)
    expect(progressItems[0].text()).toBe('Sample Question 1: True or False')
    expect(progressItems[1].text()).toBe('Sample Question 2: Multiple Choice')
    expect(progressItems[2].text()).toBe(
      'Sample Question 3: Multiple Choice with Multiple Answers'
    )
  })

  test('renders a list of quiz progress with links', () => {
    const progressItems = wrapper.findAll('li')
    expect(progressItems[0].find('a').attributes('href')).toBe(
      'introduction#quiz-sample1'
    )
    expect(progressItems[1].find('a').attributes('href')).toBe(
      'introduction#quiz-sample2'
    )
    expect(progressItems[2].find('a').attributes('href')).toBe(
      'introduction#quiz-sample3'
    )
  })

  test('renders a summary with progress', () => {
    const summary = wrapper.find(summarySelector)
    expect(summary.exists()).toBe(true)
    expect(summary.text()).toContain('0/3')
    expect(summary.text()).toContain('Not started')
    expect(summary.text()).toContain('0%')
  })

  test('renders a list of quiz progress with statuses', () => {
    const progressItems = wrapper.findAll('li')
    expect(progressItems[0].text()).not.toContain('✅')
    expect(progressItems[0].text()).not.toContain('❗')
    expect(progressItems[1].text()).not.toContain('✅')
    expect(progressItems[1].text()).not.toContain('❗')
    expect(progressItems[2].text()).not.toContain('✅')
    expect(progressItems[2].text()).not.toContain('❗')
  })
})

describe('QuizProgress: In Progress', () => {
  let wrapper: any

  beforeEach(() => {
    localStorage.setItem('quiz-sample1', '1["true"]')
    localStorage.setItem('quiz-sample2', '0["A"]')
    wrapper = mount(QuizProgress, {
      props: {
        ids: ['quiz-sample1', 'quiz-sample2', 'quiz-sample3'],
        titles: [
          'Sample Question 1: True or False',
          'Sample Question 2: Multiple Choice',
          'Sample Question 3: Multiple Choice with Multiple Answers',
        ],
        relativePaths: ['introduction'],
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
    localStorage.clear()
  })

  test('renders a summary with progress', () => {
    const summary = wrapper.find(summarySelector)
    expect(summary.exists()).toBe(true)
    expect(summary.text()).toContain('1/3')
    expect(summary.text()).toContain('In progress')
    expect(summary.text()).toContain('33%')
  })

  test('renders a list of quiz progress with statuses', () => {
    const progressItems = wrapper.findAll('li')
    expect(progressItems[0].text()).toContain('✅')
    expect(progressItems[1].text()).toContain('❗')
    expect(progressItems[2].text()).not.toContain('✅')
    expect(progressItems[2].text()).not.toContain('❗')
  })
})

describe('QuizProgress: Completed', () => {
  let wrapper: any

  beforeEach(() => {
    localStorage.setItem('quiz-sample1', '1["true"]')
    localStorage.setItem('quiz-sample2', '1["A"]')
    localStorage.setItem('quiz-sample3', '1["A","B"]')
    wrapper = mount(QuizProgress, {
      props: {
        ids: ['quiz-sample1', 'quiz-sample2', 'quiz-sample3'],
        titles: [
          'Sample Question 1: True or False',
          'Sample Question 2: Multiple Choice',
          'Sample Question 3: Multiple Choice with Multiple Answers',
        ],
        relativePaths: ['introduction'],
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
    localStorage.clear()
  })

  test('renders a summary with progress', () => {
    const summary = wrapper.find(summarySelector)
    expect(summary.exists()).toBe(true)
    expect(summary.text()).toContain('3/3')
    expect(summary.text()).toContain('Completed')
    expect(summary.text()).toContain('100%')
  })

  test('renders a list of quiz progress with statuses', () => {
    const progressItems = wrapper.findAll('li')
    expect(progressItems[0].text()).toContain('✅')
    expect(progressItems[1].text()).toContain('✅')
    expect(progressItems[2].text()).toContain('✅')
  })
})
