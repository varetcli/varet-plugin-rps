import { createVaretPlugin, createStep, createJob } from '@varet/core'

import { search } from '@inquirer/prompts'
import { fuzzy } from '@varet/core'

const OPTIONS = [
  { value: '🪨 rock' },
  { value: '📃 paper' },
  { value: '🔪 scissors' },
]

const promptStep = createStep({
  name: 'rock-paper-scissors',
  handler: async (message) => {
    const choice = await search({
      message: 'Rock, paper, scissors? :',
      source(term) {
        return term
          ? fuzzy(OPTIONS, term, (option) => option.value).map(
              ({ item }) => item,
            )
          : OPTIONS
      },
    })

    if (choice === OPTIONS[0].value) {
      console.log('Lol noob.')
    } else {
      console.log('i guess im a noob')
    }
  },
  onError: 'skip',
})

const job = createJob({
  name: 'rps',
  description: 'Rock paper scissors',
  steps: [promptStep],
})

const plugin = createVaretPlugin({
  name: '@varet/varet-plugin-rps',
  description: 'An example Varet CLI Plugin - Rock Paper Scissors',
  jobs: [job],
})

export default plugin
