import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from '../features/auth/authService';
import iconHome from '../assets/icon/home.svg';
import iconDocument from '../assets/icon/document.svg';
import iconMonitoring from '../assets/icon/monitoring.svg';

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetail', {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const listMenu = [
    {
      title: 'Home',
      url: '/',
      icon: iconHome,
    },
    {
      title: 'Upload Document',
      url: '/upload',
      icon: iconDocument,
    },
    {
      title: 'Monitoring Document',
      url: '/monitoring',
      icon: iconMonitoring,
    },
  ];

  return (
    <div className="flex flex-row sm:gap-10">
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"></label>
        <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <section className="sidebar-title items-center p-4">
            <svg
              fill="none"
              height="42"
              viewBox="0 0 32 32"
              width="42"
              xmlns="http://www.w3.org/2000/svg">
              <rect height="100%" rx="16" width="100%"></rect>
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"></path>
            </svg>
            <div className="flex flex-col">
              <span>Aplikasi Business Unit</span>
              <span className="text-xs font-normal text-content2">
                Oleh Muhamad Windy Sulistiyo
              </span>
            </div>
          </section>
          <section className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <span className="menu-title">Main menu</span>
                <ul className="menu-items">
                  {listMenu.map((menu, index) => (
                    <li key={index}>
                      <Link to={menu.url} className="menu-item">
                        <img src={menu.icon} alt={menu.title} />
                        <span>{menu.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button className="menu-item w-full" onClick={handleLogout}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </section>
            </nav>
          </section>
          <section className="sidebar-footer justify-end bg-gray-2 pt-2">
            <div className="divider my-0"></div>
            <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
              <label
                className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4"
                tabIndex="0">
                <div className="flex flex-row gap-4 p-4">
                  <div className="avatar-square avatar avatar-md">
                    <img src="https://i.pravatar.cc/150?img=30" alt="avatar" />
                  </div>

                  <div className="flex flex-col">
                    <span>
                      {isFetching
                        ? `Fetching your profile...`
                        : data !== null
                        ? `${data?.data?.firstName ?? JSON.stringify(data)}  `
                        : "You're not logged in"}
                    </span>
                    <span className="text-xs font-normal text-content2">
                      {isFetching
                        ? `Fetching your profile...`
                        : data !== null
                        ? data?.data?.lastName ?? JSON.stringify(data)
                        : "You're not logged in"}
                    </span>
                  </div>
                </div>
              </label>
              <div className="dropdown-menu-right-top dropdown-menu ml-2">
                <a className="dropdown-item text-sm">Profile</a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Account settings
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Change Password
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Settings
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Logout
                </a>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <div className="flex w-full flex-col p-4">
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn-primary btn sm:hidden">
            Open Sidebar
          </label>
        </div>

        <div className="my-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
