import { FC } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

const getStackIconPath = (name: string) => {
  return `/assets/stacks/${name}.svg`;
};

const STACKS = {
  angular: getStackIconPath('angular'),
  apollo: getStackIconPath('apollo'),
  aws: getStackIconPath('aws'),
  capacitor: getStackIconPath('capacitor'),
  css: getStackIconPath('css'),
  deno: getStackIconPath('deno'),
  django: getStackIconPath('django'),
  fastify: getStackIconPath('fastify'),
  figma: getStackIconPath('figma'),
  firebase: getStackIconPath('firebase'),
  gatsby: getStackIconPath('gatsby'),
  gcp: getStackIconPath('gcp'),
  git: getStackIconPath('git'),
  go: getStackIconPath('go'),
  graphql: getStackIconPath('graphql'),
  html: getStackIconPath('html'),
  illustrator: getStackIconPath('illustrator'),
  javascript: getStackIconPath('javascript'),
  jira: getStackIconPath('jira'),
  jquery: getStackIconPath('jquery'),
  laravel: getStackIconPath('laravel'),
  materialUi: getStackIconPath('material-ui'),
  meteor: getStackIconPath('meteor'),
  mongodb: getStackIconPath('mongodb'),
  nest: getStackIconPath('nest'),
  next: getStackIconPath('next'),
  node: getStackIconPath('node'),
  nx: getStackIconPath('nx'),
  photoshop: getStackIconPath('photoshop'),
  php: getStackIconPath('php'),
  prisma: getStackIconPath('prisma'),
  python: getStackIconPath('python'),
  react: getStackIconPath('react'),
  redis: getStackIconPath('redis'),
  ruby: getStackIconPath('ruby'),
  sass: getStackIconPath('sass'),
  semanticUi: getStackIconPath('semantic-ui'),
  solidity: getStackIconPath('solidity'),
  socketio: getStackIconPath('socket-io'),
  supabase: getStackIconPath('supabase'),
  tailwind: getStackIconPath('tailwind'),
  threejs: getStackIconPath('threejs'),
  typescript: getStackIconPath('typescript'),
  vue: getStackIconPath('vue'),
  wordpress: getStackIconPath('wordpress'),
  xd: getStackIconPath('xd'),
};

const StyledStack = styled.div`
  display: flex;
  align-items: center;
  .stack__name {
    margin-left: 2px;
  }
`;

type StackProps = {
  name: string;
  displayName: string;
  link?: string;
};

export const Stack: FC<StackProps> = (props) => {
  //TODO(eastasian) stacksのマスタを作成したらpropsのインターフェースを更新する
  const { name, displayName } = props;
  const iconPath = STACKS[name];
  return (
    <StyledStack>
      {!!iconPath && (
        <Image src={iconPath} width="16px" height="16px" alt={name} />
      )}
      <p className="stack__name">{displayName}</p>
    </StyledStack>
  );
};
