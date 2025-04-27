import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/GZW-LOGO-W.png';

const navigation = [
  { name: 'Ammunition', href: '/' },
  { name: 'Compare', href: '/compare' },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-secondary shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-col flex-shrink-0 items-center justify-center">
                  <Link to="/" className="text-xl font-bold text-accent flex gap-2 items-center">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                    Gray Zone Warfare Ammo Analyzer
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => {
                    const current = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${current
                          ? 'border-b-2 border-accent text-text'
                          : 'border-transparent text-muted hover:border-accent hover:text-text'
                          }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-muted hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => {
                const current = location.pathname === item.href;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${current
                      ? 'border-accent bg-accent/10 text-text'
                      : 'border-transparent text-muted hover:border-accent hover:bg-accent/5 hover:text-text'
                      }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}