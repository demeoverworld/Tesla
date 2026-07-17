export type PartModelConfig = {
  slug: string;
  title: string;
  imageSrc: string;
  categoryImageSrc: string;
};

export const partModelConfig: readonly PartModelConfig[] = [
  {
    slug: "model-x",
    title: "Model X",
    imageSrc: "/model-x.jpg",
    categoryImageSrc: "/model_X.png",
  },
  {
    slug: "model-s",
    title: "Model S",
    imageSrc: "/tesla-model-s.jpg",
    categoryImageSrc: "/model_S.png",
  },
  {
    slug: "model-3",
    title: "Model 3",
    imageSrc: "/model-3.jpeg",
    categoryImageSrc: "/model_3.png",
  },
  {
    slug: "model-y",
    title: "Model Y",
    imageSrc: "/model-y.jpg",
    categoryImageSrc: "/model_Y.png",
  },
];
