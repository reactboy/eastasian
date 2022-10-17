import { FC, ComponentProps } from 'react';
import Image from 'next/image';

const ICON = {
  //Dark
  githubDark: '/assets/icons/dark/github.svg',
  linkDark: '/assets/icons/dark/link.svg',
  //Light
  githubLight: '/assets/icons/light/github.svg',
  linkLight: '/assets/icons/light/link.svg',
};

type IconName = keyof typeof ICON;

type ImageProps = ComponentProps<typeof Image>;

type IconProps = {
  name: IconName;
} & Partial<ImageProps>;

export const Icon: FC<IconProps> = (props) => {
  const { name, ...imageProps } = props;
  return <Image src={ICON[name]} alt={name} {...imageProps} />;
};
