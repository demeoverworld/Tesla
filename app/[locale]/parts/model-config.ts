export type PartModelConfig = {
  slug: string;
  title: string;
  imageSrc: string;
};

export const partModelConfig: readonly PartModelConfig[] = [
  {
    slug: "model-x",
    title: "Model X",
    imageSrc: "/model-x.jpg",
  },
  {
    slug: "model-s",
    title: "Model S",
    imageSrc: "/tesla-model-s.jpg",
  },
  {
    slug: "model-3",
    title: "Model 3",
    imageSrc: "/model-3.jpg",
  },
  {
    slug: "model-y",
    title: "Model Y",
    imageSrc: "/model_Y.png",
  },
];
