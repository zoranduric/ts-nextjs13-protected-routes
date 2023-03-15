import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type ExampleProps = {
  user: User;
};

export default function Page({ user }: ExampleProps) {
  return <main>Example Page, hello {user?.name}</main>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com',
    },
  });
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
