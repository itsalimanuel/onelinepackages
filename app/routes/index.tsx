import type { ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import axios from "axios";
import { useRef, useState } from "react";

export const action = async ({ request }: any) => {
  const form = await request.formData();
  const name = form.get('name');
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const params = new URLSearchParams();
  params.append('q', name);
  try {
    const res = await axios.get(
      `https://api.npms.io/v2/search/suggestions?q=${name}`,
      config
    );
    return res.data;
  } catch (e) {
    return false
  }
};


export default function Index() {
  const finalyRef = useRef(null)
  const inputRef = useRef(null)
  const data = useActionData<ActionArgs>();
  const [result, setResult] = useState([])
  const [dependencies, setDependencies] = useState('--save')
  const [mangemenet, setMangemenet] = useState('npm i')
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (value: any) => {
    setResult(result + " " + value);
    setShowResult(false)
    inputRef.current.value = ''
  }
  const dispayShowResult = () => {
    setShowResult(true)
  }
  const removeElement = (index) => {
    const newArray = [...result];
    newArray.splice(index, 1);
    setResult(newArray);
  };

  const mangemet = (value: any) => {
    setMangemenet(value)
  }
  const depence = (value: any) => {
    setDependencies(value)
  }

  const copyToClipboard = () => {
    const devValue = finalyRef.current.innerText;
    navigator.clipboard.writeText(devValue);
  };

  const clearResult = () => {
    setDependencies('--save')
    setMangemenet('npm i')
    setResult([])
  }

  return (
    <div className="home flex w-full h-screen flex-col justify-center items-center">
      <div className="text-white text-lg ">
        <div className=" m-auto flex items-center justify-center">
          <img className="h-24 w-24" src="./logo.svg" alt="logo" />
          <Link className="text-sm font-semibold" to='/'>BY <span className="text-indigo-400 hover:text-indigo-600">Ali Khalouf</span></Link>
        </div>
        <div className="hidden sm:mb-8 sm:flex sm:justify-center ">

          <div className="relative rounded-full py-1 px-3 text-lg leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Get your packages in on <a href="." className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>line <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-4 w-2/4 mt-4 relative">
        <div className="flex">
          <select
            id="countries"
            onChange={(e) => depence(e.target.value)}
            className="bg-gray-50 outline border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="--save">dependencies</option>
            <option value="--save-dev">devDependencies</option>
          </select>
          <select
            onChange={(e) => mangemet(e.target.value)}
            id="countries"
            className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="npm i">Npm</option>
            <option value="yarn add">Yarn</option>
            <option value="pnpm add">Pnpm</option>
          </select>
        </div>
        <Form method="post" className="group relative">
          <div className="relative">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
            <input
              ref={inputRef}
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
              type="text"
              aria-label="Filter projects"
              name="name"
              placeholder="search for your packages"
            />
          </div>
          <button onClick={dispayShowResult} className="bg-indigo-600 text-white py-2 px-4 mt-4 w-full rounded-md" type="submit">Search</button>
          {showResult == true && data ?
            <ul className="absolute h-96 text-yellow-100 bg-slate-500  z-20 rounded-md flex flex-col  overflow-y-auto w-full">
              {data ? data.map((item: any) => (
                <li className="cursor-pointer bg-red-300 hover:bg-red-600 p-4" key={item.package.name} onClick={() => handleSelect(item.package.name)}> {item.package.name}</li>
              )) : ''}
            </ul> : ''}
        </Form>

        <div className="p-4 relative bg-slate-600 rounded-md text-white font-bold w-full flex">
          <div onClick={copyToClipboard} className="copy absolute top-2 right-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-1 hover:stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </div>
          <div className="relative mr-4" ref={finalyRef}> {mangemenet}  <span onClick={() => removeElement(result.id)}>{result}</span> {dependencies}</div>
        </div>
        <button onClick={clearResult} className="text-white bg-red-500 hover:bg-red-800 py-2 px-4 mt-4 w-full rounded-md"> clear</button>

      </div>
    </div>
  );
}
