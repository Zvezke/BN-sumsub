"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import SignOut from "./SignOut";
import Link from "next/link";
import { usePathname } from "next/navigation";

// let pathname = usePathname();

const user = {
  name: "Finnur Thomsen",
  email: "support@greengeeks.com",
  imageUrl:
    "https://hykwghxjizmnxfndwozk.supabase.co/storage/v1/object/public/images/Cropped_Finnur.jpg?t=2024-05-07T11%3A48%3A02.002Z",
};
const navigation = [
  { name: "Leasing Calculator", href: "/leasing-calculator", current: false },
  { name: "Leasing Form", href: "/leasing-form", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    src="/images/logo-sand.svg"
                    alt="Your Company"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => {
                    const isCurrent = item.href === pathname;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isCurrent
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <SignOut />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => {
                const isCurrent = item.href === pathname;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isCurrent
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                {/* <SignOut /> */}
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
