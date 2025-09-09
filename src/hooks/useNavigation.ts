'use client';
import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const reloadPage = () => {
    router.refresh();
  };

  const goBack = () => {
    router.back();
  };

  return { navigateTo, reloadPage, goBack, router };
};
