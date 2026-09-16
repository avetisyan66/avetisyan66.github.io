// next/image-types only declares lowercase extensions; the hero photo is saved as .PNG
declare module "*.PNG" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}
