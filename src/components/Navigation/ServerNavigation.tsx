import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ClientNavigation from './ClientNavigation';

async function ServerNavigation() {
  const session = await getServerSession(options);

  return <ClientNavigation session={session} />;
}

export default ServerNavigation;
