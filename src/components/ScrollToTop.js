import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    const { hash } = router;
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [router.pathname]);

  return null;
}

export default ScrollToTop;
