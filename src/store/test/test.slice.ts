import { Iquestion } from './../../types/interface';
import { createSlice } from "@reduxjs/toolkit";


const namespace = 'test'
const questions: Iquestion[] = [
  {
    question: 'Ваш возраст',
    first: true
  },
  {
    question: 'Ваш пол',
    options: [{ text: 'мужской', value: 1 }, { text: 'женский', value: 2 }]
  },
  {
    question: 'Курили ли вы в юности?',
    options: [{ text: 'да', value: 1 }, { text: 'нет', value: 2 }]
  },
  {
    question: 'Курите ли вы сейчас?',
    options: [{ text: 'да', value: 1 }, { text: 'нет', value: 2 }]
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
    options: [{ text: 'да', value: 1 }, { text: 'нет', value: 2 }]
  },
  {
    question: 'Во сколько вы ели вчера последний раз?',
    options: [{ text: 'После 20:00', value: 1 }, { text: 'До 19:00', value: 2 }, { text: 'После 19:00', value: 3 }]
  },
  {
    question: 'Когда вы последний раз употребляли алкоголь?',
    options: [{ text: '3 дня назад', value: 1 }, { text: 'Неделю', value: 2 }, { text: 'Не помню, давно', value: 3 }, { text: 'Вчера', value: 4 }]
  },
  {
    question: 'Когда последний раз вы проходили профилактический медосмотр? ',
    options: [{ text: 'Меньше года назад', value: 1 }, { text: 'Не помню', value: 2 }, { text: 'Больше года назад', value: 3 }]
  },
  {
    question: 'Весы вас пугают?',
    options: [{ text: 'да', value: 1 }, { text: 'нет', value: 2 }, { text: 'Нет весов', value: 3 }],
  },
  {
    question: 'Вы быстро засыпаете?',
    options: [{ text: 'Да, с просмотром видеороликов', value: 1 }, { text: 'Часто ворочаюсь больше 30 минут', value: 2 }, { text: 'Засыпаю за 10 минут', value: 3 }]
  },
  {
    question: 'Сколько вы можете работать в течение дня?',
    options: [{ text: '8 часов', value: 1 }, { text: '10 чосов', value: 2 }, { text: '12 часов', value: 3 }]
  },
]


export interface ITest {
  questions: Iquestion[]
  step: number
}


const initialState = {
  questions: questions,
  step: 0
}


export const testSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    plusStep: (state) => {
      if (state.questions.length - 1 === state.step) return
      state.step += 1;
    },
    minusStep: (state) => {
      if (state.questions.length === 0) return
      state.step -= 1;
    },
    resetSteps: (state) => {
      state.step = 0
    }
  },
})

export const { plusStep, minusStep, resetSteps } = testSlice.actions;