import { Iresult, resultName, results } from '../../results';
import { Iquestion } from './../../types/interface';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const namespace = 'test'
const questions: Iquestion[] = [
  {
    question: 'Ваш возраст',
    first: true
  },
  {
    question: 'Ваш пол',
    options: [{ text: 'Женский', value: 1 }, { text: 'Мужской', value: 2 }]
  },
  {
    question: 'Курили ли вы в юности?',
    options: [{ text: 'Да', value: 1 }, { text: 'Нет', value: 2 }]
  },
  {
    question: 'Курите ли вы сейчас?',
    options: [{ text: 'Да', value: 1 }, { text: 'Нет', value: 2 }]
  },
  {
    question: 'Какова ваша физическая активность?',
    options: [{ text: 'Спорт по желанию ', value: 1 }, { text: 'Спорт 2 раза в месяц', value: 2 }, { text: 'Спорт 1 раз в неделю', value: 3 }, { text: 'Спорт от 2 раз в неделю', value: 4 }]
  },
  {
    question: 'Профиль вашей деятельности?',
    options: [{ text: 'Творческая деятельность', value: 1 }, { text: 'Интеллектуальная деятельность', value: 2 }, { text: 'Физическая деятельность', value: 3 }]
  },
  {
    question: 'Любите ли вы завтрак?',
    options: [{ text: 'Да', value: 1 }, { text: 'Нет', value: 2 }]
  },
  {
    question: 'Во сколько вы ели вчера последний раз?',
    options: [{ text: 'После 20:00', value: 1 }, { text: 'До 19:00', value: 2 }, { text: 'После 19:00', value: 3 }]
  },
  {
    question: 'Когда вы последний раз употребляли алкоголь?',
    options: [{ text: '3 дня назад', value: 1 }, { text: 'Неделю назад', value: 2 }, { text: 'Не помню, давно', value: 3 }, { text: 'Вчера', value: 4 }]
  },
  {
    question: 'Когда последний раз вы проходили профилактический медосмотр? ',
    options: [{ text: 'Меньше года назад', value: 1 }, { text: 'Не помню', value: 2 }, { text: 'Больше года назад', value: 3 }]
  },
  {
    question: 'Весы вас пугают?',
    options: [{ text: 'Да', value: 1 }, { text: 'Нет', value: 2 }, { text: 'Нет весов', value: 3 }],
  },
  {
    question: 'Вы быстро засыпаете?',
    options: [{ text: 'Да, с просмотром видеороликов', value: 1 }, { text: 'Часто ворочаюсь больше 30 минут', value: 2 }, { text: 'Засыпаю за 10 минут', value: 3 }]
  },
  {
    question: 'Сколько вы можете работать в течение дня?',
    options: [{ text: '8 часов', value: 1 }, { text: '10 часов', value: 2 }, { text: '12 часов', value: 3 }, { text: 'Сколько нужно - столько и смогу', value: 4 }]
  },
  {
    question: 'Место вашего постоянного проживания?',
    options: [{ text: 'Мегаполис', value: 1 }, { text: 'Небольшой город', value: 2 }, { text: 'Сельская местность', value: 3 }]
  },
  {
    question: 'Как часто вы бываете на море?',
    options: [{ text: 'Я рядом с ним живу', value: 1 }, { text: '1 раз в год', value: 2 }, { text: '2 раз в год', value: 3 }, { text: 'Море? Уже не помню…', value: 4 }]
  },
]

interface Itypes {
  male: {
    young: {
      [key: string]: resultName
    },
    middle: {
      [key: string]: resultName
    },
    adult: {
      [key: string]: resultName
    },
    old: {
      [key: string]: resultName
    }
  }

  female: {
    young: {
      [key: string]: resultName
    },
    middle: {
      [key: string]: resultName
    },
    adult: {
      [key: string]: resultName
    },
    old: {
      [key: string]: resultName
    }
  }
}
const types: Itypes = {
  male: {
    young: {
      "3Б,4Б,5Г,9В": `бэтмен`,
      "5Г,7А,12Б,13Г": `добрыня`,
      "5А,10Б,8А": "мачо",
      "3Б,12А,13В": "александр македонский",
    },
    middle: {
      "10Б,13Г": `данко`,
      "5Г,10Б,11В": `тамерлан`,
      "5А,10Б,8А": "мачо",
      "9Г,12А,10Б": "остап бендер",
      "3Б,12А,13В": "александр македонский",
    },
    adult: {
      "4А,9А,5А": `ковбой`,
      "8А,10Б,11В": `прометей`,
      "5Г,9В,10В,13Г": "пожарный",
      "5Г,7А,10Б": "поддубный",
      "3Б,12А,13В": "александр македонский",
    },
    old: {
      "4А,5А,11В,9А": `черчилль`,
      "6Б,8Б,12Б,13Г": `скрудж макдак`,
      "5Г,9В,10В,13Г": "пожарный",
      "5Г,7А,10Б": "поддубный",
    }
  },
  female: {
    young: {
      "5А,6Б,8В,9Б,14А": `парижанка`,
      "3А,5Г,6Б,10Б,13В": `жанна д’арк`,
      "13Г,12Б,15Г": `золушка`,
      "5Г,7А,8Б": `мальвина`,
      "5А,13А,12А,6Б": `принцесса`,
      "4А,9А,12Б": `женщина-вамп`,
      "5Г,7А,8В": `чемпионка`,
      "3А,10Б,11В,15Б": `наташа ростова`,
      "8Б,9В,13Г": `дюймовочка`
    },
    middle: {
      "6Б,15В,14А": "королева",
      "11А,12Б,10Б": "мать тереза",
      "6А,9Б,5А": "фея",
      "8Б,9В,13Г": "дюймовочка",
      "13Г,12Б,15Г": "золушка",
      "5А,9Б,10Б": 'императрица',
      "3А,4А,9Б": 'мэрилин монро'
    },
    adult: {
      "9А,3А,6Б": "коко шанель",
      "5А,11В,10Б ": "русалка",
      "6Б,13Г,10Б": "бизнес-леди",
      "8В,11А,12Б": "скарлетт",
      "3А,5Г,6Б,10Б,13В": `жанна д’арк`,
      "5А,14А,15Б": 'дульсинея',
      "3А,8А,12А": 'провинциалка',
      "3А,4А,9Б": 'мэрилин монро'
    },
    old: {
      "12Б,8В,10Б": "хозяйка медной горы",
      "5В,7А,10В": "клеопатра",
      "9А,3А,6Б": "коко шанель",
      "3А,5Г,6Б,10Б,13В": `жанна д’арк`,
      "6Б,13Г,10Б": "бизнес-леди",
      "3А,8А,12А": 'провинциалка',
      "5А,9Б,10Б": 'императрица',
    }
  }
}


export interface ITest {
  questions: Iquestion[]
  step: number
  answers: number[]
  result: Iresult;
}


const initialState: ITest = {
  questions: questions,
  step: 0,
  answers: [],
  result: results[0],
}

const mapOptions: { [key: string]: number } = {
  'А': 1,
  'Б': 2,
  'В': 3,
  'Г': 4,
}

const isMatching = (answers: string, userAnswers: number[], circle: number = 0): boolean => {
  const arrAnswers = answers.split(',')

  // eslint-disable-next-line array-callback-return
  const correctAnswers = arrAnswers.filter((answer) => {
    if (answer.length === 2) {

      const question = Number(answer[0]) - 1
      const option = mapOptions[answer[1]]

      if (userAnswers[question] === option) return true
      else return false

    } else if (answer.length === 3) {

      const question = Number(answer[0] + answer[1]) - 1
      const option = mapOptions[answer[2]]

      if (userAnswers[question] === option) return true
      else return false
    }
  })
  if (circle === 1) {
    if (arrAnswers.length - 1 === correctAnswers.length) return true
    else return false
  } else if (circle === 2) {
    if (arrAnswers.length - 2 === correctAnswers.length) return true
    else return false
  } else {
    if (arrAnswers.length === correctAnswers.length) return true
    else return false
  }
}

const findResult = (types: { [key: string]: string }, a: number[]): Iresult => {
  let name: string = ''
  for (let type in types) {
    if (isMatching(type, a)) {
      name = types[type];
      break;
    }
  }

  if (name === '') {
    for (let type in types) {
      if (isMatching(type, a, 1)) {
        name = types[type];
        break;
      }
    }
  }

  if (name === '') {
    for (let type in types) {
      if (isMatching(type, a, 2)) {
        name = types[type];
        break;
      }
    }
  }

  return results.find((el)=>el.name === name) as Iresult
}

export const testSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    plusStep: (state, action: PayloadAction<number>) => {
      state.answers = [...state.answers, action.payload]
      if (state.questions.length - 1 === state.step) return
      state.step += 1;
    },
    minusStep: (state) => {
      state.answers.pop()
      state.step -= 1;
    },
    resetSteps: (state) => {
      state.step = 0
      state.answers = []
      state.result = results[0]
      state.questions = questions
    },
    getResult: (state) => {
      const a = state.answers
      const sex = a[1]
      const age = a[0]
      if (sex === 1) { // женский
        if (age >= 18 && age <= 25) {
          state.result = findResult(types.female.young, a)
        } else if (age >= 26 && age <= 33) {
          state.result = findResult(types.female.middle, a)
        } else if (age >= 34 && age <= 43) {
          state.result = findResult(types.female.adult, a)
        } else if (age >= 44) {
          state.result = findResult(types.female.old, a)
        }
      } else if (sex === 2) { // мужской
        if (age >= 18 && age <= 25) {
          state.result = findResult(types.male.young, a)
        } else if (age >= 26 && age <= 35) {
          state.result = findResult(types.male.middle, a)
        } else if (age >= 36 && age <= 45) {
          state.result = findResult(types.male.adult, a)
        } else if (age >= 46) {
          state.result = findResult(types.male.old, a)
        }
      }
    }
  },
})

export const { plusStep, minusStep, resetSteps, getResult } = testSlice.actions;