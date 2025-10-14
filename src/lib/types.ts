export type Module = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageId: string;
  isNew?: boolean;
};

export type UserProgress = {
  [moduleId: string]: boolean;
};
