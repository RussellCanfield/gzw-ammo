import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react';
import logo from '../assets/GZW-LOGO-W.png';

const navigation = [
  { name: 'Ammunition', href: '/' },
  { name: 'Compare', href: '/compare' },
  { name: 'Discussions', href: 'https://www.grayzonewarfare.net/forums/ammo-ballistics.14/' }
];

export default function Navigation() {
  const location = useLocation();

  const renderLink = (item: { name: string; href: string }) => {
    const current = location.pathname === item.href;
    const className = `inline-flex items-center px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${current
      ? 'bg-accent/10 text-text border-b-2 border-accent'
      : 'text-muted hover:text-text hover:bg-accent/5'
      }`;

    if (item.href.startsWith('http://') || item.href.startsWith('https://')) {
      return (
        <a
          key={item.name}
          href={item.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.name}
        </a>
      );
    } else {
      return (
        <Link
          key={item.name}
          to={item.href}
          className={className}
        >
          {item.name}
        </Link>
      );
    }
  };

  const renderMobileLink = (item: { name: string; href: string }) => {
    const current = location.pathname === item.href;
    const className = `block w-full text-center rounded-md px-3 py-2 text-base font-medium transition-all duration-200 ${current
      ? 'bg-accent/10 text-text border-l-2 border-accent'
      : 'text-muted hover:text-text hover:bg-accent/5'
      }`;

    if (item.href.startsWith('http://') || item.href.startsWith('https://')) {
      return (
        <a
          key={item.name}
          href={item.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // This will close the menu when a link is clicked
            const closeButton = document.querySelector('[aria-label="Close main menu"]');
            if (closeButton instanceof HTMLElement) {
              closeButton.click();
            }
          }}
        >
          {item.name}
        </a>
      );
    } else {
      return (
        <Link
          key={item.name}
          to={item.href}
          className={className}
          onClick={() => {
            // This will close the menu when a link is clicked
            const closeButton = document.querySelector('[aria-label="Close main menu"]');
            if (closeButton instanceof HTMLElement) {
              closeButton.click();
            }
          }}
        >
          {item.name}
        </Link>
      );
    }
  };

  return (
    <Disclosure as="nav" className="bg-secondary shadow-lg sticky top-0 z-50">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex h-16 justify-between">
              <div className="flex w-full mt-4 items-center justify-between flex-col gap-4 mb-4">
                <div className="flex flex-shrink-0 items-center mx-auto sm:mx-0">
                  <div className="relative overflow-hidden rounded-full p-1 bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <img src={logo} alt="Logo" className="h-8 w-8" />
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                  </div>
                  <span className="bg-gradient-to-r from-text to-muted bg-clip-text font-extrabold text-white">
                    Ammo & Ballistics
                  </span>
                </div>
                <div className="sm:ml-8 flex sm:space-x-8 items-center gap-6">
                  {navigation.map((item) => renderLink(item))}
                </div>
              </div>
            </div>
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2 px-4 flex flex-col items-center">
                {navigation.map((item) => renderMobileLink(item))}
                <div className="pt-4 pb-2 border-t border-gray-700 w-full">
                  <div className="flex items-center justify-center space-x-6 mt-3">
                    <a
                      href="https://gzw.madfinger.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <span className="sr-only">Official Website</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                    <a
                      href="https://discord.gg/gzw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <span className="sr-only">Discord</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/gzwgame"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
