import type { MetaFunction } from "@remix-run/node";

import { Analytics } from '@vercel/analytics/react';

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import image from '~/assets/image.jpg'
import logo from '~/assets/logo.svg'
import github from '~/assets/github.svg'
import twitter from '~/assets/twitter.svg'
import stylesheets from '~/assets/tailwind.css'

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "OneLinePackages - Get All Your NPM Packages in One Line",
  description: "OneLinePackages is a website that allows you to easily retrieve all of your installed packages from the NPM registry API in just one line of code. Say goodbye to sifting through lengthy lists and manually copying package names, and hello to streamlined development with our user-friendly tool. With OneLinePackages, you can quickly and efficiently manage your NPM packages, saving you valuable time and effort.",
  viewport: "width=device-width,initial-scale=1",
  "twitter:card": "summary_large_image",
  "twitter:site": "@itsAliKhalouf",
  "og:title": "OneLinePackages - Get All Your NPM Packages in One Line",
  "og:description": "OneLinePackages is a website that allows you to easily retrieve all of your installed packages from the NPM registry API in just one line of code. Say goodbye to sifting through lengthy lists and manually copying package names, and hello to streamlined development with our user-friendly tool. With OneLinePackages, you can quickly and efficiently manage your NPM packages, saving you valuable time and effort.",
  "og:image:src": image
});


export const links = () => {
  return [{ rel: 'stylesheet', href: stylesheets }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black">
        <header className="absolute z-30 top-0 left-0 w-full pt-3 px-5 flex justify-between items-center">
          <img src={logo} alt="logo" className="w-[179px]" />
          <div className="flex items-center">
            <Link className="text-black opacity-75 hover:opacity-100" to='https://twitter.com/itsAliKhalouf' target="_blank"><img className="w-[20px] mr-3" src={twitter} alt="twitter" /></Link>
            <Link className="text-black opacity-75 hover:opacity-100" to='https://github.com/itsalimanuel' target="_blank"><img className="w-[20px] mr-3" src={github} alt="github" /></Link>
            <Link className="py-1.5 px-3 bg-gradient-to-r from-indigo-500 hover:from-indigo-900 via-purple-500 hover:via-purple-800 to-pink-500 hover:to-pink-800 text-white text-[14px] rounded-md" to='https://www.alikhalouf.me' target="_blank">Ali Khalouf</Link>
          </div>
        </header>
        <Outlet />
        <Analytics />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
