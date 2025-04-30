import { useTelegramMiniApp } from '@core/hooks/useTelegramMiniApp';
import reactLogo from '@assets/react.svg';
import WebApp from '@twa-dev/sdk';
import { useState } from 'react';
import viteLogo from '/vite.svg';
import './Base.css';

function TelegramToken() {
  const { initData } = useTelegramMiniApp();
  return (
    <label className="telegram-token">
      Telegram initData:
      <textarea name="telegramToken" rows={4} cols={40} value={initData ?? 'none'}/>
    </label>
  );
}

export function Base() {
  const [count, setCount] = useState(0);
  const { user } = useTelegramMiniApp();
  
  const fullName = user ? `${user.first_name} ${user.last_name}` : '';

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello {fullName}</h1>
      <p>id : {user?.id}</p>
      <div className="card">
        <TelegramToken />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
        {/* Here we add our button with alert callback */}
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert
        </button>
      </div>
    </>
  );
}

