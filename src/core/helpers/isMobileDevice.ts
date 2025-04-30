export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent.toLowerCase()
  );
};

export const isMobileSize = (maxWidth = '767px') => {
  return window.matchMedia(`(max-width: ${maxWidth})`).matches;
};

export const isIOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  return /iphone|ipad|ipod|macintosh|macintel|mac/i.test(userAgent.toLowerCase());
};
