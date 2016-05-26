export const CHANGE_MOOD = 'moodPool/CHANGE_MOOD';

const initialState = {
  mood: 'happy',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MOOD:
      const { mood } = action.meta;
      return { ...state, mood };
  }
  return state;
}

export function changeMood(mood) {
  return {
    type: CHANGE_MOOD,
    meta: { mood },
  };
}
