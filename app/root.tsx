import type { MetaFunction } from "@remix-run/node";

import { Analytics } from '@vercel/analytics/react';
 
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import image from '~/assets/image.jpg'
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
  "og:image": image
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
      <body className="bg-slate-900">
        <Outlet />
        <Analytics />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
