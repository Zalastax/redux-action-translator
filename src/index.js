export default function translator (translations) {
  return ({ dispatch }) => next => action => {
    next(action)

    let translation = translations[action.type]

    if (translation) {
      if (!Array.isArray(translation)) {
        translation = translation(action)
      }
      console.log(translation)
      return translation.map(dispatch)
    }
  }
}
