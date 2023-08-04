export interface Ioption {
  text: string;
  value: number;
}

export interface Iquestion {
  question: string;
  options?: Ioption[]
  first?: boolean
}