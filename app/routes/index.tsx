import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import axios from "axios";
import { useRef, useState } from "react";

import background from '~/assets/bg.svg'
import circle from '~/assets/circle.svg'
import copy from '~/assets/copy.svg'

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
        console.log(res.data);

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
    const closeSelect = () => {
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
        <div className="home h-screen w-full">
            {showResult == true && data ? <div onClick={closeSelect} className="absolute inset-0 bg-transparent z-10"></div> : ''}

            <div className='w-4/5 m-auto relative overflow-hidden h-full'>
                <div className="absolute h-[104px] w-[104px] top-4 left-1/2 translate-x-1/2">
                    <img src={circle} alt="" className='w-full h-full object-cover' />
                </div>
                <div className="absolute w-[538px] h-[538px] top-4  translate-x-1/2" style={{
                    background: 'radial-gradient(50% 50% at 50% 50%, #222228 0%, rgba(34, 34, 40, 0) 100%)'
                }}></div>
                <div className="home-bg absolute inset-0">
                    <img src={background} alt="" className='w-full h-full object-cover' />
                </div>
                <div className="relative w-1/2 ml-auto mr-auto">
                    <h1 className='text-[36px]  text-center text-white mt-20 font-black'>OneLinePackages - Get All Your NPM Packages in One Line</h1>
                    <p className='text-neutral-300	 text-center mt-6 text-[18px]'>OneLinePackages is a website that allows you to easily retrieve all of your installed packages from the NPM registry API in just one line of code.</p>
                </div>
                <Form method='post' className=" relative p-4 w-3/4 mt-4 ml-auto mr-auto bg-zinc-900 rounded-md grid grid-cols-3 gap-4">
                    <div className="col-span-1 col-start-1 row-start-1 row-end-1 bg-zinc-800 rounded-md ">
                        <select name="" className="bg-[#313139]  border-gray-300 text-white text-sm  focus:ring-white-500 focus:border-white-500 block w-full p-2.5 bg-transparent"
                            placeholder='select' id="" onChange={(e) => depence(e.target.value)}>
                            <option value="--save" className='text-black'>dependencies</option>
                            <option value="--save-dev" className='p-2 text-black'>devDependencies</option>
                        </select>
                    </div>
                    <div className="col-span-1 col-start-1 bg-zinc-800">
                        <select name="" className="bg-[#313139]  border-none border-gray-300 text-white text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 bg-transparent "
                            onChange={(e) => mangemet(e.target.value)}
                            placeholder='select' id="">
                            <option value="npm i" className='text-black'>Npm</option>
                            <option value="yarn add" className='text-black'>Yarn</option>
                            <option value="pnpm add" className='text-black'>Pnpm</option>
                        </select>
                    </div>
                    <div className='col-span-2 col-start-2 row-start-1 row-end-1 relative'>
                        <input name="name" ref={inputRef} type="text" className=' text-[14px] hidden sm:flex items-center rounded text-left space-x-3 px-4 h-full w-full bg-[#313139] text-white' placeholder='Search packages' />
                        {showResult == true && data ?
                            <ul className="absolute h-56 text-yellow-100 bg-slate-500  z-20 rounded-md flex flex-col  overflow-y-auto w-full">
                                {data ? data.map((item: any) => (
                                    <li className="cursor-pointer bg-gray-300 hover:bg-gray-600 p-2 text-black text-[16px]" key={item.package.name} onClick={() => handleSelect(item.package.name)}> {item.package.name}</li>
                                )) : ''}
                            </ul> : ''}
                    </div>
                    <div className='col-span-1 col-start-2 col-end-2'>
                        <button type='submit' onClick={dispayShowResult} className='w-full h-full bg-gradient-to-r from-gray-800 hover:from-green-900 hover:via-green-700 via-gray-500 hover:to-green-900 to-gray-800 text-white text-[14px] rounded-md'>Search</button>
                    </div>
                    <div className='col-span-1 col-start-3 col-end-3'>
                        <button onClick={clearResult} className='w-full h-full bg-gradient-to-r from-gray-800 via-gray-500 to-gray-500 hover:from-red-500 hover:to-red-900 text-white text-[14px] rounded-md'>clear</button>
                    </div>
                    <div className='col-span-3 relative rounded-md flex bg-[#313139] p-3 ring-1 ring-white/10 backdrop-blur min-h-[100px]'>
                        <div ref={finalyRef} className='pr-[40px] text-neutral-300'>
                            {mangemenet}  <span onClick={() => removeElement(result.id)}>{result}</span> {dependencies}
                        </div>
                        <div onClick={copyToClipboard} className='w-[25px] h-[25px] absolute top-3 right-3 cursor-pointer opacity-70 hover:opacity-100'>
                            <img src={copy} className='w-full h-full object-contain' alt="" />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}