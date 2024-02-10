import * as express from 'express';
import { prisma } from '@api/configs/db';

const router = express.Router();

router.get('/resume/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const resume = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        experiences: {
          orderBy: [{ startDate: 'desc' }],
        },
        education: true,
        works: {
          include: {
            stacks: true,
          },
        },
        projects: {
          orderBy: {
            startDate: 'asc',
          },
          include: {
            stacks: true,
          },
        },
      },
    });

    const productionStack = resume.projects
      .reduce((acc, project) => [...acc, ...project.stacks], [])
      .filter(
        (stack, i, stacks) => stacks.findIndex((s) => stack.id === s.id) === i
      );
    const sideProjectStack = resume.works
      .reduce((acc, works) => [...acc, ...works.stacks], [])
      .filter(
        (stack, i, stacks) => stacks.findIndex((s) => stack.id === s.id) === i
      );

    return res.send({
      resume: {
        ...resume,
        stacks: { production: productionStack, sideProject: sideProjectStack },
      },
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as resume };
