import { ROUTER_LINKS } from '@core/constants/RouterLinks';
import { Store } from '@core/store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTelegramBackButtonTo = (store: Store, link = ROUTER_LINKS.GAME) => {
  const navigate = useNavigate();
  const { telegram } = store;
  
  useEffect(() => { 
    const backButton = telegram.getBackButton();
    const goToPage = () => {
      navigate(link);
    };

    backButton.show();
    backButton.onClick(goToPage);

    return () => {
      backButton.offClick(goToPage);
      backButton.hide();
    };
  }, [link, navigate, telegram]);
};
