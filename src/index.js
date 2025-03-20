import React from 'react';
import ReactDOM from 'react-dom/client';
import AppUser from './AppUser';
import AppAdmin from './AppAdmin';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './component/GlobalStyle';
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Kiểm tra đường dẫn URL, nếu bắt đầu bằng "/admin" thì render AppAdmin
const isAdmin = window.location.pathname.startsWith('/admin');

root.render(
    <React.StrictMode>
        <GlobalStyle>
            {isAdmin ? <AppAdmin /> : <AppUser />}
        </GlobalStyle>
    </React.StrictMode>,
);

// Ghi log hiệu suất
reportWebVitals();
