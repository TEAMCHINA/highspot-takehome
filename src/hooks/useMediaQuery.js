import {useEffect, useState} from 'react';

export const useMediaQuery = query => {
  const mql = window.matchMedia(query);
  const [matches, setMatches] = useState(mql.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });

  return matches;
};
