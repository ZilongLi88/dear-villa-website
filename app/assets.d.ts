declare module "*.avif" {
  const source: {
    src: string;
    width: number;
    height: number;
  };
  export default source;
}

declare module "*.jpeg" {
  const source: {
    src: string;
    width: number;
    height: number;
  };
  export default source;
}

declare module "*.png" {
  const source: {
    src: string;
    width: number;
    height: number;
  };
  export default source;
}
