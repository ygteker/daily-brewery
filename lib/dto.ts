import 'server only';
import { getUser } from './dal';
import { User } from './definitions';
import { prisma } from './prisma';

function canSeeUsername(viewer: User) {
  return true;
}

function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team;
}

export async function getProfileDTO(slug: string) {
  const data = await prisma.user.findMany({
    where: {
      email: slug,
    },
    select: {
      email: true,
      password: true,
      name: true,
      isAdmin: true,
      team: true,
    },
  });
  const user = data[0];

  const currentUser = await getUser();

  return {
    username: currentUser && canSeeUsername(currentUser) ? user.name : null,
    phonenumber:
      currentUser && canSeePhoneNumber(currentUser, user.team)
        ? user.team
        : null,
  };
}
