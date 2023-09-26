import { doctorCategory } from "./enums";

export interface Ioption {
  text: string;
  value: number;
}

export interface Iquestion {
  question: string;
  options?: Ioption[]
  first?: boolean
}

export interface Idoctor {
  _id: string
  name: string
  mainInfo: string[]
  img: string
  prof: string[]
  video: string
  category: doctorCategory
  info: {
    [key: string]: string[]
  }
}

export type resultName = 'парижанка' | 'дюймовочка' | 'клеопатра' | 'мальвина' | 'жанна д’арк' | 'наташа ростова' | 'принцесса' | 'королева' | 'золушка' | 'женщина-вамп' | 'чемпионка' | 'мать тереза' | 'фея' | 'коко шанель' | 'русалка' | 'бизнес-леди' | 'скарлетт' | 'дульсинея' | 'провинциалка' | 'хозяйка медной горы' | 'бэтмен' | 'добрыня' | 'мачо' | 'александр македонский' | 'данко' | 'тамерлан' | 'остап бендер' | 'ковбой' | 'прометей' | 'пожарный' | 'поддубный' | 'скрудж макдак' | 'черчилль' | 'мэрилин монро' | 'императрица'

export interface Iresult {
  name: resultName;
  description: string;
  secret: string;
  problems: string;
  recommendations: string[];
  img: string;
  imgPc: string;
  storyUrl: string;
  postUrl: string;
}
