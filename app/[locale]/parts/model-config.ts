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
    categoryImageSrc: "/model_X_parts.png",
    categorySideImageSrc: "/model_X_parts.png",
  },
  {
    slug: "model-s",
    title: "Model S",
    imageSrc: "/tesla-model-s.jpg",
    categoryImageSrc: "/model_S_parts.png",
    categorySideImageSrc: "/model_S_parts.png",
  },
  {
    slug: "model-3",
    title: "Model 3",
    imageSrc: "/model-3.jpeg",
    categoryImageSrc: "/model_3_parts.png",
    categorySideImageSrc: "/model_3_parts.png",
  },
  {
    slug: "model-y",
    title: "Model Y",
    imageSrc: "/model-y.jpg",
    categoryImageSrc: "/model_Y_parts.png",
    categorySideImageSrc: "/model_Y_parts.png",
  },
];
