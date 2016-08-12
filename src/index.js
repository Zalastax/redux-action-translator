export default function translator (translations) {
  return ({ dispatch, getState }) => next => action => {
    next(action)

    let translation = translations[action.type]

    if (translation) {
      if (!Array.isArray(translation)) {
        translation = translation(action, getState)
      }
      return translation.map(dispatch)
    }
  }
}
