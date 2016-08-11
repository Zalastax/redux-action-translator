import test from 'tape'
import translator from '../src'

const actions = Array.from(new Array(20), (x, i) => ({type: `action_${i}`}))

test('untranslated action', ({plan, fail, equal}) => {
  plan(1)

  translator({})(
    // dispatch function
    {dispatch: () => fail('No actions are dispatched unless there is a matching translation')}
  )(
    // next function
    (action) => equal(action, actions[0])
  )(actions[0])
})

test('simple translated action', ({plan, equal}) => {
  plan(4)

  let n = 0
  const translation = [actions[2], actions[1], actions[2]]

  translator({
    [actions[0].type]: translation,
    [actions[1].type]: [actions[0]]
  })(
    // dispatch function
    {dispatch: (action) => equal(action, translation[n++])}
  )(
    // next function
    (action) => equal(action, actions[0])
  )(actions[0])
})

test('advanced translated action', ({plan, equal}) => {
  plan(2)

  let n = 1
  const translateEveryOther = (action) => n++ % 2 ? [actions[1]] : []

  const f = translator({
    [actions[2].type]: translateEveryOther,
    [actions[7].type]: []
  })(
    // dispatch function
    {dispatch: (action) => equal(action, actions[1])}
  )(
    // next function
    (action) => {}
  )

  const actionSequence = [2, 7, 2, 7, 7, 2, 2]
  actionSequence.forEach(k => f(actions[k]))
})
