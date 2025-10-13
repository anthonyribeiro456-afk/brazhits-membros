export type Module = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageId: string;
};

export type UserProgress = {
  [moduleId: string]: boolean;
};
