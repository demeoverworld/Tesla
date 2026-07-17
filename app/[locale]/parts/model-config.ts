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
    categoryImageSrc: "/model-x-front.png",
    categorySideImageSrc: "/model-x-side.png",
  },
  {
    slug: "model-s",
    title: "Model S",
    imageSrc: "/tesla-model-s.jpg",
    categoryImageSrc: "/TESLA-Model-S-front.png",
    categorySideImageSrc: "/tesla-s-side.png",
  },
  {
    slug: "model-3",
    title: "Model 3",
    imageSrc: "/model-3.jpeg",
    categoryImageSrc: "/tesla-3-front.png",
    categorySideImageSrc: "/model-3-side.png",
  },
  {
    slug: "model-y",
    title: "Model Y",
    imageSrc: "/model-y.jpg",
    categoryImageSrc: "/model-y-front.png",
    categorySideImageSrc: "/tesla-y-side.png",
  },
];
