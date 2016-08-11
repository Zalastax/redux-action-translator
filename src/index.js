export default function translator (translations) {
  return ({ dispatch }) => next => action => {
    next(action)

    let translation = translations[action.type]

    if (translation) {
      if (!Array.isArray(translation)) {
        translation = translation(action)
      }
      return translation.map(dispatch)
    }
  }
}
