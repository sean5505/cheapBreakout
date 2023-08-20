
export type Block = {
  id: number;
  bottomLeft: number[];
  bottomRight: number[];
  topLeft: number[];
  topRight: number[];
};

export type DifficultyOptions = {
  difficulty: string;
  value: number;
  scoreMultiply: number;
};

export type Controls = {
  key: React.ReactNode;
  action: string;
};
