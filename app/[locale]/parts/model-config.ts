export type PartModelConfig = {
  slug: string;
  title: string;
  imageSrc: string;
  categoryImageSrc: string;
  categorySideImageSrc: string;
};

export const partModelConfig: readonly PartModelConfig[] = [
  {
    slug: "model-x",
    title: "Model X",
    imageSrc: "/model-x.jpg",
    categoryImageSrc: "/model_X.png",
    categorySideImageSrc: "/model-x.jpg",
  },
  {
    slug: "model-s",
    title: "Model S",
    imageSrc: "/tesla-model-s.jpg",
    categoryImageSrc: "/model_S.png",
    categorySideImageSrc: "/tesla-model-s.jpg",
  },
  {
    slug: "model-3",
    title: "Model 3",
    imageSrc: "/model-3.jpeg",
    categoryImageSrc: "/model_3.png",
    categorySideImageSrc: "/model-3.jpeg",
  },
  {
    slug: "model-y",
    title: "Model Y",
    imageSrc: "/model-y.jpg",
    categoryImageSrc: "/model_Y.png",
    categorySideImageSrc: "/model-y.jpg",
  },
];
