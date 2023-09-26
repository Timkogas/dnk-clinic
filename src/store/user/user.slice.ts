
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { userApi } from '../../api/usersApi';
import { Iresult } from '../../types/interface';




export const getVKUser = createAppAsyncThunk(`getVKUser`, async () => {
  const data = await bridge.send('VKWebAppGetUserInfo').then((data) => {
    if (data.id) {
      return data
    }
  })
  return data
})

export const checkUser = createAppAsyncThunk(`checkUser`, async (uid: string) => {
  return userApi.check(uid)
})

export const archetypeUser = createAppAsyncThunk(`archetypeUser`, async ({uid, answers}: {uid: string, answers: number[]}) => {
  return userApi.archetype(uid, answers)
})

export interface IUser {
  user: UserInfo
  archetypeEmpty: Iresult
  archetype: Iresult | null
  loading: boolean
  commentSecret: string
  commentDoctor: string
}


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    archetypeEmpty: {
      name: 'парижанка',
      description: 'Богатый внутренний мир и врожденный интеллект интуитивно управляют организмом и не дают ему пуститься во все тяжкие. Спорт появляется в жизни тогда, когда организм сам приводит тебя в спортзал. При этом стремление к интеллектуальному развитию часто заставляет тебя вести малоподвижный образ жизни.',
      secret: 'Добавь в жизнь побольше движения и спорта! Твой потенциал – долгие, счастливые годы.',
      problems: 'Кишечник, гинекология, проблемы с кожей.',
      recommendations: [
        'Записаться на Чек Ап здоровья',
        'Записаться к гинекологу',
        'Записаться к специалисту индустрии красоты',
      ],
      img: 'paris',
      imgPc: 'paris-pc',
      storyUrl: 'https://sun9-79.userapi.com/impg/fy16ltkszjGppEkKI9-2D-pt6luaocVt7XIacw/sJxjqk4LmlY.jpg?size=1080x1920&quality=95&sign=39d075c354944dea23e578fab26e4917&type=album',
      postUrl: 'photo-221991753_457239057',
    },
    archetype: null,
    loading: false,
    commentSecret: '',
    commentDoctor: ''
  } as IUser,
  reducers: {
    setCommentSecret: (state, action: PayloadAction<string>) => {
      state.commentSecret = action.payload
    },
    setCommentDoctor: (state, action: PayloadAction<string>) => {
      state.commentDoctor = action.payload
    },
    resetCommentSecret: (state) => {
      state.commentSecret = ''
    },
    resetCommentDoctor: (state,) => {
      state.commentDoctor = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVKUser.fulfilled, (state, action) => {
        state.user = action.payload as UserInfo
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        if (action?.payload?.data?.user?.archetype !== undefined) {
          state.archetype = action?.payload?.data?.user?.archetype
        }
      })
      .addCase(archetypeUser.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(archetypeUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(archetypeUser.fulfilled, (state, action) => {
        state.archetype = action?.payload?.data?.archetype
        state.loading = false
      })
  }
})

export const { setCommentSecret, setCommentDoctor, resetCommentSecret, resetCommentDoctor } = userSlice.actions;