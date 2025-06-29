import { redirect } from 'next/navigation';

const PageAuth = () => {
  return redirect(`./auth/signin`);
};

export default PageAuth;
