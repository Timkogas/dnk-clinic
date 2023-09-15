import { resultName } from '../../results';
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
    options: [{ text: 'После 20:00', value: 1 }, { text: 'До 19:00', value: 2 }, { text: 'Не помню', value: 3 }]
  },
  {
    question: 'Когда вы последний раз употребляли алкоголь?',
    options: [{ text: '3 дня назад', value: 1 }, { text: 'Неделю назад', value: 2 }, { text: 'Не помню, давно', value: 3 }, { text: 'Вчера', value: 4 }, { text: 'Никогда', value: 5 }]
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

export interface ITest {
  questions: Iquestion[]
  step: number
  answers: number[]
}


const initialState: ITest = {
  questions: questions,
  step: 0,
  answers: [],
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
      state.questions = questions
    },
  },
})

export const { plusStep, minusStep, resetSteps } = testSlice.actions;