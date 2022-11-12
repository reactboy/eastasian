import React from 'react';
import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@resume/redux/app';
import Index from '../pages/index';

const stubResume = {
  id: '552357d4-a772-409a-a849-fa3a6216cdd1',
  name: 'Jun Aida',
  nameJp: '會田 純',
  profileImage:
    'https://plmzmwpmjruswencnerh.supabase.co/storage/v1/object/public/profiles/profile.jpg',
  description: 'Web developer from Tokyo, Japan',
  descriptionJp: '東京出身のWebエンジニア。',
  snsInstagram: 'https://www.instagram.com/eastasiann/',
  snsGithub: 'https://github.com/reactboy',
  createdAt: '2022-10-26T04:11:57.754Z',
  updatedAt: '2022-11-11T11:11:51.080Z',
  experiences: [
    {
      id: '534b3ad0-f353-47c1-a7c0-f12f85415d65',
      title: 'Frontend Developer',
      titleJp: 'Frontend Developer',
      body: 'in level of quality.',
      bodyJp: 'プロジェクトと並行して新卒の技術研修も担当。',
      organization: "Lei Hau'oli Co.,Ltd",
      location: 'Tokyo, Japan',
      createdAt: '2022-11-02T16:02:52.916Z',
      updatedAt: '2022-11-12T10:25:14.124Z',
      startDate: '2019-04-01T00:00:00.000Z',
      endDate: '2021-09-30T00:00:00.000Z',
      profileId: '552357d4-a772-409a-a849-fa3a6216cdd1',
    },
  ],
  education: [
    {
      id: '6d38b126-7455-4719-ab4e-67af337c66c0',
      title: 'Bachelor in Engineering',
      titleJp: 'Bachelor in Engineering',
      body: 'Cebu every long vacation and distributed curry and ramen noodles to a total of 2,000 children over a period of two years.',
      bodyJp: '4脚歩行ロボットの高速歩行を目的とした脚機構を研究。',
      organization: 'Tamagawa Univ',
      location: 'Tokyo, Japan',
      createdAt: '2022-11-06T03:46:22.916Z',
      updatedAt: '2022-11-06T06:25:34.983Z',
      startDate: '2015-04-01T00:00:00.000Z',
      endDate: '2019-03-18T00:00:00.000Z',
      profileId: '552357d4-a772-409a-a849-fa3a6216cdd1',
    },
  ],
  works: [
    {
      id: 'c4a952db-e775-45ac-be52-85340d979c83',
      title: 'kabchi',
      titleJp: 'kabchi',
      body: 'kabchi is a kind of diary app.',
      bodyJp: 'kabchi is a kind of diary app.',
      createdAt: '2022-11-06T06:07:15.498Z',
      updatedAt: '2022-11-11T10:03:39.680Z',
      link: 'https://kabchi.vercel.app/',
      profileId: '552357d4-a772-409a-a849-fa3a6216cdd1',
      stacks: [
        {
          id: 'ae1d223a-87a1-4baa-b524-13e845349098',
          name: 'node',
          displayName: 'Node.js',
          link: 'https://nodejs.org/en/',
          createdAt: '2022-11-10T15:24:52.818Z',
          updatedAt: '2022-11-10T16:27:23.028Z',
          stackImage:
            'https://plmzmwpmjruswencnerh.supabase.co/storage/v1/object/public/stacks/node.svg',
        },
      ],
    },
  ],
  projects: [
    {
      id: '388bb892-bcdd-4ff8-8996-2d7f3f6f6b0f',
      title: '金融商品の売買サービス(2019年7月 ~ 12月)',
      titleJp: '金融商品の売買サービス(2019年7月 ~ 12月)',
      body: 'フロントエンドエンジニアとして途中参画。',
      bodyJp: 'フロントエンドエンジニアとして途中参画。',
      createdAt: '2022-11-06T07:02:26.328Z',
      updatedAt: '2022-11-11T09:00:35.646Z',
      link: '',
      profileId: '552357d4-a772-409a-a849-fa3a6216cdd1',
      stacks: [
        {
          id: 'cd6d66b2-816f-4ee5-b7b7-cfaa864e4df3',
          name: 'typescript',
          displayName: 'TypeScript',
          link: '',
          createdAt: '2022-11-11T08:45:55.486Z',
          updatedAt: '2022-11-11T08:47:47.324Z',
          stackImage:
            'https://plmzmwpmjruswencnerh.supabase.co/storage/v1/object/public/stacks/typescript.svg',
        },
      ],
    },
  ],
  stacks: {
    production: [
      {
        id: 'c906afed-c900-41f4-ada8-b8b1b327439d',
        name: 'docker',
        displayName: 'Docker',
        link: 'https://www.docker.com/',
        createdAt: '2022-11-11T10:07:34.970Z',
        updatedAt: '2022-11-11T10:07:34.970Z',
        stackImage:
          'https://plmzmwpmjruswencnerh.supabase.co/storage/v1/object/public/stacks/docker.svg',
      },
    ],
    sideProject: [
      {
        id: 'ae1d223a-87a1-4baa-b524-13e845349098',
        name: 'node',
        displayName: 'Node.js',
        link: 'https://nodejs.org/en/',
        createdAt: '2022-11-10T15:24:52.818Z',
        updatedAt: '2022-11-10T16:27:23.028Z',
        stackImage:
          'https://plmzmwpmjruswencnerh.supabase.co/storage/v1/object/public/stacks/node.svg',
      },
    ],
  },
};

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ReduxProvider store={store}>
        <Index resume={stubResume} />
      </ReduxProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
