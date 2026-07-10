export type PartModelConfig = {
  slug: string;
  title: string;
  imageSrc: string;
};

export const partModelConfig: readonly PartModelConfig[] = [
  {
    slug: "model-x",
    title: "Model X",
    imageSrc: "/model_X.png",
  },
  {
    slug: "model-s",
    title: "Model S",
    imageSrc: "/model_S.png",
  },
  {
    slug: "model-3",
    title: "Model 3",
    imageSrc: "/model_3.png",
  },
  {
    slug: "model-y",
    title: "Model Y",
    imageSrc: "/model_Y.png",
  },
];
