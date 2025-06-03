import Image, { ImageProps } from "next/image";
import { buildUrl } from "cloudinary-build-url";

interface CloudinaryImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  publicId: string;
  alt: string;
}

export default function CloudinaryImage({
  publicId,
  alt,
  ...props
}: CloudinaryImageProps) {
  const url = buildUrl(publicId, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    transform: {
      quality: "auto",
      format: "auto",

    },
  });

  return <Image src={url} alt={alt} className={props.className || ''} {...props} />;
 
}